import { defineMessages } from 'react-intl'

export const scope = 'ContentTaskModal'

export default defineMessages({
  scheduleExtraction: {
    id: `${scope}.ScheduleExtraction`,
    defaultMessage: 'Schedule extraction'
  },
  scheduleDate: {
    id: `${scope}.ScheduleDate`,
    defaultMessage: 'Schedule date'
  },
  scheduleTime: {
    id: `${scope}.ScheduleTime`,
    defaultMessage: 'Schedule time'
  },
  status: {
    id: `${scope}.Status`,
    defaultMessage: 'Status'
  },
  headerConfirm: {
    id: `${scope}.HeaderConfirm`,
    defaultMessage: 'Are you sure you want to leave?'
  },
  contentConfirm: {
    id: `${scope}.ContentConfirm`,
    defaultMessage: `If you don't save before you leave, any changes you may have made will be lost.`
  },
  confirmBtn: {
    id: `${scope}.ConfirmBtn`,
    defaultMessage: 'Confirm'
  },
  cancelBtn: {
    id: `${scope}.CancelBtn`,
    defaultMessage: 'Cancel'
  },
  saveBtn: {
    id: `${scope}.SaveBtn`,
    defaultMessage: 'Save'
  },
  closeBtn: {
    id: `${scope}.CloseBtn`,
    defaultMessage: 'Close'
  },
  scheduleDateRequired: {
    id: `${scope}.ScheduleDateRequired`,
    defaultMessage: 'Schedule date cannot be left empty.'
  },
  scheduleTimeRequired: {
    id: `${scope}.ScheduleTimeRequired`,
    defaultMessage: 'Schedule time cannot be left empty.'
  },
  scheduleValidateMinTimeSelect: {
    id: `${scope}.ScheduleValidateMinTimeSelect`,
    defaultMessage: 'Please schedule the extraction at least 24 hours in advance.'
  },

  warningCanNotScheduleHeader: {
    id: `${scope}.WarningCanNotScheduleHeader`,
    defaultMessage: 'Your task cannot be scheduled'
  },
  warningCanNotScheduleContent: {
    id: `${scope}.WarningCanNotScheduleContent`,
    defaultMessage: 'You task cannot be scheduled due to (technical reason-exception). Please try again later.'
  },
  warningMaximumNumberOfScheduledHeader: {
    id: `${scope}.WarningMaximumNumberOfScheduledHeader`,
    defaultMessage: 'You have reached the maximum number of scheduled extraction tasks.'
  },
  warningMaximumNumberOfScheduledContent: {
    id: `${scope}.WarningMaximumNumberOfScheduledContent`,
    defaultMessage: 'You cannot schedule a new extraction until an already scheduled extraction is executed.'
  },
  warningTimeZoneAuthorizedInstitutionsHeader: {
    id: `${scope}.WarningTimeZoneAuthorizedInstitutionsHeader`,
    defaultMessage: 'Please select a time zone within the "Authorized Institutions" view.'
  },
  warningTimeZoneAuthorizedInstitutionsContent: {
    id: `${scope}.WarningTimeZoneAuthorizedInstitutionsContent`,
    defaultMessage: 'To create a task you need to select a time zone for all of your financial institutions within the "Authorized Institutions" view.'
  },
  warningTheSameScheduledTimeHeader: {
    id: `${scope}.WarningTheSameScheduledTimeHeader`,
    defaultMessage: 'Please review the date and time of the extraction you want to schedule.'
  },
  warningTheSameScheduledTimeContent: {
    id: `${scope}.WarningTheSameScheduledTimeContent`,
    defaultMessage: 'You cannot schedule an extraction at the same date and time for which another extraction task has already been scheduled.'
  },
  warningConsentIDExpiredHeader: {
    id: `${scope}.WarningConsentIDExpiredHeader`,
    defaultMessage: 'One or more consent ID(s) are about to expire.'
  },
  warningConsentIDExpiredContent: {
    id: `${scope}.WarningConsentIDExpiredContent`,
    defaultMessage: 'If applicable, the engagement owner(s) will receive an email notification to re-authenticate the consent ID(s).'
  },
  warningConsentIDExpirationNoticeHeader: {
    id: `${scope}.WarningConsentIDExpirationNoticeHeader`,
    defaultMessage: 'Consent ID(s) expiration notice. '
  },
  warningConsentIDExpirationNoticeContent: {
    id: `${scope}.WarningConsentIDExpirationNoticeContent`,
    defaultMessage: 'One or more consent ID(s) will either expire before your scheduled extraction date or will breach the allowed limit to extend within {extractiondateLimit} days*.  If applicable, the engagement owner(s) will receive an email notification to re-authenticate the consent ID(s). {br}* Please consider the consent ID validity period while scheduling the extractions.'
  },
  warningLimitTimeEditingScheduleTask: {
    id: `${scope}.WarningLimitTimeEditingScheduleTask`,
    defaultMessage: 'Your editing session for the scheduled extraction task has timed out.'
  },
  messageTaskBlocked: {
    id: `${scope}.MessageTaskBlocked`,
    defaultMessage: 'The extraction task is blocked by {userName}. Please reach out to {userName} in order to proceed with your intended schedule extraction.'
  },
  yesBtn: {
    id: `${scope}.YesBtn`,
    defaultMessage: 'Yes'
  }
})
