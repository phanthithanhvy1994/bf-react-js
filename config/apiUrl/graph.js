import { Client, BatchRequestContent, BatchResponseContent } from '@microsoft/microsoft-graph-client'
import { msalInstance } from 'src/utils/authenUtils'
import { AuthCodeMSALBrowserAuthenticationProvider } from '@microsoft/microsoft-graph-client/authProviders/authCodeMsalBrowser'
import { InteractionType } from '@azure/msal-browser'
import { graphApiScope } from 'src/config'
import { GRAPH_PATH_URL } from './constants'

const GraphApi = () => {
  let graphClient

  const getAuthenticatedClient = () => {
    if (!graphClient) {
      const authProvider = new AuthCodeMSALBrowserAuthenticationProvider(
        msalInstance,
        {
          account: msalInstance.getActiveAccount(),
          scopes: graphApiScope,
          interactionType: InteractionType.Silent
        }
      )

      graphClient = Client.initWithMiddleware({
        authProvider: authProvider
      })
    }

    return graphClient
  }

  const getListAzureInfoUserFilter = (emails) => {
    let filter = `$filter=startsWith(mail,'${emails[0]}')`
    let countEmail = 0

    for (let key in emails) {
      if (countEmail !== 0) {
        filter = `${filter} or startsWith(mail,'${emails[key]}')`
      }
      countEmail++
    }

    return filter.trim()
  }

  const getAADInfoByEmail = async (payload) => {
    const client = getAuthenticatedClient()
    const batchRequestContent = new BatchRequestContent()
    const emails = [...payload.emails]

    for (let i = 0; i < payload.emails.length; i += 15) {
      const batchEmails = emails.splice(0, 15)
      const filterString = getListAzureInfoUserFilter(batchEmails)
      const request = new Request(`${GRAPH_PATH_URL.users}?${filterString}${payload.select ? `&$select=${payload.select}` : ''}`, {
        method: 'GET'
      })

      batchRequestContent.addRequest({ id: i, request: request })
    }
    const content = await batchRequestContent.getContent()
    const batchResponse = await client.api(GRAPH_PATH_URL.batch).post(content)
    const batchResponseContent = new BatchResponseContent(batchResponse)
    const listResponse = batchResponseContent.getResponses()
    let resultAsync = []

    listResponse.forEach(response => {
      if (response.ok) {
        resultAsync.push(response.json())
      }
    })
    const results = await Promise.all(resultAsync)
    const formatResult = []

    _.forEach(results, result => {
      if (result?.value) {
        formatResult.push(...result.value)
      }
    })

    return formatResult
  }

  return {
    getAADInfoByEmail
  }
}

export default GraphApi