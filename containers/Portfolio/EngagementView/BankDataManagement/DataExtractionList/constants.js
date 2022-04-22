import React from 'react'
import { FormattedMessage } from 'react-intl'
import messages from './messages'
import { defaultMaximumNumberScheduled } from 'src/config/constants'

const maxCreateScheduledTask = _.get(window.appsettings, 'MaximumNumberScheduled') || defaultMaximumNumberScheduled

const scheduleTaskMessages = {
  createTask: <FormattedMessage {...messages.createTask} />,
  cancelTask: <FormattedMessage {...messages.cancelTask} />,
}

const scheduleTaskStatus = {
  scheduled: 0,
  inProgress: 1,
  completed: 2,
  failed: 3,
  cancelled: 4
}

const scheduleTaskStatusMessages = {
  statusScheduled: { id: scheduleTaskStatus.scheduled, value: <FormattedMessage {...messages.scheduled} /> },
  statusInProgress: { id: scheduleTaskStatus.inProgress, value: <FormattedMessage {...messages.inProgress} /> },
  statusCompleted: { id: scheduleTaskStatus.completed, value: <FormattedMessage {...messages.completed} /> },
  statusFailed: { id: scheduleTaskStatus.failed, value: <FormattedMessage {...messages.failed} /> },
  statusCancelled: { id: scheduleTaskStatus.cancelled, value: <FormattedMessage {...messages.cancelled} /> },
}

export {
  maxCreateScheduledTask,
  scheduleTaskMessages,
  scheduleTaskStatusMessages,
  scheduleTaskStatus,
}
