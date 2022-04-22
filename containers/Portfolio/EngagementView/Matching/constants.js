import React from 'react'
import { FormattedMessage } from 'react-intl'

import messages from './messages'

const matching = {
  dataMatching: <FormattedMessage {...messages.dataMatching} />,
  GroupNameData: <FormattedMessage {...messages.GroupNameData} />,
  dateDifference: <FormattedMessage {...messages.dateDifference} />,
  transactionalData: <FormattedMessage {...messages.transactionalData} />,
  extractionCompleted: <FormattedMessage {...messages.extractionCompleted} />,
  extractionNotCompleted: <FormattedMessage {...messages.extractionNotCompleted} />,
  uploadCompleted: <FormattedMessage {...messages.uploadCompleted} />,
  uploadNotCompleted: <FormattedMessage {...messages.uploadNotCompleted} />,
  missingDataError: <FormattedMessage {...messages.missingDataError} />,
  missingData: <FormattedMessage {...messages.missingData} />,
  refreshView: <FormattedMessage {...messages.refreshview} />,
  startMatchingProcess: <FormattedMessage {...messages.startMatchingProcess} />,
  matchingProcessInQueue: <FormattedMessage {...messages.matchingProcessInQueue} />,
  matchingProcessStarted: <FormattedMessage {...messages.matchingProcessStarted} />,
  matchingProcessCompleted: <FormattedMessage {...messages.matchingProcessCompleted} />,
  helperText: <FormattedMessage {...messages.helperText} />,
  cancelMatching: <FormattedMessage {...messages.cancelMatching} />,
  restartMatching: <FormattedMessage {...messages.restartMatching} />,
  startDate: <FormattedMessage {...messages.startDate} />,
  endDate: <FormattedMessage {...messages.endDate} />,
  totalElapsedTime: <FormattedMessage {...messages.totalElapsedTime} />,
  oneToOne: <FormattedMessage {...messages.oneToOne} />,
  oneToMany: <FormattedMessage {...messages.oneToMany} />,
  manyToOne: <FormattedMessage {...messages.manyToOne} />,
  completed: <FormattedMessage {...messages.completed} />,
  inProgress: <FormattedMessage {...messages.inProgress} />,
  cancellationInProgress: <FormattedMessage {...messages.cancellationInProgress} />,
  timedOut: <FormattedMessage {...messages.timedOut} />,
  matchingTimeoutMsg: <FormattedMessage {...messages.matchingTimeoutMsg} />,
  failed: <FormattedMessage {...messages.failed} />,
  matchingFailedMsg: <FormattedMessage {...messages.matchingFailedMsg} />,
  addedToQueueMsg: <FormattedMessage {...messages.addedToQueueMsg} />,
  matchingCompletionTime: <FormattedMessage {...messages.matchingCompletionTime} />,
  matchingProcessingError: <FormattedMessage {...messages.matchingProcessingError} />,
  matchingProcessing: <FormattedMessage {...messages.matchingProcessing} />,
  matchingDialogueCancelButton: messages.matchingDialogueCancelButton,
  matchingDialogueCloseButton: messages.matchingDialogueCloseButton,
  matchingDialogueProceedButton: messages.matchingDialogueProceedButton,
  matchingDialogueRestartButton: messages.matchingDialogueRestartButton,
  matchingCancelledHeader: messages.matchingCancelledHeader,
  matchingCancelledContent: messages.matchingCancelledContent,
  matchingProceedCancelledHeader: messages.matchingProceedCancelledHeader,
  matchingProceedCancelledContent: messages.matchingProceedCancelledContent,
  matchingRestartHeader: messages.matchingRestartHeader,
  matchingRestartContent: messages.matchingRestartContent,
  matchingResultsButton: <FormattedMessage {...messages.matchingResultsButton} />
}

const rangeNumber = {
  min: 0,
  max: 180
}

const steps = {
  QUEUE: 'QUEUE',
  INPROGRESS: 'INPROGRESS',
  COMPLETED: 'COMPLETED'
}

const inprogressChildSteps = {
  oneToOne: 'One To One',
  oneToMany: 'One To Many',
  manyToOne: 'Many to One'
}

const matchingSteps = [
  {
    step: steps.QUEUE,
    state: '',
    title: matching.matchingProcessInQueue,
    content: ''
  },
  {
    step: steps.INPROGRESS,
    state: '',
    title: matching.matchingProcessStarted,
    content: ''
  },
  {
    step: steps.COMPLETED,
    state: '',
    title: matching.matchingProcessCompleted,
    content: ''
  }]

const stateStepsRes = {
  QUEUE: 'Queue',
  INPROGRESS: 'Inprogress',
  COMPLETED: 'Completed',
  CANCELLING: 'Cancelling',
  CANCELLED: 'Cancelled',
  FAILED: 'Failed',
  TIMEOUT: 'Timeout'
}

const incrementValue = 1
const defaultNumber = 0

export {
  matching,
  rangeNumber,
  incrementValue,
  defaultNumber,
  inprogressChildSteps,
  matchingSteps,
  stateStepsRes,
  steps
}