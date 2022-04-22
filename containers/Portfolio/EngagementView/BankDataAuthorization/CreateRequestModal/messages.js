import { defineMessages } from 'react-intl'

export const scope = 'BDA'

export default defineMessages({
  cancelBtn: {
    id: `${scope}.CancelBtn`,
    defaultMessage: 'Cancel'
  },
  nextBtn: {
    id: `${scope}.NextBtn`,
    defaultMessage: 'Next'
  },
  sendBtn: {
    id: `${scope}.SendBtn`,
    defaultMessage: 'Send'
  },
  closeBtn: {
    id: `${scope}.CloseBtn`,
    defaultMessage: 'Close'
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
  clientDetails: {
    id: `${scope}.ClientDetails`,
    defaultMessage: 'Client Details'
  },
  financialInstitutions: {
    id: `${scope}.FinancialInstitutions`,
    defaultMessage: 'Financial Institutions'
  },
  selectIns: {
    id: `${scope}.SelectIns`,
    defaultMessage: 'Select Financial Institution'
  },
  addOtherCountry: {
    id: `${scope}.AddOtherCountry`,
    defaultMessage: 'Add another country'
  },
  firstNameRequired: {
    id: `${scope}.FirstNameRequired`,
    defaultMessage: 'First Name cannot be left empty.'
  },
  lastNameRequired: {
    id: `${scope}.LastNameRequired`,
    defaultMessage: 'Last Name cannot be left empty.'
  },
  emailRequired: {
    id: `${scope}.EmailRequired`,
    defaultMessage: 'Email cannot be left empty.'
  },
  somethingWentWrong: {
    id: `${scope}.SomethingWentWrong`,
    defaultMessage: 'Something went wrong!'
  },
  sentSuccess: {
    id: `${scope}.SentSuccess`,
    defaultMessage: 'Your request has been saved in the system.'
  },
  warningEmailHeader: {
    id: `${scope}.WarningEmaiHeader`,
    defaultMessage: 'The email cannot be sent'
  },
  warningEmailContent: {
    id: `${scope}.WarningEmailContent`,
    defaultMessage: 'The request has already been sent out with the current email.'
  },
  confirmBtn: {
    id: `${scope}.ConfirmBtn`,
    defaultMessage: 'Confirm'
  },
  headerConfirm: {
    id: `${scope}.HeaderConfirm`,
    defaultMessage: 'Are you sure you want to leave?'
  },
  contentConfirm: {
    id: `${scope}.ContentConfirm`,
    defaultMessage: `If you don't save before you leave, any changes you may have made will be lost.`
  },
  sendErrorByEngagementDeleted: {
    id: `${scope}.SendErrorByEngagementDeleted`,
    defaultMessage: 'The Audit team is in the process of deleting this engagement. Please reach out to your Audit team for questions.'
  },
  yesBtn: {
    id: `${scope}.YesBtn`,
    defaultMessage: 'Yes'
  },
  confirmBeforeSend: {
    id: `${scope}.ConfirmBeforeSend`,
    defaultMessage: `Are you sure you want to send the request to the email "{email}"?`
  }
})
