import { defineMessages } from 'react-intl'

export const scope = 'BDA'

export default defineMessages({
  createRequest: {
    id: `${scope}.CreateRequest`,
    defaultMessage: 'Create request'
  },
  deleteBtn: {
    id: `${scope}.DeleteBtn`,
    defaultMessage: 'Delete'
  },
  cellEmpty: {
    id: `${scope}.CellEmpty`,
    defaultMessage: ' '
  },
  clientName: {
    id: `${scope}.ClientName`,
    defaultMessage: 'Client Name'
  },
  clientEmail: {
    id: `${scope}.ClientEmail`,
    defaultMessage: 'Client Email'
  },
  sendDate: {
    id: `${scope}.SendDate`,
    defaultMessage: 'Sent Date'
  },
  linkStatus: {
    id: `${scope}.LinkStatus`,
    defaultMessage: 'Link Status'
  },
  author: {
    id: `${scope}.Author`,
    defaultMessage: '# of Authorized Institutions'
  },
  resendBtn: {
    id: `${scope}.ResendBtn`,
    defaultMessage: 'Resend'
  },
  emptyRequests: {
    id: `${scope}.EmptyRequests`,
    defaultMessage: 'There are no requests.'
  },
  limitModalHeader: {
    id: `${scope}.LimitModalHeader`,
    defaultMessage: 'You have reached the maximum resent limit.'
  },
  limitModalContent: {
    id: `${scope}.LimitModalContent`,
    defaultMessage: 'To send your email, please create a new request.'
  },
  closeBtn: {
    id: `${scope}.CloseBtn`,
    defaultMessage: 'Close'
  },
  resendModalContent: {
    id: `${scope}.ResendModalContent`,
    defaultMessage: 'Do you want to update the financial institutions before resending the request?'
  },
  noBtn: {
    id: `${scope}.NoBtn`,
    defaultMessage: 'No'
  },
  yesBtn: {
    id: `${scope}.YesBtn`,
    defaultMessage: 'Yes'
  },
  deleteModalBodyContent: {
    id: `${scope}.DeleteModalBodyContent`,
    defaultMessage: 'Are you sure you want to delete?'
  },
  buttonDelete: {
    id: `${scope}.ButtonDelete`,
    defaultMessage: 'Delete'
  },
  buttonCancel: {
    id: `${scope}.ButtonCancel`,
    defaultMessage: 'Cancel'
  },
  sendSuccess: {
    id: `${scope}.SendSuccess`,
    defaultMessage: 'Your request has been saved in the system.'
  },
  sendErrorByEngagementDeleted:{
    id: `${scope}.SendErrorByEngagementDeleted`,
    defaultMessage: 'The Audit team is in the process of deleting this engagement. Please reach out to your Audit team for questions.'
  },
  SendErrorByEngagementEdited: {
    id: `${scope}.SendErrorByEngagementEdited`,
    defaultMessage: 'The Audit team is in the process of editing this request. Please refresh.'
  }
})
