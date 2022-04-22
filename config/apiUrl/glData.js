import BaseAPI from 'src/utils/services/baseApi'
import { CONFIG_TYPE, SERVICE_NAME, ACTION_GLDATA } from './constants'
import { getApiResourceByGeoAndName } from '../index'

class GLDataApi extends BaseAPI {
  constructor(geoCode, configType) {
    const GroupNameResource = getApiResourceByGeoAndName(
      geoCode,
      SERVICE_NAME.GLData,
    )
    if (!configType || configType === '') {
      configType = CONFIG_TYPE.GLData
    }
    super(GroupNameResource?.Scopes, configType, geoCode)
  }

  async getTransactionalDataDetails(payload) {
    const accessToken = await this.getAccessToken()
    return this.adapter.getAsyncWithToken(
      `${ACTION_GLDATA.getTransactionalDataDetails}`,
      payload,
      accessToken
    )
  }

  async getTransactionalDataFiles(payload) {
    const accessToken = await this.getAccessToken()
    return this.adapter.getAsyncWithToken(
      `${ACTION_GLDATA.getTransactionalDataFiles}`,
      payload,
      accessToken
    )
  }

  async getTransactionalDataFileTemplate(payload) {
    const accessToken = await this.getAccessToken()
    return this.adapter.getFileAsyncWithToken(
      `${ACTION_GLDATA.getTransactionalDataFileTemplate}`,
      payload,
      accessToken
    )
  }

  async getTransactionalDataFileError(payload) {
    const accessToken = await this.getAccessToken()
    return this.adapter.getFileAsyncWithToken(
      `${ACTION_GLDATA.getTransactionalDataFileError}`,
      payload,
      accessToken
    )
  }

  async getTransactionalDataFileById(payload) {
    const { id } = payload
    const accessToken = await this.getAccessToken()
    return this.adapter.getAsyncWithToken(
      `${ACTION_GLDATA.getTransactionalDataFileById}/${id}`,
      payload,
      accessToken
    )
  }

  async cancelUploadTransactionDataFileRequest(payload) {
    const accessToken = await this.getAccessToken()
    return await this.adapter.postAsyncWithToken(
      `${ACTION_GLDATA.cancelUploadedTransactionDataFile}`,
      payload,
      accessToken
    )
  }

  async mergeUploadTransactionDataFileRequest(payload) {
    const accessToken = await this.getAccessToken()
    return await this.adapter.postAsyncWithToken(
      `${ACTION_GLDATA.mergeTransactionDataFileParts}`,
      payload,
      accessToken
    )
  }

  async disablePreviousUploadedTransactionalData(payload) {
    const accessToken = await this.getAccessToken()
    return this.adapter.postAsyncWithToken(
      `${ACTION_GLDATA.disablePreviousUploadedTransactionalData}`,
      payload,
      accessToken
    )
  }

  async checkMatchingRunning(payload) {
    const accessToken = await this.getAccessToken()
    return this.adapter.getAsyncWithToken(
      `${ACTION_GLDATA.checkMatchingRunning}`,
      payload,
      accessToken
    )
  }
}

export default GLDataApi
