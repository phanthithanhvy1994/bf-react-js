// Common messages
import { defineMessages } from 'react-intl'

export const scope = 'Common'
export default defineMessages({
  systemValidationInvalidCharacter: {
    id: `${scope}.SystemValidationInvalidCharacter`,
    defaultMessage: 'The character {characters} is invalid.'
  },
  systemValidationInvalidCharacters: {
    id: `${scope}.SystemValidationInvalidCharacters`,
    defaultMessage: 'The characters {characters} are invalid.'
  },
  systemValidationMaxLength: {
    id: `${scope}.SystemValidationMaxLength`,
    defaultMessage: 'You have exceeded the maximum character limit.'
  },
  systemValidationInvalidEmail: {
    id: `${scope}.SystemValidationInvalidEmail`,
    defaultMessage: 'You have entered an invalid e-mail format.'
  }
})