import { systemValidation } from 'src/config/constants'

import { AddFinancialInstitutionMes } from './constants'

export const validationForm = {
  country: {
    required: AddFinancialInstitutionMes.countryRequired
  },
  institution: {
    required: AddFinancialInstitutionMes.institutionRequired,
    validate: {
      emptyCharacter: (value) => systemValidation.emptyCharacter(value, validationForm.institution.required)
    }
  }
}