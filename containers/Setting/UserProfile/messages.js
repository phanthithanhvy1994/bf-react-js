import { defineMessages } from 'react-intl'

export const scope = 'UserSettings'
export default defineMessages({
  userProfile: {
    id: `${scope}.UserProfile`,
    defaultMessage: 'User Profile'
  },
  personalInformation: {
    id: `${scope}.PersonalInformation`,
    defaultMessage: 'Personal Information'
  },
  preferences: {
    id: `${scope}.Preferences`,
    defaultMessage: 'Preferences'
  },
  language: {
    id: `${scope}.Language`,
    defaultMessage: 'Language'
  },
  locale: {
    id: `${scope}.Locale`,
    defaultMessage: 'Locale'
  },
  dnformatting: {
    id: `${scope}.Dnformatting`,
    defaultMessage: 'Date and numberical formatting'
  },
  saveChanges: {
    id: `${scope}.SaveChanges`,
    defaultMessage: 'Save changes'
  },
  userRequestError: {
    id: `${scope}.User.Request.ErrorMessage`,
    defaultMessage: 'The invalid data user.'
  },
  saved: {
    id: `${scope}.Saved`,
    defaultMessage: 'Changes have been saved!'
  }
})
