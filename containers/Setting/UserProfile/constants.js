import React from 'react'
import { FormattedMessage } from 'react-intl'

import { routes } from "src/config"

import messages from './messages'

const showPromptUrls = [routes.index, routes.portfolio.index]

const exampleString = {
  number: '1234567.89'
}

const languageOptions = [
  { key: 'en-US', value: 'English' }
]

const userSettingsMessages = {
  userProfile: <FormattedMessage {...messages.userProfile} />,
  personalInformation: <FormattedMessage {...messages.personalInformation} />,
  preferences: <FormattedMessage {...messages.preferences} />,
  language: <FormattedMessage {...messages.language} />,
  locale: <FormattedMessage {...messages.locale} />,
  dnformatting: <FormattedMessage {...messages.dnformatting} />,
  saveChanges: <FormattedMessage {...messages.saveChanges} />,
  userRequestError: <FormattedMessage {...messages.userRequestError} />,
  saved: <FormattedMessage {...messages.saved} />
}

export { showPromptUrls, exampleString, languageOptions, userSettingsMessages }