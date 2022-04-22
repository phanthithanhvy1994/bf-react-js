import { defineMessages } from 'react-intl'

export const scope = 'Matching'

export default defineMessages({
  dataMatching: {
    id: `${scope}.DataMatching`,
    defaultMessage: 'Data Matching'
  },
  GroupNameData: {
    id: `${scope}.GroupNamedata`,
    defaultMessage: 'GroupName Data'
  },
  transactionalData: {
    id: `${scope}.TransactionalData`,
    defaultMessage: 'Transactional Data'
  },
  dateDifference: {
    id: `${scope}.DateDifference`,
    defaultMessage: 'Date Difference'
  },
  extractionCompleted: {
    id: `${scope}.ExtractionCompleted`,
    defaultMessage: 'Extraction completed'
  },
  extractionNotCompleted: {
    id: `${scope}.ExtractionNotCompleted`,
    defaultMessage: 'Extraction not completed'
  },
  uploadCompleted: {
    id: `${scope}.UploadCompleted`,
    defaultMessage: 'Upload completed'
  },
  uploadNotCompleted: {
    id: `${scope}.UploadNotCompleted`,
    defaultMessage: 'Upload not completed'
  },
  missingDataError: {
    id: `${scope}.MissingDataError`,
    defaultMessage: 'Missing data error!'
  },
  missingData: {
    id: `${scope}.MissingData`,
    defaultMessage: 'You are missing either GroupName Data Management or Transactional Data Management files. Please ensure you have the necessary files in order to proceed with matching.'
  },
  refreshview: {
    id: `${scope}.Refreshview`,
    defaultMessage: 'Refresh View'
  },
  startMatchingProcess: {
    id: `${scope}.StartMatchingProcess`,
    defaultMessage: 'Start Matching Process'
  },
  matchingProcessInQueue: {
    id: `${scope}.MatchingProcessInQueue`,
    defaultMessage: 'Matching process in queue'
  },
  matchingProcessStarted: {
    id: `${scope}.MatchingProcessStarted`,
    defaultMessage: 'Matching process started'
  },
  matchingProcessCompleted: {
    id: `${scope}.MatchingProcessCompleted`,
    defaultMessage: 'Matching process completed'
  },
  helperText: {
    id: `${scope}.HelperText`,
    defaultMessage: 'Please enter a number between 0 to 180 only'
  },
  cancelMatching: {
    id: `${scope}.CancelMatching`,
    defaultMessage: 'Cancel Matching'
  },
  restartMatching: {
    id: `${scope}.RestartMatching`,
    defaultMessage: 'Restart Matching'
  },
  startDate: {
    id: `${scope}.StartDate`,
    defaultMessage: 'Start Date:'
  },
  endDate: {
    id: `${scope}.EndDate`,
    defaultMessage: 'End Date:'
  },
  totalElapsedTime: {
    id: `${scope}.TotalElapsedTime`,
    defaultMessage: 'Total Elapsed Time:'
  },
  oneToOne: {
    id: `${scope}.OneToOne`,
    defaultMessage: 'One-to-one'
  },
  oneToMany: {
    id: `${scope}.OneToMany`,
    defaultMessage: 'One to many'
  },
  manyToOne: {
    id: `${scope}.ManyToOne`,
    defaultMessage: 'Many to one'
  },
  completed: {
    id: `${scope}.Completed`,
    defaultMessage: 'Completed'
  },
  inProgress: {
    id: `${scope}.InProgress`,
    defaultMessage: 'In-progress'
  },
  cancellationInProgress: {
    id: `${scope}.CancellationInProgress`,
    defaultMessage: 'Cancellation in progress'
  },
  timedOut: {
    id: `${scope}.TimedOut`,
    defaultMessage: 'Timed-out'
  },
  failed: {
    id: `${scope}.Failed`,
    defaultMessage: 'Failed'
  },
  matchingFailedMsg: {
    id: `${scope}.MatchingFailedMsg`,
    defaultMessage: 'Your matching run has failed due to technical issues.'
  },
  matchingTimeoutMsg: {
    id: `${scope}.MatchingTimeoutMsg`,
    defaultMessage: 'Your session has timed out due to matching taking over 8 hours. Please consider reducing the number of samples and restart matching.'
  },
  addedToQueueMsg: {
    id: `${scope}.AddedToQueueMsg`,
    defaultMessage: 'Please wait, this request has been added to the queue'
  },
  matchingCompletionTime: {
    id: `${scope}.MatchingCompletionTime`,
    defaultMessage: 'On an average, with a transaction data of 100 selections, matching takes 4 hours to be completed.'
  },
  matchingProcessingError: {
    id: `${scope}.MatchingProcessingError`,
    defaultMessage: 'Matching in progress by another user'
  },
  matchingProcessing: {
    id: `${scope}.MatchingProcessing`,
    defaultMessage: 'A matching run is already in progress for this engagement by another team member. Please coordinate with your team and proceed to matching once the existing matching run is completed.'
  },
  matchingDialogueCancelButton: {
    id: `${scope}.MatchingDialogueCancelButton`,
    defaultMessage: 'Cancel'
  },
  matchingDialogueCloseButton: {
    id: `${scope}.MatchingDialogueCloseButton`,
    defaultMessage: 'Close'
  },
  matchingDialogueProceedButton: {
    id: `${scope}.MatchingDialogueProceedButton`,
    defaultMessage: 'proceed'
  },
  matchingDialogueRestartButton: {
    id: `${scope}.MatchingDialogueRestartButton`,
    defaultMessage: 'Restart'
  },
  matchingCancelledHeader: {
    id: `${scope}.MatchingCancelledHeader`,
    defaultMessage: 'Cancel matching run'
  },
  matchingCancelledContent: {
    id: `${scope}.MatchingCancelledContent`,
    defaultMessage: 'The System will complete the existing matching run for {stepMatching} before aborting the process. Are you sure you want to proceed?'
  },
  matchingProceedCancelledHeader: {
    id: `${scope}.MatchingProceedCancelledHeader`,
    defaultMessage: 'Matching is cancelled'
  },
  matchingProceedCancelledContent: {
    id: `${scope}.MatchingProceedCancelledContent`,
    defaultMessage: 'Matching run has been successfully cancelled.'
  },
  matchingRestartHeader: {
    id: `${scope}.MatchingRestartHeader`,
    defaultMessage: 'Restart matching'
  },
  matchingRestartContent: {
    id: `${scope}.MatchingRestartContent`,
    defaultMessage: 'This will restart matching please confirm if you would  like to continue?'
  },
  matchingResultsButton: {
    id: `${scope}.MatchingResultsButton`,
    defaultMessage: 'View matching results'
  }
})
