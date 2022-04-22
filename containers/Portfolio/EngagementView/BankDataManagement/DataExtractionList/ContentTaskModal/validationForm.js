import React from 'react'
import { FormattedMessage } from 'react-intl'

import messages from './messages'

export const validationForm = {
  scheduleDate: {
    required: <FormattedMessage {...messages.scheduleDateRequired} />
  },
  scheduleTime: {
    required: <FormattedMessage {...messages.scheduleTimeRequired} />
  },
  status: {
    required: <FormattedMessage {...messages.scheduleTimeRequired} />
  }
}