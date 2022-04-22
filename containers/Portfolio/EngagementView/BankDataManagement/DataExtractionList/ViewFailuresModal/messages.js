import { defineMessages } from 'react-intl'

export const scope = 'ExtractionStatus'

export default defineMessages({
  extractionStatus: {
    id: `${scope}.ExtractionStatus`,
    defaultMessage: 'Extraction status'
  },
  successful: {
    id: `${scope}.Successful`,
    defaultMessage: 'Successful'
  },
  fail: {
    id: `${scope}.Fail`,
    defaultMessage: 'Failed'
  },
  close: {
    id: `${scope}.Close`,
    defaultMessage: 'Close'
  },
  retry: {
    id: `${scope}.Retry`,
    defaultMessage: 'Retry'
  },
  retryAll: {
    id: `${scope}.RetryAll`,
    defaultMessage: 'Retry all'
  },
  retryFail: {
    id: `${scope}.RetryFail`,
    defaultMessage: 'Retry failed'
  },
  invalidToken: {
    id: `${scope}.InvalidToken`,
    defaultMessage: 'Invalid access token. Retry unavailable.'
  },
  inprogress: {
    id: `${scope}.Inprogress`,
    defaultMessage: 'The extraction of your GroupName data is in progress. You may navigate to another page while this process is in progress.'
  },
  retryFailMessage: {
    id: `${scope}.RetryFailMessage`,
    defaultMessage: 'You may only retry once. For further extraction, please schedule a new extraction task'
  },
  retrySuccessMessage: {
    id: `${scope}.RetrySuccessMessage`,
    defaultMessage: 'Retry successful'
  },
  viewExtract: {
    id: `${scope}.ViewExtract`,
    defaultMessage: 'View extract'
  },
  starSymbol: {
    id: `${scope}.StarSymbol`,
    defaultMessage: '*'
  }
})
