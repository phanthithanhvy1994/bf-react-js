import React from 'react'
import { FormattedMessage } from 'react-intl'

import messages from './messages'

const creationPrompt = {
  selectLabel: <FormattedMessage {...messages.selectLabel}/>,
  languageLabel: <FormattedMessage {...messages.languageLabel}/>,
  errorContent: messages.errorContent,
  errorHeader: messages.errorHeader,
  buttonClose: messages.buttonClose,
  buttonBegin: <FormattedMessage {...messages.buttonBegin}/>,
  buttonCancel: <FormattedMessage {...messages.buttonCancel}/>,
  languagePopup: <FormattedMessage {...messages.languagePopup}/>
}

const languageOptions = [
  { value: '48692687', text: 'English (default)', code: 'en-US' }
]

export {
  creationPrompt,
  languageOptions
}