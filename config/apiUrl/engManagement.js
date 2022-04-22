import BaseAPI from 'src/utils/services/baseApi'
import { CONFIG_TYPE, ACTION_ENGMANAGEMENT, SERVICE_NAME } from './constants'
import { getApiResourceByGeoAndName } from '../index'

class EngManagementApi extends BaseAPI {
  constructor(geoCode) {
    const engagementsResource = getApiResourceByGeoAndName(
      geoCode,
      SERVICE_NAME.EngagementManagement
    )
    super(engagementsResource?.Scopes, CONFIG_TYPE.EngManagement, geoCode)
  }

  // ENGAGEMENT_MGMT
  async getEngagementsListByCurrentUser() {
    const accessToken = await this.getAccessToken()
    return this.adapter.getAsyncWithToken(
      `${ACTION_ENGMANAGEMENT.ENGAGEMENT_MGMT.getEngagementsListByCurrentUser}`,
      {},
      accessToken
    )
  }

  async createEngagement(payload) {
    const accessToken = await this.getAccessToken()
    return await this.adapter.postAsyncWithToken(
      `${ACTION_ENGMANAGEMENT.ENGAGEMENT_MGMT.createEngagement}`,
      payload,
      accessToken
    )
  }

  // ENGAGEMENT_INFO_MGMT
  async getCurrentEngagementById(payload) {
    const accessToken = await this.getAccessToken()
    return await this.adapter.getAsyncWithToken(
      `${ACTION_ENGMANAGEMENT.ENGAGEMENT_INFO_MGMT.getCurrentEngagementById}`,
      payload,
      accessToken
    )
  }

  async getAllRoleEngagement(payload) {
    const accessToken = await this.getAccessToken()
    return await this.adapter.getAsyncWithToken(
      `${ACTION_ENGMANAGEMENT.ENGAGEMENT_INFO_MGMT.getAllRoleEngagement}`,
      payload,
      accessToken
    )
  }

  async createUpdateTeamMember(payload) {
    const accessToken = await this.getAccessToken()
    return await this.adapter.postAsyncWithToken(
      `${ACTION_ENGMANAGEMENT.ENGAGEMENT_INFO_MGMT.createUpdateTeamMember}`,
      payload,
      accessToken
    )
  }

  async getEngagementCountries(payload) {
    const accessToken = await this.getAccessToken()
    return await this.adapter.getAsyncWithToken(
      `${ACTION_ENGMANAGEMENT.ENGAGEMENT_INFO_MGMT.getEngagementCountries}`,
      payload,
      accessToken
    )
  }

  async updateEngagementSetting(payload) {
    const accessToken = await this.getAccessToken()
    return await this.adapter.putAsyncWithToken(
      `${ACTION_ENGMANAGEMENT.ENGAGEMENT_INFO_MGMT.updateEngagementSetting}`,
      payload,
      accessToken
    )
  }

  async updateEnableMatching(payload) {
    const accessToken = await this.getAccessToken()
    return await this.adapter.putAsyncWithToken(
      `${ACTION_ENGMANAGEMENT.ENGAGEMENT_INFO_MGMT.updateEnableMatching}`,
      payload,
      accessToken
    )
  }

  // ENITY_MGMT
  async getEntities(payload) {
    const accessToken = await this.getAccessToken()
    return await this.adapter.getAsyncWithToken(
      `${ACTION_ENGMANAGEMENT.ENITY_MGMT.getEntities}`,
      payload,
      accessToken
    )
  }

  // LOCK MGMT
  async handleLockingObject(payload) {
    const accessToken = await this.getAccessToken()
    return await this.adapter.postAsyncWithToken(
      `${ACTION_ENGMANAGEMENT.LOCK_MGMT.handleLockingObject}`,
      payload,
      accessToken
    )
  }

  async unlockObject(payload) {
    const accessToken = await this.getAccessToken()
    return await this.adapter.putAsyncWithToken(
      `${ACTION_ENGMANAGEMENT.LOCK_MGMT.unlockObject}`,
      payload,
      accessToken
    )
  }

  // USER_SETTING
  async getUserSettings() {
    const accessToken = await this.getAccessToken()
    return await this.adapter.getAsyncWithToken(
      `${ACTION_ENGMANAGEMENT.USER_SETTING.getUserSettings}`,
      {},
      accessToken
    )
  }

  async saveUserSettings(payload) {
    const accessToken = await this.getAccessToken()
    return await this.adapter.putAsyncWithToken(
      `${ACTION_ENGMANAGEMENT.USER_SETTING.saveUserSettings}`,
      payload,
      accessToken
    )
  }

  async updateUserLanguageAndLocale(payload) {
    const accessToken = await this.getAccessToken()
    return await this.adapter.postAsyncWithToken(
      `${ACTION_ENGMANAGEMENT.USER_SETTING.updateUserLanguageAndLocale}`,
      payload,
      accessToken
    )
  }

  async getCultureInfo(payload) {
    const accessToken = await this.getAccessToken()
    return await this.adapter.getAsyncWithToken(
      `${ACTION_ENGMANAGEMENT.USER_SETTING.getCultureInfo}`,
      payload,
      accessToken
    )
  }

  // ACTION_DELETE_MGMT
  async getDELsByPermission(payload) {
    var accessToken = await this.getAccessToken()
    return await this.adapter.getAsyncWithToken(`${ACTION_ENGMANAGEMENT.ENGAGEMENT_INFO_MGMT.getDELsByPermission}`, payload, accessToken)
  }

  async submitDeletedEngagement(payload) {
    var accessToken = await this.getAccessToken()
    return await this.adapter.postAsyncWithToken(`${ACTION_ENGMANAGEMENT.ENGAGEMENT_INFO_MGMT.submitDeletedEngagement}`, payload, accessToken)
  }

  async approveDeletedEngagement(payload) {
    var accessToken = await this.getAccessToken()
    return await this.adapter.postAsyncWithToken(`${ACTION_ENGMANAGEMENT.ENGAGEMENT_INFO_MGMT.approveDeletedEngagement}`, payload, accessToken)
  }

  async rejectDeletedEngagement(payload) {
    var accessToken = await this.getAccessToken()
    return await this.adapter.postAsyncWithToken(`${ACTION_ENGMANAGEMENT.ENGAGEMENT_INFO_MGMT.rejectDeletedEngagement}`, payload, accessToken)
  }

  //TEAM MANAGEMENT
  async getListTeamManagement(payload) {
    var accessToken = await this.getAccessToken()
    return await this.adapter.getAsyncWithToken(`${ACTION_ENGMANAGEMENT.ENGAGEMENT_INFO_MGMT.getListTeamManagement}`, payload, accessToken)
  }
}

export default EngManagementApi