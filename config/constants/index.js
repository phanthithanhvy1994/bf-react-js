const translationPath = '/translations/'

const CONTAINERCODE = {
  CA: 'CA',
  US: 'US'
}

const systemValidation = {
  validateInputCharacters: {
    pattern: {
      value: new RegExp(/^(?!.*<|.*>|.*:|.*"|.*\/|.*\\|.*\||.*\?|.*\*|.*?\.\.).*$/, 'i'),
      message: 'Common.SystemValidationInvalidCharacter',
      invalidCharacters: ['<', '>', ':', '"', '/', '\\', '|', '?', '*', '..']
    }
  },
  characterslimit: {
    max200: 200,
    max300: 300,
    max500: 500
  },
  emptyCharacter: (value, message) => {
    if (_.isNil(value) || value.toString().trim().length === 0) {
      return message
    }
  },
  validateEmail: (value, message) => {
    const regexEmail = /^([a-zA-Z0-9]+([\._-][a-zA-Z0-9]+)*)@([a-zA-Z0-9]+([\._-][a-zA-Z0-9]+)*(\.[a-zA-Z0-9]{2,})+)$/
    if (!regexEmail.test(value)) return message
  }
}

const GroupName_URL = {
  GroupName_DATA_AUTHORIZATION: 'GroupNamedata-authorization',
  GroupName_DATA_MANAGEMENT: 'GroupNamedata-management',
  TRANSACTIONAL_DATA_MANAGEMENT: 'transactionaldata-management',
  MATCHING: 'matching',
  TEAM_MANAGEMENT: 'team-management'
}

const API_PARAMETERS = {
  engagementId: '{engagementId}'
}

const REQUEST_MODEL = {
  uri: {},
  query: {},
  payload: {}
}

const LOGGED_OUT_EVENT = 'logged-out-event'
const ERROR_MESSAGES = {
  unauthorized: 'Unauthorized: Access is denied. Please sign in again. Thank you'
}

const DATE = {
  SHORT: { dateStyle: 'short' },
  MEDIUM: { year: 'numeric', month: 'short', day: '2-digit' },
  LONG: { year: '2-digit', month: 'long', day: 'numeric' },
  FULL: { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' },
  YEAR: { year: 'numeric' },
  NO_LOCAL_TIME: { dateStyle: 'short' }
}

const NUMBER = {
  BASE: { style: 'decimal', maximumFractionDigits: 2, minimumFractionDigits: 2 },
  INTEGER: { style: 'decimal', maximumFractionDigits: 0, minimumFractionDigits: 0 },
  FX_NUMBER: { style: 'decimal', maximumFractionDigits: 10, minimumFractionDigits: 2 },
  DECIMAL_PLACES_4: { style: 'decimal', maximumFractionDigits: 4, minimumFractionDigits: 4 }
}

const lockTypes = {
  scheduleTask: 'ScheduleTask',
  bdaAuthorization: 'BDAAuthorization'
}

const TIME = {
  TIME_NO_SECONDS: { hour: '2-digit', minute: '2-digit', hour12: false },
  TIME_HOUR12_NO_SECONDS: { hour: '2-digit', minute: '2-digit', hour12: true },
  DEFAULT_TIME: { hour: '2-digit', minute: '2-digit', hour12: false }
}

const OPTIONS_LIMIT = 10

const defaultMaximumNumberScheduled = 10
const defaultMinTimeBeforeScheduled = 24 // hours
const defaultTimeLimitEditingScheduleTask = 2 // minutes
const defaultTimeLimitEditingBDARequest = 2 // minutes
const GuidEmpty = '00000000-0000-0000-0000-000000000000'
const engagementOwnerCode = '48711153'

module.exports = {
  translationPath,
  CONTAINERCODE,
  systemValidation,
  GroupName_URL,
  API_PARAMETERS,
  REQUEST_MODEL,
  LOGGED_OUT_EVENT,
  ERROR_MESSAGES,
  DATE,
  NUMBER,
  lockTypes,
  TIME,
  defaultMaximumNumberScheduled,
  defaultMinTimeBeforeScheduled,
  defaultTimeLimitEditingScheduleTask,
  defaultTimeLimitEditingBDARequest,
  OPTIONS_LIMIT,
  GuidEmpty,
  engagementOwnerCode
}
