import { defineMessages } from 'react-intl'

export const scope = 'BeginModal'
export default defineMessages({
  selectLabel: {
    id: `${scope}.SelectLabel`,
    defaultMessage: 'To begin, select a Cloud Cabinet below:',
  },
  containerRequired: {
    id: `${scope}.ContainerRequired`,
    defaultMessage: 'Container cannot be left empty.'
  },
  languageLabel: {
    id: `${scope}.LanguageLabel`,
    defaultMessage: 'Language',
  },
  languageRequired: {
    id: `${scope}.LanguageRequired`,
    defaultMessage: 'Language cannot be left empty.'
  },
  errorContent: {
    id: `${scope}.ErrorContent`,
    defaultMessage: 'Your account has not been set up to be able to create engagements. Contact your IT support.',
  },
  errorHeader: {
    id: `${scope}.ErrorHeader`,
    defaultMessage: 'Looks like there was an error',
  },
  buttonClose: {
    id: `${scope}.ButtonClose`,
    defaultMessage: 'Close',
  },
  buttonBegin: {
    id: `${scope}.ButtonBegin`,
    defaultMessage: 'Begin',
  },
  buttonCancel: {
    id: `${scope}.ButtonCancel`,
    defaultMessage: 'Cancel',
  },
  languagePopup: {
    id: `${scope}.LanguagePopup`,
    defaultMessage: 'Only English is supported under current release. More language options will come soon.',
  }
})