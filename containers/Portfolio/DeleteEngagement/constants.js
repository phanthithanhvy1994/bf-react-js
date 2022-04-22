import React from 'react'
import { FormattedMessage } from 'react-intl'

import messages from './messages'

const delOptionsConst = [
  { key: 'canSubmit', text: <FormattedMessage {...messages.canSubmit} />, value: 'submit', disabled: true },
  { key: 'canApprove', text: <FormattedMessage {...messages.canApprove} />, value: 'approve', disabled: true },
  { key: 'canReject', text: <FormattedMessage {...messages.canReject} />, value: 'reject', disabled: true}
]

const deleteBtn = messages.deleteBtn

export {
  delOptionsConst,
  deleteBtn
}