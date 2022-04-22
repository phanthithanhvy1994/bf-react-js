import React from 'react'
import { FormattedMessage } from 'react-intl'

import { systemValidation } from 'src/config/constants'

import messages from './messages'

export const validationForm = {
  firstName: {
    required: <FormattedMessage {...messages.firstNameRequired} />,
    maxLength: {
      value: systemValidation.characterslimit.max200,
      message: <FormattedMessage id='Common.SystemValidationMaxLength' />
    },
    pattern: systemValidation.validateInputCharacters.pattern,
    validate: {
      emptyCharacter: (value) => systemValidation.emptyCharacter(value, validationForm.firstName.required)
    }
  },
  lastName: {
    required: <FormattedMessage {...messages.lastNameRequired} />,
    maxLength: {
      value: systemValidation.characterslimit.max200,
      message: <FormattedMessage id='Common.SystemValidationMaxLength' />
    },
    pattern: systemValidation.validateInputCharacters.pattern,
    validate: {
      emptyCharacter: (value) => systemValidation.emptyCharacter(value, validationForm.lastName.required)
    }
  },
  email: {
    required: <FormattedMessage {...messages.emailRequired} />,
    maxLength: {
      value: systemValidation.characterslimit.max300,
      message: <FormattedMessage id='Common.SystemValidationMaxLength' />
    },
    pattern: systemValidation.validateInputCharacters.pattern,
    validate: {
      validateEmail: (value) => systemValidation.validateEmail(value, <FormattedMessage id='Common.SystemValidationInvalidEmail' />)
    }
  }
}