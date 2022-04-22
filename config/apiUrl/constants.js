import { API_PARAMETERS } from 'src/config/constants'

const CONFIG_TYPE = {
  GLData: 'GLData',
  GraphConf: 'GraphConf',
  EngManagement: 'EngManagement',
  Opm: 'Opm',
  GroupNameData: 'GroupNameData',
  File: 'FileData',
  Matching: 'Matching'
}

const ACTION_ENGMANAGEMENT = {
  ENGAGEMENT_MGMT: {
    getEngagementsListByCurrentUser: 'EngagementMgmt/SearchBy',
    createEngagement: 'EngagementMgmt/Create'
  },
  ENGAGEMENT_INFO_MGMT: {
    getCurrentEngagementById: `engagement/${API_PARAMETERS.engagementId}/EngagmentInfoMgmt/Engagement`,
    getAllRoleEngagement: `engagement/${API_PARAMETERS.engagementId}/EngagmentInfoMgmt/AllRole`,
    createUpdateTeamMember: `engagement/${API_PARAMETERS.engagementId}/EngagmentInfoMgmt/TeamMembers`,
    getEngagementCountries: `engagement/${API_PARAMETERS.engagementId}/EngagmentInfoMgmt/Countries`,
    updateEngagementSetting: `engagement/${API_PARAMETERS.engagementId}/EngagmentInfoMgmt/Update`,
    updateEnableMatching: `engagement/${API_PARAMETERS.engagementId}/EngagmentInfoMgmt/EnableMatching`,
    getListTeamManagement: `engagement/${API_PARAMETERS.engagementId}/EngagmentInfoMgmt/TeamMembers`,
    getDELsByPermission: `engagement/${API_PARAMETERS.engagementId}/EngagmentInfoMgmt/CheckDeletionPermission`,
    submitDeletedEngagement: `engagement/${API_PARAMETERS.engagementId}/EngagmentInfoMgmt/SubmitDeletion`,
    approveDeletedEngagement: `engagement/${API_PARAMETERS.engagementId}/EngagmentInfoMgmt/ApproveDeletion`,
    rejectDeletedEngagement: `engagement/${API_PARAMETERS.engagementId}/EngagmentInfoMgmt/RejectDeletion`
  },
  ENITY_MGMT: {
    getEntities: 'EntityMgmt/Entities'
  },
  LOCK_MGMT: {
    handleLockingObject: 'LockMgmt/HandleLockingObject',
    unlockObject: 'LockMgmt/UnlockObject'
  },
  USER_SETTING: {
    getUserSettings: 'UserSetting/CatalogUser',
    saveUserSettings: 'UserSetting/Update',
    updateUserLanguageAndLocale: 'UserSetting/Initialize',
    getCultureInfo: 'UserSetting/CultureInfo'
  },
}

const ACTION_OPM = {
  getContainerMappingByEmail: 'getcontainermappingbyglobalpersonuid/',
  getGlobalEmployeeByEmailIds: 'getglobalemployeebyemailids/',
  getGlobalEmployeesByKeyword: 'getGlobalEmployeesByKeyword/'
}

const GRAPH_PATH_URL = {
  users: '/users',
  batch: '/$batch'
}

const SERVICE_NAME = {
  EngagementManagement: 'EngagementManagement',
  GroupNameData: 'GroupNameData',
  GLData: 'GLData',
  Matching: 'Matching'
}

const ACTION_GroupNameDATA = {
  generateInvitationEmail: `engagement/${API_PARAMETERS.engagementId}/InvitationEmail/Create`,
  verifyLinkConnect: 'DirectIdConnect/VerifyLinkConnect',
  saveConsent: 'DirectIdConnect/saveConsent',
  GroupName_DATA_AUTHORIZATION: {
    getPlatformCountries: 'GeneralGroupNameData/PlatformCountries',
    getInstitutions: 'GeneralGroupNameData/Institutions',
    sendAuthorizationRequest: `engagement/${API_PARAMETERS.engagementId}/GroupNameDataAuthorization/AuthorizationRequest`,
    getListBDA: `engagement/${API_PARAMETERS.engagementId}/GroupNameDataAuthorization/AuthorizationRequests`,
    getAuthorizationRequest: `engagement/${API_PARAMETERS.engagementId}/GroupNameDataAuthorization/AuthorizationResendInformation`,
    resendAuthorizationRequest: `engagement/${API_PARAMETERS.engagementId}/GroupNameDataAuthorization/AuthorizationResend`,
    getIsAuthorizedTimezoneSelected: `engagement/${API_PARAMETERS.engagementId}/GroupNameDataManagement/GetIsAuthorizedTimezoneSelected`,
    createScheduleTask: `engagement/${API_PARAMETERS.engagementId}/GroupNameDataManagement/CreateScheduleTask`,
    updateScheduleTask: `engagement/${API_PARAMETERS.engagementId}/GroupNameDataManagement/UpdateScheduleTask`,
    getScheduleTasks: `engagement/${API_PARAMETERS.engagementId}/GroupNameDataManagement/GetScheduleTasks`,
    cancelScheduleTasks: `engagement/${API_PARAMETERS.engagementId}/GroupNameDataManagement/CancelScheduleTasks`,
    getExtractionStatus: `engagement/${API_PARAMETERS.engagementId}/GroupNameDataManagement/GetExtractionStatus`,
    retryExtractionData: `engagement/${API_PARAMETERS.engagementId}/GroupNameDataManagement/RetryExtractionData`,
    reAuthenticate: `engagement/${API_PARAMETERS.engagementId}/GroupNameDataAuthorization/ReAuthentication`
  },
  ENGAGEMENT_MGMT: {
    updateAuthorizedInstitutionTimeZone: `engagement/${API_PARAMETERS.engagementId}/GroupNameDataManagement/UpdateAuthorizedInstitutionTimeZone`,
    getAuthorizedInstitutions: `engagement/${API_PARAMETERS.engagementId}/GroupNameDataManagement/GetEngagementAuthorizedInstitutions`
  },
  GENERAL_INFO: { getAllTimezones: `GeneralGroupNameData/GetAllTimeZones` },
  MATCHING: {
    getInfoMatching: `engagement/${API_PARAMETERS.engagementId}/Matching/Matching`,
    cancelMatching: `engagement/${API_PARAMETERS.engagementId}/Matching/CancelMatching`
  }
}

const ACTION_GLDATA = {
  uploadTransactionDataFilePart: `engagement/${API_PARAMETERS.engagementId}/TransactionDataManagement/UploadTransactionDataFilePart`,
  cancelUploadedTransactionDataFile: `engagement/${API_PARAMETERS.engagementId}/TransactionDataManagement/CancelUploadedTransactionDataFile`,
  mergeTransactionDataFileParts: `engagement/${API_PARAMETERS.engagementId}/TransactionDataManagement/MergeTransactionDataFileParts`,
  getTransactionalDataFiles: `engagement/${API_PARAMETERS.engagementId}/TransactionDataManagement/GetTransactionalDataFiles`,
  getTransactionalDataFileById: `engagement/${API_PARAMETERS.engagementId}/TransactionDataManagement/GetTransactionalDataFileById`,
  getTransactionalDataDetails: `engagement/${API_PARAMETERS.engagementId}/TransactionDataManagement/GetTransactionalDataDetails`,
  getTransactionalDataFileTemplate: `GeneralGLData/GetTransactionalDataFileTemplate`,
  getTransactionalDataFileError: `engagement/${API_PARAMETERS.engagementId}/TransactionDataManagement/GetTransactionalDataFileError`,
  disablePreviousUploadedTransactionalData: `engagement/${API_PARAMETERS.engagementId}/TransactionDataManagement/disablePreviousUploadedTransactionalData`,
  checkMatchingRunning: `engagement/${API_PARAMETERS.engagementId}/TransactionDataManagement/CheckMatchingRunning`
}

export {
  CONFIG_TYPE,
  ACTION_ENGMANAGEMENT,
  ACTION_OPM,
  SERVICE_NAME,
  ACTION_GroupNameDATA,
  GRAPH_PATH_URL,
  ACTION_GLDATA
}
