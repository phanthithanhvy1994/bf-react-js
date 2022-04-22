import BaseAPI from 'src/utils/services/baseApi'
import { CONFIG_TYPE, ACTION_GroupNameDATA, SERVICE_NAME } from './constants'
import { getApiResourceByGeoAndName } from '../index'

class GroupNameDataApi extends BaseAPI {
  constructor(geoCode) {
    const GroupNameResource = getApiResourceByGeoAndName(
      geoCode,
      SERVICE_NAME.GroupNameData
    )
    super(GroupNameResource?.Scopes, CONFIG_TYPE.GroupNameData, geoCode)
  }

  // ENGAGEMENT_MGMT
  async getAllTimeZones(payload) {
    const accessToken = await this.getAccessToken()
    return this.adapter.getAsyncWithToken(
      `${ACTION_GroupNameDATA.GENERAL_INFO.getAllTimezones}`,
      payload,
      accessToken
    )
  }

  async updateAuthorizedInstitutionTimeZone(payload) {
    const accessToken = await this.getAccessToken()
    return this.adapter.postAsyncWithToken(
      `${ACTION_GroupNameDATA.ENGAGEMENT_MGMT.updateAuthorizedInstitutionTimeZone}`,
      payload,
      accessToken
    )
  }

  async getAuthorizedInstitutions(payload) {
    const accessToken = await this.getAccessToken()
    return this.adapter.getAsyncWithToken(
      `${ACTION_GroupNameDATA.ENGAGEMENT_MGMT.getAuthorizedInstitutions}`,
      payload,
      accessToken
    )
  }

  async generateInvitationEmail(payload) {
    const accessToken = await this.getAccessToken()
    return await this.adapter.postAsyncWithToken(
      `${ACTION_GroupNameDATA.generateInvitationEmail}`,
      payload,
      accessToken
    )
  }

  async verifyLinkConnect(payload) {
    return await this.adapter.getAsync(
      `${ACTION_GroupNameDATA.verifyLinkConnect}`,
      payload
    )
  }

  async saveConsent(payload) {
    return await this.adapter.postAsync(
      `${ACTION_GroupNameDATA.saveConsent}`,
      payload
    )
  }

  async getPlatformCountries(payload) {
    const accessToken = await this.getAccessToken()
    return await this.adapter.getAsyncWithToken(
      `${ACTION_GroupNameDATA.GroupName_DATA_AUTHORIZATION.getPlatformCountries}`,
      payload,
      accessToken
    )
  }

  async getInstitutions(payload) {
    const accessToken = await this.getAccessToken()
    return await this.adapter.getAsyncWithToken(
      `${ACTION_GroupNameDATA.GroupName_DATA_AUTHORIZATION.getInstitutions}`,
      payload,
      accessToken
    )
  }

  async sendAuthorizationRequest(payload) {
    const accessToken = await this.getAccessToken()
    return await this.adapter.postAsyncWithToken(
      `${ACTION_GroupNameDATA.GroupName_DATA_AUTHORIZATION.sendAuthorizationRequest}`,
      payload,
      accessToken
    )
  }

  // GroupName DATA AITHORIZATION
  async getListBDA(payload) {
    const accessToken = await this.getAccessToken()
    return await this.adapter.getAsyncWithToken(
      `${ACTION_GroupNameDATA.GroupName_DATA_AUTHORIZATION.getListBDA}`,
      payload,
      accessToken
    )
  }

  async deleteAuthorizationRequest(payload) {
    const accessToken = await this.getAccessToken()
    return await this.adapter.deleteAsyncWithToken(
      `${ACTION_GroupNameDATA.GroupName_DATA_AUTHORIZATION.sendAuthorizationRequest}`,
      payload,
      accessToken
    )
  }

  async getLimitResend(payload) {
    const accessToken = await this.getAccessToken()
    return await this.adapter.getAsyncWithToken(
      `${ACTION_GroupNameDATA.GroupName_DATA_AUTHORIZATION.resendAuthorizationRequest}`,
      payload,
      accessToken
    )
  }

  async getAuthorizationRequest(payload) {
    const accessToken = await this.getAccessToken()
    return await this.adapter.getAsyncWithToken(
      `${ACTION_GroupNameDATA.GroupName_DATA_AUTHORIZATION.getAuthorizationRequest}`,
      payload,
      accessToken
    )
  }
  
  async resendAuthorizationRequest(payload) {
    const accessToken = await this.getAccessToken()
    return await this.adapter.postAsyncWithToken(
      `${ACTION_GroupNameDATA.GroupName_DATA_AUTHORIZATION.resendAuthorizationRequest}`,
      payload,
      accessToken
    )
  }

  async getIsAuthorizedTimezoneSelected(payload) {
    const accessToken = await this.getAccessToken()
    return await this.adapter.getAsyncWithToken(
      `${ACTION_GroupNameDATA.GroupName_DATA_AUTHORIZATION.getIsAuthorizedTimezoneSelected}`,
      payload,
      accessToken
    )
  }

  async createScheduleTask(payload) {
    const accessToken = await this.getAccessToken()
    return await this.adapter.postAsyncWithToken(
      `${ACTION_GroupNameDATA.GroupName_DATA_AUTHORIZATION.createScheduleTask}`,
      payload,
      accessToken
    )
  }

  async updateScheduleTask(payload) {
    const accessToken = await this.getAccessToken()
    return await this.adapter.postAsyncWithToken(
      `${ACTION_GroupNameDATA.GroupName_DATA_AUTHORIZATION.updateScheduleTask}`,
      payload,
      accessToken
    )
  }

  async getScheduleTasks(payload) {
    const accessToken = await this.getAccessToken()
    return await this.adapter.getAsyncWithToken(
      `${ACTION_GroupNameDATA.GroupName_DATA_AUTHORIZATION.getScheduleTasks}`,
      payload,
      accessToken
    )
  }

  async cancelScheduleTasks(payload) {
    const accessToken = await this.getAccessToken()
    return await this.adapter.postAsyncWithToken(
      `${ACTION_GroupNameDATA.GroupName_DATA_AUTHORIZATION.cancelScheduleTasks}`,
      payload,
      accessToken
    )
  }

  async getExtractionStatus(payload) {
    const accessToken = await this.getAccessToken()
    return await this.adapter.getAsyncWithToken(
      `${ACTION_GroupNameDATA.GroupName_DATA_AUTHORIZATION.getExtractionStatus}`,
      payload,
      accessToken
    )
  }

  async retryExtractionData(payload) {
    const accessToken = await this.getAccessToken()
    return await this.adapter.postAsyncWithToken(
      `${ACTION_GroupNameDATA.GroupName_DATA_AUTHORIZATION.retryExtractionData}`,
      payload,
      accessToken
    )
  }

  async reAuthenticate(payload) {
    const accessToken = await this.getAccessToken()
    return await this.adapter.postAsyncWithToken(
      `${ACTION_GroupNameDATA.GroupName_DATA_AUTHORIZATION.reAuthenticate}`,
      payload,
      accessToken
    )
  }
}

export default GroupNameDataApi
