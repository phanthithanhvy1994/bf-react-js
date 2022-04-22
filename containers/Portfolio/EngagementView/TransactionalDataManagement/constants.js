import messages from './messages'

const TransactionalDataManagementErrors = {
  multipleFiles: {
    code: 1,
    message: messages.errorMultipleFiles
  },
  uploadFailed: {
    code: 2,
    message: messages.errorUploadFailed
  },
  mergeFailed: {
    code: 3,
    message: messages.errorUploadFailed
  },
  fileExtensionInvalid: {
    code: 4,
    message: messages.fileExtensionInvalid
  },
  fileSizeInvalid: {
    code: 5,
    message: messages.fileSizeInvalid
  }
}

const TransactionDataFileStatus = {
  initial: -1,
  fileCheckInProgress: 0,
  fileCheckSuccess: 1,
  fileCheckFailed: 2
}

const TransactionalDataFileTemplateName = 'transactionalDataFileTemplate.xlsx'

const FileExtension = [
  'xlsx',
  'XLSX',
  'xls',
  'XLS'
]

const Colors = {
  black: 'black',
  blue: 'blue'
}

//200KB
const ChunkSizeLimit = 248576
const DelayTime = 2000
const DelayTimeCheckTransactionDataFileStatus = 12000
const limitUploadTransactionalFileSize = _.get(window.appsettings, 'LimitUploadTransactionalFileSize')

export { 
  TransactionalDataManagementErrors,
  FileExtension,
  ChunkSizeLimit,
  Colors,
  TransactionDataFileStatus,
  DelayTime,
  DelayTimeCheckTransactionDataFileStatus,
  TransactionalDataFileTemplateName,
  limitUploadTransactionalFileSize
}