import BaseAPI from 'src/utils/services/baseApi'
import { CONFIG_TYPE, ACTION_GroupNameDATA, SERVICE_NAME } from './constants'
import { getApiResourceByGeoAndName } from '../index'

class MatchingApi extends BaseAPI {
  constructor(geoCode) {
    const matchingResource = getApiResourceByGeoAndName(
      geoCode,
      SERVICE_NAME.Matching
    )
    super(matchingResource?.Scopes, CONFIG_TYPE.Matching, geoCode)
  }

  async getInfoMatching(payload) {
    const accessToken = await this.getAccessToken()
    return await this.adapter.getAsyncWithToken(
      `${ACTION_GroupNameDATA.MATCHING.getInfoMatching}`,
      payload,
      accessToken
    )
  }

  async postStartMatchingProcess(payload) {
    const accessToken = await this.getAccessToken()
    return await this.adapter.postAsyncWithToken(
      `${ACTION_GroupNameDATA.MATCHING.getInfoMatching}`,
      payload,
      accessToken
    )
  }

  async cancelMatching(payload) {
    const accessToken = await this.getAccessToken()
    return await this.adapter.putAsyncWithToken(
      `${ACTION_GroupNameDATA.MATCHING.cancelMatching}`,
      payload,
      accessToken
    )
  }
}

export default MatchingApi
