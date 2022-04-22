import React from 'react'
import { FormattedMessage } from 'react-intl'

import { systemValidation } from 'src/config/constants'

import messages from './messages'

export const validationForm = {
  engagementName: {
    required: <FormattedMessage {...messages.engagementNameRequired} />,
    maxLength: {
      value: systemValidation.characterslimit.max200,
      message: <FormattedMessage id='Common.SystemValidationMaxLength' />
    },
    pattern: systemValidation.validateInputCharacters.pattern,
    validate: {
      emptyCharacter: (value) => systemValidation.emptyCharacter(value, validationForm.engagementName.required)
    }
  },
  engagementType: {
    required: <FormattedMessage {...messages.engagementTypeRequired} />
  },
  periodEndDate: {
    required: <FormattedMessage {...messages.periodEndDateRequired} />
  },
  country: {
    required: <FormattedMessage {...messages.countryRequired} />
  },
  entityName: {
    required: <FormattedMessage {...messages.entityNameRequired} />,
    maxLength: {
      value: systemValidation.characterslimit.max500,
      message: <FormattedMessage id='Common.SystemValidationMaxLength' />
    },
    pattern: systemValidation.validateInputCharacters.pattern,
    validate: {
      emptyCharacter: (value) => systemValidation.emptyCharacter(value, validationForm.entityName.required)
    }
  },
  entityChargeCode: {
    required: <FormattedMessage {...messages.entityChargeCodeRequired} />,
    maxLength: {
      value: systemValidation.characterslimit.max500,
      message: <FormattedMessage id='Common.SystemValidationMaxLength' />
    },
    pattern: systemValidation.validateInputCharacters.pattern,
    validate: {
      emptyCharacter: (value) => systemValidation.emptyCharacter(value, validationForm.entityChargeCode.required)
    }
  }
}