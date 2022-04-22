import { defineMessages } from 'react-intl'

export const scope = 'DeleteEngagement'
export default defineMessages({
  deleteBtn: {
    id: `${scope}.DeleteBtn`,
    defaultMessage: 'Delete'
  },
  canSubmit: {
    id: `${scope}.CanSubmit`,
    defaultMessage: 'Submit for deletion'
  },
  canApprove: {
    id: `${scope}.CanApprove`,
    defaultMessage: 'Approve deletion'
  },
  canReject: {
    id: `${scope}.CanReject`,
    defaultMessage: 'Reject deletion'
  }
})