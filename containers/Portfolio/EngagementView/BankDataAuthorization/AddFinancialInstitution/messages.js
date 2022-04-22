import { defineMessages } from 'react-intl'

export const scope = 'BDA'

export default defineMessages({
  countryRequired: {
    id: `${scope}.CountryRequired`,
    defaultMessage: 'Country cannot be left empty.'
  },
  institutionRequired: {
    id: `${scope}.InstitutionlRequired`,
    defaultMessage: 'Financial institution cannot be left empty.'
  },
  addAnotherFinancialInstitution: {
    id: `${scope}.AddAnotherFinancialInstitution`,
    defaultMessage: 'Add another financial institution'
  },
  addAnotherCountry: {
    id: `${scope}.AddAnotherCountry`,
    defaultMessage: 'Add another country'
  },
  newFinancialInstitution: {
    id: `${scope}.NewFinancialInstitution`,
    defaultMessage: 'New Financial Institution:'
  },
  country: {
    id: `${scope}.Country`,
    defaultMessage: 'Country'
  },
  financialInstitution: {
    id: `${scope}.FinancialInstitution`,
    defaultMessage: 'Financial institution'
  },
  sendErrorByEngagementDeleted: {
    id: `${scope}.SendErrorByEngagementDeleted`,
    defaultMessage: 'The Audit team is in the process of deleting this engagement. Please reach out to your Audit team for questions.'
  },
  selectFinancial: {
    id: `${scope}.SelectFinancial`,
    defaultMessage: 'Select Financial Institution'
  }
})