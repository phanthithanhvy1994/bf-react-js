import React from 'react'
import { FormattedMessage } from 'react-intl'
import { defaultMinTimeBeforeScheduled } from 'src/config/constants'
import messages from './messages'

const scheduleTaskListMessages = {
  emptySchedule: <FormattedMessage {...messages.emptySchedule} />,
  viewFailures: <FormattedMessage {...messages.viewFailures} />
}

const minTimeBeforeScheduled = 1000 * 60 * 60 * (_.get(window.appsettings, 'MinTimeBeforeScheduled') || defaultMinTimeBeforeScheduled)//hours setting to milliseconds

const headerTable = [
  { text: <FormattedMessage {...messages.cellEmpty} /> , width: 1 },
  { text: <FormattedMessage {...messages.scheduledExtraction} /> },
  { text: <FormattedMessage {...messages.createdDate} /> },
  { text: <FormattedMessage {...messages.status} /> },
  { text: <FormattedMessage {...messages.taskOwner} /> },
  { text: <FormattedMessage {...messages.lastChangedBy} /> },
  { text: <FormattedMessage {...messages.cellEmpty} /> }
]

const tableSettings = {
  rowHeight: 56,
  tableHeightOffset: 300,
  numberOfSecondToReload: 10
}

export {
  minTimeBeforeScheduled,
  scheduleTaskListMessages,
  headerTable,
  tableSettings
}