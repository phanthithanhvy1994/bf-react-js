import RestConnection from './rest'
import AuthenticationApi from 'src/config/apiUrl/authen'
import Config from 'src/config/apiUrl/config'

class BaseAPI {
  constructor(scopes, configType, geoCode) {
    this.authen = new AuthenticationApi()
    this.scopes = `["${scopes}"]`
    const conf = new Config().getConfig(configType, geoCode)
    if (!conf) throw new Error('api conf is required')
    this.adapter = new RestConnection(conf)
  }

  handleError (err, res) {
    return res.result.status && res.result.status.code !== 'success' ? res.result.status : err ? error : null
  }

  async getAccessToken() {
    return await this.authen.getTokenCallAppToApp(this.scopes)
  }
}

export default BaseAPI
