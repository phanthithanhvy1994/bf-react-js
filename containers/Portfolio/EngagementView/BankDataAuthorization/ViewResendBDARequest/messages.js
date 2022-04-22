import { defineMessages } from 'react-intl'

export const scope = 'BDA'

export default defineMessages({
  leaveModalHeader: {
    id: `${scope}.LeaveModalHeader`,
    defaultMessage: 'Are you sure you want to leave?'
  },
  leaveModalContent: {
    id: `${scope}.LeaveModalContent`,
    defaultMessage: 'If you don’t save before you leave, any changes you may have made will be lost.'
  },
  cancelBtn: {
    id: `${scope}.CancelBtn`,
    defaultMessage: 'Cancel'
  },
  nextBtn: {
    id: `${scope}.NextBtn`,
    defaultMessage: 'Next'
  },
  yesBtn: {
    id: `${scope}.YesBtn`,
    defaultMessage: 'Yes'
  },
  linkStatus: {
    id: `${scope}.LinkStatus`,
    defaultMessage: 'Link Status'
  },
  selectedFinancialInstitutions: {
    id: `${scope}.SelectedFinancialInstitutions`,
    defaultMessage: 'Selected Financial Institutions:'
  },
  authorized: {
    id: `${scope}.Authorized`,
    defaultMessage: 'Authorized'
  },
  pendingAuthorization: {
    id: `${scope}.PendingAuthorization`,
    defaultMessage: 'Pending Authorization'
  },
  clientDetails: {
    id: `${scope}.ClientDetails`,
    defaultMessage: 'Client Details'
  },
  firstName: {
    id: `${scope}.FirstName`,
    defaultMessage: 'First Name'
  },
  lastName: {
    id: `${scope}.LastName`,
    defaultMessage: 'Last Name'
  },
  email: {
    id: `${scope}.Email`,
    defaultMessage: 'Email'
  },
  clientInformation: {
    id: `${scope}.ClientInformation`,
    defaultMessage: 'Client Information'
  },
  financialInstitutions: {
    id: `${scope}.Financial Institutions`,
    defaultMessage: 'Financial Institutions'
  },
  sendBtn: {
    id: `${scope}.SendBtn`,
    defaultMessage: 'Send'
  },
  warningLimitTimeEditingBDAAuthorization: {
    id: `${scope}.WarningLimitTimeEditingBDAAuthorization`,
    defaultMessage: 'Your editing session for BDA Authorization Request has been timeout!'
  }
})
