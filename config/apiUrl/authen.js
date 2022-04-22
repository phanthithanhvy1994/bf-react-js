import { msalInstance } from 'src/utils/authenUtils'
import { LOGGED_OUT_EVENT } from 'src/config/constants'

class AuthenticationApi {
  logout() {
    msalInstance.logout()
  }

  async getTokenCallAppToApp(scopes) {

    const account = msalInstance.getActiveAccount()
    const accessTokenRequest = {
      account: account,
      scopes: JSON.parse(scopes)
    }

    let accessToken = ''
    await msalInstance.acquireTokenSilent(accessTokenRequest).then((accessTokenResponse) => {
      accessToken = accessTokenResponse.accessToken
    }).catch((error) => {
      localStorage.setItem(LOGGED_OUT_EVENT, 'logout' + Date.now())
      const logoutRequest = {
        account: msalInstance.getAccountByHomeId(account.homeAccountId)
      }
      msalInstance.logoutRedirect(logoutRequest)
    })

    return accessToken
  }
}

export default AuthenticationApi
