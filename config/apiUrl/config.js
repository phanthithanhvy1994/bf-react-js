import { CONFIG_TYPE, SERVICE_NAME } from './constants'
import { appSettings, getApiResourceByGeoAndName } from '../index'

export default class Config {
  constructor() {
    this.conf = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      timeout: 30000,
      type: '',
      serviceName: ''
    }
  }

  getConfig(configType, geoCode) {
    switch (configType) {
      case CONFIG_TYPE.EngManagement:
        return this.engManagementConfig(geoCode)
      case CONFIG_TYPE.Opm:
        return this.opmConfig()
      case CONFIG_TYPE.GroupNameData:
        return this.GroupNameDataConfig(geoCode)
      case CONFIG_TYPE.GLData:
        return this.gLDataConfig(geoCode)
      case CONFIG_TYPE.File:
        return this.uploadConfig(geoCode)
      case CONFIG_TYPE.Matching:
        return this.matchingConfig(geoCode)
      default:
        return this.conf
    }
  }

  engManagementConfig(geoCode) {
    const customConfig = _.merge({ ...this.conf }, { headers: { GeoCode: geoCode } })
    customConfig.type = CONFIG_TYPE.EngManagement
    customConfig.endpoint = getApiResourceByGeoAndName(geoCode, SERVICE_NAME.EngagementManagement)?.Uri
    return customConfig
  }

  opmConfig() {
    const customConfig = { ...this.conf }
    customConfig.type = CONFIG_TYPE.Opm
    customConfig.endpoint = appSettings.opmUrl
    return customConfig
  }

  GroupNameDataConfig(geoCode) {
    const customConfig = _.merge({ ...this.conf }, { headers: { GeoCode: geoCode } })
    customConfig.type = CONFIG_TYPE.GroupNameData
    customConfig.endpoint = getApiResourceByGeoAndName(geoCode, SERVICE_NAME.GroupNameData)?.Uri
    return customConfig
  }

  gLDataConfig(geoCode) {
    const customConfig = _.merge({ ...this.conf }, { headers: { GeoCode: geoCode } })
    customConfig.type = CONFIG_TYPE.GLData
    customConfig.endpoint = getApiResourceByGeoAndName(geoCode, SERVICE_NAME.GLData)?.Uri
    return customConfig
  }

  uploadConfig(geoCode) {
    const customConfig = _.merge({ ...this.conf }, { headers: { GeoCode: geoCode } })
    customConfig.type = CONFIG_TYPE.GLData
    customConfig.endpoint = getApiResourceByGeoAndName(geoCode, SERVICE_NAME.GLData)?.Uri
    customConfig.headers['Accept-Encoding'] = 'gzip, deflate, br'
    delete customConfig.headers['Content-Type']
    return customConfig
  }


  matchingConfig(geoCode) {
    const customConfig = _.merge({ ...this.conf }, { headers: { GeoCode: geoCode } })
    customConfig.type = CONFIG_TYPE.Matching
    customConfig.endpoint = getApiResourceByGeoAndName(geoCode, SERVICE_NAME.Matching)?.Uri
    return customConfig
  }
}
