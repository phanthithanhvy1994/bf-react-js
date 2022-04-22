import React from 'react'
import { FormattedMessage } from 'react-intl'
import { defaultMinTimeBeforeScheduled, defaultTimeLimitEditingScheduleTask } from 'src/config/constants'

import messages from './messages'

const minTimeBeforeScheduled = 1000 * 60 * 60 * (_.get(window.appsettings, 'MinTimeBeforeScheduled') || defaultMinTimeBeforeScheduled)//hours setting to milliseconds
const limitTimeEditing = 1000 * 60 * (_.get(window.appsettings, 'TimeLimitEditingScheduleTask') || defaultTimeLimitEditingScheduleTask) //minutes setting to milliseconds
const extractiondateLimit = _.get(window.appsettings, 'ConsentExpireIn') ?? 120

const taskMessages = {
  scheduleDate: <FormattedMessage {...messages.scheduleDate} />,
  scheduleTime: <FormattedMessage {...messages.scheduleTime} />,
  status: <FormattedMessage {...messages.status} />,
  headerConfirm: <FormattedMessage {...messages.headerConfirm} />,
  contentConfirm: <FormattedMessage {...messages.contentConfirm} />,
  confirmBtn: <FormattedMessage {...messages.confirmBtn} />,
  cancelBtn: <FormattedMessage {...messages.cancelBtn} />,
  saveBtn: <FormattedMessage {...messages.saveBtn} />,
  closeBtn: <FormattedMessage {...messages.closeBtn} />,
  scheduleTimeRequired: <FormattedMessage {...messages.scheduleTimeRequired} />,
  scheduleValidateMinTimeSelect: <FormattedMessage {...messages.scheduleValidateMinTimeSelect} />
}

const expirationWarningMessageStatusEnum = {
  expiryWarning: 0,
  expired : 1
}

const warningMessageKeyEnum = {
  canNotSchedule: {
    key: 'CanNotSchedule',
    value: 0
  },
  maximumNumberScheduled: {
    key: 'MaximumNumberScheduled',
    value: 1
  },
  theSameScheduledTime: {
    key: 'TheSameScheduledTime',
    value: 2
  },
  timeZoneAuthorized: {
    key: 'TimeZoneAuthorized',
    value: 3
  },
  consentIDExpired: {
    key: 'ConsentIDExpired',
    value: 4
  },
  consentIDExpiryWarning: {
    key: 'ConsentIDExpiryWarning',
    value: 5
  }
}

const warningMeassages = [
  {
    key: warningMessageKeyEnum.canNotSchedule.key,
    message: {
      header: <FormattedMessage {...messages.warningCanNotScheduleHeader} />,
      content: <FormattedMessage {...messages.warningCanNotScheduleContent} />
    }
  },
  {
    key: warningMessageKeyEnum.maximumNumberScheduled.key,
    message: {
      header: <FormattedMessage {...messages.warningMaximumNumberOfScheduledHeader} />,
      content: <FormattedMessage {...messages.warningMaximumNumberOfScheduledContent} />
    }
  },
  {
    key: warningMessageKeyEnum.theSameScheduledTime.key,
    message: {
      header: <FormattedMessage {...messages.warningTheSameScheduledTimeHeader} />,
      content: <FormattedMessage {...messages.warningTheSameScheduledTimeContent} />
    }
  },
  {
    key: warningMessageKeyEnum.timeZoneAuthorized.key,
    message: {
      header: <FormattedMessage {...messages.warningTimeZoneAuthorizedInstitutionsHeader} />,
      content: <FormattedMessage {...messages.warningTimeZoneAuthorizedInstitutionsContent} />
    }
  },
  {
    key: warningMessageKeyEnum.consentIDExpired.key,
    message: {
      className: 'expiry-warning-message',
      header: <FormattedMessage {...messages.warningConsentIDExpiredHeader} />,
      content: <FormattedMessage {...messages.warningConsentIDExpiredContent} />
    }
  },
  {
    key: warningMessageKeyEnum.consentIDExpiryWarning.key,
    message: {
      className: 'expiry-warning-message',
      header: <FormattedMessage {...messages.warningConsentIDExpirationNoticeHeader} />,
      content: <FormattedMessage {...messages.warningConsentIDExpirationNoticeContent} 
                                  values={{ 
                                    extractiondateLimit: extractiondateLimit,
                                    br: (<><br /><br /></>)
                                   }} />
    }
  }
]

export {
  minTimeBeforeScheduled,
  limitTimeEditing,
  taskMessages,
  warningMessageKeyEnum,
  warningMeassages,
  expirationWarningMessageStatusEnum
}
