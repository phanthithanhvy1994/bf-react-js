import React from 'react'
import { FormattedMessage } from 'react-intl'
import messages from './messages'

const extractionStatuskMessages = {
  extractionStatus: <FormattedMessage {...messages.extractionStatus} />,
  successful: <FormattedMessage {...messages.successful} />,
  fail: <FormattedMessage {...messages.fail} />,
  retry: <FormattedMessage {...messages.retry} />,
  retryAll: <FormattedMessage {...messages.retryAll} />,
  retryFail: <FormattedMessage {...messages.retryFail} />,
  retryFailMessage: <FormattedMessage {...messages.retryFailMessage} />,
  retrySuccessMessage: <FormattedMessage {...messages.retrySuccessMessage} />,
  invalidToken: <FormattedMessage {...messages.invalidToken} />,
  inprogress: <FormattedMessage {...messages.inprogress} />,
  viewExtract: <FormattedMessage {...messages.viewExtract} />,
  closeBtn: <FormattedMessage {...messages.close} />,
  starSymbol: <FormattedMessage {...messages.starSymbol} />
}

export { extractionStatuskMessages }
