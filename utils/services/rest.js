import fetch from 'isomorphic-unfetch'

import { API_PARAMETERS, LOGGED_OUT_EVENT, ERROR_MESSAGES } from 'src/config/constants'

import { msalInstance } from '../authenUtils'
import { routes } from 'src/config'

class RestConnection {
  constructor(conf) {
    this._conf = {
      ...conf,
      credentials: 'include',
      endpoint: `${conf.endpoint}`
    }
  }

  isShowUnauthorizedMsg = false

  buildEndpoint(event, data) {
    const container = (data.containerCode != undefined && !_.isEmpty(data.containerCode)) ? `container/${data.containerCode}` : `container/${window.defaultContainer}`
    if(!_.isEmpty(data.engagementId)) {
      event = event.replace(API_PARAMETERS.engagementId, data.engagementId)
    }

    return `${this._conf.endpoint}${container}/${event}`
  }

  buildQuery(url, data) {
    let separatedBy = '?'
    if (_.isEmpty(data)) {
      return url
    }

    const lowerURL = url.toLowerCase()

    if (url.indexOf('?') !== -1) separatedBy = '&'
    let queryParams = _.cloneDeep(data)
    if (lowerURL.includes("container")) {
      Object.keys(queryParams).forEach((key) => {
        if (key.toLowerCase() == "containercode") delete queryParams[key]
      })
    }
    const params = $.param(this.cleanParams(queryParams))

    url += params ? separatedBy + params : ''
    const urlElm = url.split('?')
    const queryString = urlElm[1]
    const endpoint = urlElm[0]
    let query = new URLSearchParams(queryString)
    query = Object.fromEntries(query)
    
    url = endpoint + '?' + $.param(this.cleanParams(query))
    return url
  }

  cleanParams(obj) {
    Object.keys(obj).forEach((key) => {
      if (obj[key] === undefined || obj[key] === null) delete obj[key]
    })
    return obj
  }

  /*
    METHOD: GET
    @params: event: action, data: payload
  */

  async getAsyncWithToken(event, data = {}, accessToken) {
    const uri = data.uri || {}
    const query = data.query || {}
    let url = this.buildEndpoint(event, uri)
    url = this.buildQuery(url, query)
    return await this._fetchAsync({ method: 'GET', url, headers: { "Authorization": `Bearer ${accessToken}` } })
  }

  async getFileAsyncWithToken(event, data = {}, accessToken) {
    const uri = data.uri || {}
    const query = data.query || {}
    let url = this.buildEndpoint(event, uri)
    url = this.buildQuery(url, query)
    return await this._fetchAsync({ method: 'GET', url, headers: { "Authorization": `Bearer ${accessToken}` } }, false, true)
  }

  async getAsync(event, data = {}) {
    const uri = data.uri || {}
    const query = data.query || {}
    let url = this.buildEndpoint(event, uri)
    url = this.buildQuery(url, query)
    return await this._fetchAsync({ method: 'GET', url, headers: {} })
  }

  async getAsyncWithTokenCallThirdService(event, data = {}, accessToken) {
    let url = `${this._conf.endpoint}/${event}`
    const query = data.query || {}
    url = this.buildQuery(url, query)
    return await this._fetchAsync({ method: 'GET', url, headers: { "Authorization": `Bearer ${accessToken}` } })
  }

  /*
    METHOD: POST
    @params: event: action, data:object = payload 
  */

  async postAsyncWithToken(event, data, accessToken) {
    const payload = { payload: data.payload || {} }
    const uri = data.uri || {}
    const query = data.query || {}
    let url = this.buildEndpoint(event, uri)
    url = this.buildQuery(url, query)
    return await this._fetchAsync({ method: 'POST', url, headers: { "Authorization": `Bearer ${accessToken}` }, body: JSON.stringify(payload) })
  }

  async postAsync(event, data) {
    const payload = { payload: data.payload || {} }
    const uri = data.uri || {}
    const query = data.query || {}
    let url = this.buildEndpoint(event, uri)
    url = this.buildQuery(url, query)
    return await this._fetchAsync({ method: 'POST', url, headers: {}, body: JSON.stringify(payload) })
  }

  async postAsyncWithTokenCallThirdService(event, data, accessToken) {
    const url = `${this._conf.endpoint}/${event}`
    return await this._fetchAsync({ method: 'POST', url, headers: { "Authorization": `Bearer ${accessToken}` }, body: JSON.stringify(data) })
  }

  async uploadFileWithToken (event, data, accessToken) {
    const payloads = data && data.payload ? data.payload : {}
    let formData = new FormData()
    if (payloads && payloads !== {}) {
      const keys = _.keys(payloads)
      _.forEach(keys, (key) => {
        formData.append(key, payloads[key])
      })
    }
    
    const uri = data.uri || {}
    const query = data.query || {}
    let url = this.buildEndpoint(event, uri)
    url = this.buildQuery(url, query)
    return await this._fetchAsync({ method: 'POST', url, headers: { "Authorization": `Bearer ${accessToken}` }, body: formData }, true)
  }

  /*
    METHOD: PUT
    @params: event: action, data: payload
  */
  async putAsyncWithToken(event, data, accessToken) {
    const payload = { payload: data.payload || {} }
    const uri = data.uri || {}
    const query = data.query || {}
    const keepalive = data.keepalive ?? false
    let url = this.buildEndpoint(event, uri)
    url = this.buildQuery(url, query)
    return await this._fetchAsync({ keepalive, method: 'PUT', url, headers: { "Authorization": `Bearer ${accessToken}` } , body: JSON.stringify(payload) })
  }

  /*
    METHOD: DELETE
    @params: event: action, data: payload
  */
  async deleteAsync (event, data) {
    const payload = { payload: data.payload || {} }
    const url = `${this._conf.endpoint}${this.buildContainer(data)}/${event}`
    return await this._fetchAsync({ method: 'DELETE', url, headers: this._conf.headers, body: JSON.stringify(payload) })
  }

  async deleteAsyncWithToken(event, data, accessToken) {
    const payload = { payload: data.payload || {} }
    const uri = data.uri || {}
    const query = data.query || {}
    let url = this.buildEndpoint(event, uri)
    url = this.buildQuery(url, query)
    return await this._fetchAsync({ method: 'DELETE', url, headers: { "Authorization": `Bearer ${accessToken}` } , body: JSON.stringify(payload) }, payload)
  }
  
  async _fetchAsync (config, isUpload = false, isDownload = false) {
    if (document.token) this._conf.headers['X-Token'] = document.token
    config = _.merge(config, {
      headers: this._conf.headers
    })

    if (!isUpload) {
      config = _.merge(config, {
        credentials: 'include'
      })
    }

    let result = null
    try {
      const response = await fetch(config.url, config)
      switch (response.status) {
        case 403:
          window.location.href = routes.portfolio.index
          break
        case 401:
          if (!this.isShowUnauthorizedMsg) {
            alert(ERROR_MESSAGES.unauthorized)
            const accounts = msalInstance.getAllAccounts()
            if (accounts.length > 0) {
              const logoutRequest = {
                account: msalInstance.getAccountByHomeId(accounts[0].homeAccountId)
              }
              localStorage.setItem(LOGGED_OUT_EVENT, 'logout' + Date.now())//logout multi-tabs
              msalInstance.logoutRedirect(logoutRequest)
            }
            this.isShowUnauthorizedMsg = !this.isShowUnauthorizedMsg
          }
        break
        case 200:
          if (isDownload) {
            try {
              result = await response.clone().json()
              if (_.get(result, 'statusCode') !== 200) {
                return {
                  result
                }
              } else {
                result = await response.blob()
                return {
                  result
                }
              }
            } catch {
              result = await response.blob()
              return {
                result
              }
            }
          }
          else {
            result = await response.json()
            return {
              result
            }
          }
        default:
          return response
      }
    } catch (error) {
      return { error }
    }
  }
}

export default RestConnection
