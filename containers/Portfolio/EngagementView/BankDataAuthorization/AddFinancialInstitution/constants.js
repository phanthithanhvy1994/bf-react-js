import React from 'react'
import { FormattedMessage } from 'react-intl'

import messages from './messages'

const AddFinancialInstitutionMes = {
  addAnotherFinancialInstitution: <FormattedMessage {...messages.addAnotherFinancialInstitution} />,
  addAnotherCountry: <FormattedMessage {...messages.addAnotherCountry} />,
  countryRequired: <FormattedMessage {...messages.countryRequired} />,
  institutionRequired: <FormattedMessage {...messages.institutionRequired} />,
  country: <FormattedMessage {...messages.country} />,
  financialInstitution: <FormattedMessage {...messages.financialInstitution} />,
  sendErrorByEngagementDeleted: <FormattedMessage {...messages.sendErrorByEngagementDeleted} />
}

const OPTIONS_LIMIT = 10

export {
  AddFinancialInstitutionMes,
  OPTIONS_LIMIT
}
