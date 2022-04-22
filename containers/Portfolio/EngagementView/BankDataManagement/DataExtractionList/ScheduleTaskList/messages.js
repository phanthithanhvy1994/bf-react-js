import { defineMessages } from 'react-intl'

export const scope = 'ScheduleTaskList'

export default defineMessages({
  scheduledExtraction: {
    id: `${scope}.ScheduledExtraction`,
    defaultMessage: 'Scheduled Extraction'
  },
  createdDate: {
    id: `${scope}.CreatedDate`,
    defaultMessage: 'Created Date'
  },
  status: {
    id: `${scope}.Status`,
    defaultMessage: 'Status'
  },
  taskOwner: {
    id: `${scope}.TaskOwner`,
    defaultMessage: 'Task Owner'
  },
  lastChangedBy: {
    id: `${scope}.LastChangedBy`,
    defaultMessage: 'Last Changed By'
  },
  cellEmpty: {
    id: `${scope}.CellEmpty`,
    defaultMessage: ' '
  },
  emptySchedule: {
    id: `${scope}.EmptySchedule`,
    defaultMessage: 'No extraction has been scheduled.'
  },
  contentConfirmCancelTask: {
    id: `${scope}.ContentConfirm`,
    defaultMessage: `Are you sure you want to cancel the extraction task(s)?`
  },
  closeBtn: {
    id: `${scope}.CloseBtn`,
    defaultMessage: 'Close'
  },
  cancelBtn: {
    id: `${scope}.CancelBtn`,
    defaultMessage: 'Cancel'
  },
  viewFailures: {
    id: `${scope}.ViewFailures`,
    defaultMessage: 'View failures'
  }
})
