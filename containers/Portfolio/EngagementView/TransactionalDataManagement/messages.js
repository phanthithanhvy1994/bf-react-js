import { defineMessages } from 'react-intl'

export const scope = 'TransactionalDataManagement'
export default defineMessages({
  pageTitle: {
    id: `${scope}.PageTitle`,
    defaultMessage: 'Upload transactional data'
  },
  descriptions: {
    id: `${scope}.Descriptions`,
    defaultMessage: 'Please refer to Cognia to <a>obtain the Transactional Data Upload Template.</a>'
  },
  dropzoneDescriptions: {
    id: `${scope}.Dropzone.Descriptions`,
    defaultMessage: 'Drop your Excel file here, or <span>browse your files.</span>'
  },
  dropzoneUploaded: {
    id: `${scope}.Dropzone.Uploaded`,
    defaultMessage: 'Your file <span>{insertFileName}</span> has successfully been uploaded and is ready to be used.'
  },
  progressTitle: {
    id: `${scope}.Progress.Title`,
    defaultMessage: 'Uploading file'
  },
  inProgressTitle: {
    id: `${scope}.InProgress.Title`,
    defaultMessage: 'File validity check in progress'
  },
  inProgressContent: {
    id: `${scope}.InProgress.Content`,
    defaultMessage: 'Please note that depending on your file size this could take up to several minutes. Please check back and refresh the page.'
  },
  successfulTitle: {
    id: `${scope}.successful.Title`,
    defaultMessage: 'File validity check successful'
  },
  failedTitle: {
    id: `${scope}.Failed.Title`,
    defaultMessage: 'File validity check failed'
  },
  failedContent: {
    id: `${scope}.Failed.Content`,
    defaultMessage: 'Please refer to the exception report to identify source(s) of failure. Please update the Transactional Data Upload Template and try uploading again. You can download exception report <a>here</a>.'
  },
  progressModalTitle: {
    id: `${scope}.Progress.Modal.Title`,
    defaultMessage: 'Cancel upload'
  },
  progressModalContent: {
    id: `${scope}.Progress.Modal.Content`,
    defaultMessage: 'Are you sure you want to cancel your upload?'
  },
  progressModalButtonBack: {
    id: `${scope}.Progress.Modal.Buttons.Back`,
    defaultMessage: 'Cancel'
  },
  progressModalButtonCancel: {
    id: `${scope}.Progress.Modal.Buttons.Cancel`,
    defaultMessage: 'Deactivate'
  },
  replaceUploadModalTitle: {
    id: `${scope}.ReplaceUpload.Modal.Title`,
    defaultMessage: 'Replace upload'
  },
  replaceUploadModalContent: {
    id: `${scope}.ReplaceUpload.Modal.Content`,
    defaultMessage: 'Please note that replacing an upload will remove the previously uploaded data.'
  },
  replaceUploadModalButtonCancel: {
    id: `${scope}.ReplaceUpload.Modal.Buttons.Cancel`,
    defaultMessage: 'Cancel'
  },
  replaceUploadModalButtonReplace: {
    id: `${scope}.ReplaceUpload.Modal.Buttons.Replace`,
    defaultMessage: 'Replace upload'
  },
  buttonReplace: {
    id: `${scope}.Button.Replace`,
    defaultMessage: 'Replace upload'
  },
  buttonUploaded: {
    id: `${scope}.Button.Uploaded`,
    defaultMessage: 'View upload'
  },
  buttonMatching: {
    id: `${scope}.Button.Matching`,
    defaultMessage: 'Start matching'
  },
  errorClose: {
    id: `${scope}.Error.Close`,
    defaultMessage: 'Close'
  },
  errorMultipleFiles: {
    id: `${scope}.Error.MultipleFiles`,
    defaultMessage: 'The system does not accept multiple files. Please try again with only one file.'
  },
  errorUploadFailed: {
    id: `${scope}.Error.UploadFailed`,
    defaultMessage: 'Your upload of <span>{insertFileName}</span> has failed. For a successful upload, please ensure that:{br}Only one file is uploaded per session.{br}The file extension ends with .xlsx or .xls.{br}Please try again or contact technical support for further assistance.'
  },
  fileExtensionInvalid: {
    id: `${scope}.Error.FileExtensionInvalid`,
    defaultMessage: 'This file extension is not supported. Please ensure that the file extension ends in .xlsx or .xls and try again.'
  },
  fileSizeInvalid: {
    id: `${scope}.Error.FileSizeInvalid`,
    defaultMessage: 'Please ensure that your file size maximum of {limitFileSize}MB and try again.'
  },
  isMatchingProcess: {
    id: `${scope}.IsMatchingProcess.Modal.Content`,
    defaultMessage: 'Matching run is in progress. Please either wait for matching run to be completed or cancel matching run to proceed with uploading transactions on this tab.'
  }
})
