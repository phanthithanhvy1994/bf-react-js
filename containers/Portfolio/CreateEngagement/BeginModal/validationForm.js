import React from 'react'
import { FormattedMessage } from 'react-intl'

import messages from './messages'

export const validationForm = {
  container: {
    required: <FormattedMessage {...messages.containerRequired} />
  },
  language: {
    required: <FormattedMessage {...messages.languageRequired} />
  }
}