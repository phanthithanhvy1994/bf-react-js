import { CONTAINERCODE } from './constants'
import { routes } from './apiUrl/routes'

const baseUrl = window.location.origin
const geoFromOpm = () => {
  return localStorage.getItem('geoFromOpm')
}
const apiResources = _.get(window.appsettings, 'Azure.ApiResources')

const getGeoSupport = () => {
  const geoSupports = []
  _.forOwn(apiResources, (value, key) => {
    geoSupports.push(key)
  })
  return geoSupports
}

const geoSupports = getGeoSupport()

const getApiResourceByGeoAndName = (geoCode, serviceName) => {
  if (_.isNil(geoCode)) {
    geoCode = geoFromOpm()
  }
  return _.find(_.get(window.appsettings, `Azure.ApiResources.${geoCode}`), [
    'Name',
    serviceName
  ])
}

const opmConfig = window.appsettings.OPM

const appSettings = {
  clientId: _.get(window.appsettings, 'Azure.ClientId'),
  authority: `${_.get(window.appsettings, 'Azure.Instance')}${_.get(
    window.appsettings,
    'Azure.TenantId'
  )}`,
  redirectUri: _.get(window.appsettings, 'RedirectUri'),
  sessionTimeout: _.get(window.appsettings, 'SessionTimeout'),
  opmUrl: opmConfig.Url,
  opmAppCode: opmConfig.AppCode,
  opmClientId: _.get(window.appsettings, 'Azure.ClientId'),
  defaultGeo: _.get(window.appsettings, 'DefaultGeo'),
  hideEngagementView: _.get(window.appsettings, 'HideEngagementView', []),
  limitSearchInstitution: _.get(window.appsettings, 'LimitSearchInstitution')
}

const { defaultGeo } = appSettings
const defaultContainer = CONTAINERCODE.CA
const currentReleaseVersion = _.get(window.appsettings, 'ReleaseVersion.CurrentReleaseVersion')
const supportedVersionAndGeo = _.get(window.appsettings, 'SupportedVersionAndGeo')
const SUPPORTED_VERSION = {
  '1.0': 'V1'
}

const msalConfig = {
  auth: {
    clientId: appSettings.clientId,
    authority: appSettings.authority,
    redirectUri: appSettings.redirectUri
  },
  cache: {
    cacheLocation: 'localStorage', // This configures where your cache will be stored
    storeAuthStateInCookie: false // Set this to "true" if you are having issues on IE11 or Edge
  },
}

// Add scopes here for ID token to be used at Microsoft identity platform endpoints.
const loginRequest = {
  scopes: ['User.Read']
}

const graphApiScope = ['User.Read.All']

const configToastify = {
  isToast: true,
  position: 'top-center',
  autoCloseTime: '5000',
  message: '',
  type: 'success'
}

const globalFiles = {
  termsOfUse: 'terms_of_use.pdf',
  privacy: 'privacy.pdf',
  notices: 'notices.pdf',
  guidance: 'QRG_Project NameGroupNameDataExtraction_audit_engagement(Draft).pdf'
}

const response404 = {
  result: {
    statusCode: 404,
    data: {}
  }
}

const supportService = 'https://Project Nameus.service-now.com/sp?id=sp_kb_article&sys_id=bf9ed29adbee3c989275a478139619e1'

const engagementViewName = {
  GroupNameDataAuthorization: 'GroupNameDataAuthorization',
  GroupNameDataManagement: 'GroupNameDataManagement',
  transactionDataManagement: 'transactionDataManagement',
  matching: 'matching',
  teamManagement: 'teamManagement'
}

const aboutUsLink = {
  href: 'https://www.Project Name.com/about',
  title: 'www.Project Name.com/about'
}

export {
  appSettings,
  defaultGeo,
  defaultContainer,
  currentReleaseVersion,
  supportedVersionAndGeo,
  SUPPORTED_VERSION,
  routes,
  msalConfig,
  loginRequest,
  configToastify,
  globalFiles,
  baseUrl,
  geoFromOpm,
  geoSupports,
  getApiResourceByGeoAndName,
  response404,
  graphApiScope,
  supportService,
  engagementViewName,
  aboutUsLink
}