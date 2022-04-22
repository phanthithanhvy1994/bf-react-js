import BaseAPI from 'src/utils/services/baseApi'
import { CONFIG_TYPE, ACTION_OPM } from './constants'
import { appSettings } from '../index'
import { IsDevelopment } from 'src/utils/env'

class OpmApi extends BaseAPI {
  constructor() {
    super(`${appSettings.opmClientId}/.default`, CONFIG_TYPE.Opm)
  }

  async getAccessTokenForOpm() {
    return await this.getAccessToken();
  }

  async getContainerMappingByEmail({ globalPersonUid, accessToken }) {
    if (IsDevelopment()) {
      const data = require('src/App_Data/opm.containermapping.json') 
      const result = data.GetContainerMapping
      return { result }
    } else {
      return await this.adapter.getAsyncWithTokenCallThirdService(`${ACTION_OPM.getContainerMappingByEmail + appSettings.opmAppCode}/${globalPersonUid}`, {}, accessToken)
    }
  }

  async getGlobalEmployeeByEmailIds(payload, accessToken) {
    if (IsDevelopment()) {
      let result = []
      const data = require('src/App_Data/opm.data.json')
      result.push(_.find(data.GetGlobalEmployeeByEmailIds, { 'email': payload[0] }))
      return { result }
    } else {
      return await this.adapter.postAsyncWithTokenCallThirdService(`${ACTION_OPM.getGlobalEmployeeByEmailIds}${appSettings.opmAppCode}`, payload, accessToken)
    }
  }

  async getGlobalEmployeesByKeyword(payload) {
    if (IsDevelopment()) {
      const result = require('src/App_Data/opm.globalemployees.json').getGlobalEmployeesByKeyword
      return { result }
    } else {
      const accessToken = await this.getAccessToken()
      return await this.adapter.postAsyncWithTokenCallThirdService(`${ACTION_OPM.getGlobalEmployeesByKeyword}${appSettings.opmAppCode}`, payload, accessToken)
    }
  }
}

export default OpmApi
