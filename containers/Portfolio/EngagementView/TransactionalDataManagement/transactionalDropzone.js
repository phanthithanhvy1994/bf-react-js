import React, { useState, useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useIntl } from 'react-intl'
import { useParams } from 'react-router-dom'
import { unwrapResult } from '@reduxjs/toolkit'
import { UIDropzone, DropzoneType } from 'src/components'
import { getTransactionalDataFiles, mergeUploadTransactionDataFileRequest, getTransactionalDataFileById, uploadTransactionDataFileRequest } from 'src/containers/Portfolio/Redux/thunks'
import { cancelUploadTransactionDataFileRequest } from './services'
import { showLoading, hideLoading } from 'src/containers/Common/actions'
import { REQUEST_MODEL } from 'src/config/constants'
import UploadIcon from 'src/assets/Icons/svgs/upload_icon.svg'
import UploadedIcon from 'src/assets/Icons/svgs/uploaded_icon.svg'
import UploadingIcon from 'src/assets/Icons/svgs/uploading_icon.svg'
import messages from './messages'
import { TransactionalDataManagementErrors, FileExtension, ChunkSizeLimit, TransactionDataFileStatus, DelayTime, DelayTimeCheckTransactionDataFileStatus, limitUploadTransactionalFileSize } from './constants'

const TransactionalDropzone = (props) => {
  const intl = useIntl()
  const { transactionalDataFiles } = useSelector((state) => state.engagement)
  const [progressPercent, setProgressPercent] = useState(0)
  const [isUploaded, setIsUploaded] = useState(false)
  const [insertFileName, setInsertFileName] = useState('')
  const [uploadingClass, setUploadingClass] = useState('')
  const [isCancelUpload, setIsCancelUpload] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [isReplaceUpload, setIsReplaceUpload] = useState(false)
  
  const acceptFileExtensions = FileExtension.map(x => '.' + x)
  const chunkSize = ChunkSizeLimit
  const [counter, setCounter] = useState(0)
  const [fileToBeUpload, setFileToBeUpload] = useState({})
  const [beginingOfTheChunk, setBeginingOfTheChunk] = useState(0)
  const [endOfTheChunk, setEndOfTheChunk] = useState(chunkSize)
  const [chunkCount, setChunkCount] = useState(0)
  const [counterUploaded, setCounterUploaded] = useState(0)
  const [uploadFailed, setUploadFailed] = useState(0)
  const [transactionDataFileStatus, setTransactionDataFileStatus] = useState(TransactionDataFileStatus.initial)
  const [checkTransactionDataFile, setCheckTransactionDataFile] = useState(false)

  const { geoCode, containerCode, engagementId } = useParams()
  const dispatch = useDispatch()

  const { showWarningPopup } = props

  //update parent component's state value
  const updateIsUploaded = (value) => {
    if (props.fn && props.fn.setIsUploaded && typeof props.fn.setIsUploaded === 'function') {
      props.fn.setIsUploaded(value)
      setIsUploaded(value)
    }
  }
  const updateInsertFileName = (value) => {
    if (props.fn && props.fn.setInsertFileName && typeof props.fn.setInsertFileName === 'function') {
      props.fn.setInsertFileName(value)
      setInsertFileName(value)
    }
  }
  const updateIsCancelUpload = (value) => {
    if (props.fn && props.fn.setIsCancelUpload && typeof props.fn.setIsCancelUpload === 'function') {
      props.fn.setIsCancelUpload(value)
    }
  }
  const updateUploadFailed = (value) => {
    if (props.fn && props.fn.setUploadFailed && typeof props.fn.setUploadFailed === 'function') {
      props.fn.setUploadFailed(value)
    }
  }
  const updateTransactionDataFileStatus = (value) => {
    if (props.fn && props.fn.setTransactionDataFileStatus && typeof props.fn.setTransactionDataFileStatus === 'function') {
      props.fn.setTransactionDataFileStatus(value)
    }
  }
  const updateIsReplaceUpload = (value) => {
    if (props.fn && props.fn.setIsReplaceUpload && typeof props.fn.setIsReplaceUpload === 'function') {
      props.fn.setIsReplaceUpload(value)
      setIsReplaceUpload(value)
    }
  }

  const resetUpload = () => {
    setProgressPercent(0)
    setUploadingClass('')
    setCounter(0)
    updateIsUploaded(false)
    setChunkCount(0)
  }

  const setIsStratingUpload = () => {
    setBeginingOfTheChunk(0)
    setEndOfTheChunk(chunkSize)
    updateIsCancelUpload(false)
    setProgressPercent(0)
    updateUploadFailed(0)
    setUploadFailed(0)
    setCounter(0)
    setCounterUploaded(0)
    setUploadingClass('dropzone-uploading')
    updateTransactionDataFileStatus(TransactionDataFileStatus.initial)
    setTransactionDataFileStatus(TransactionDataFileStatus.initial)
    updateIsReplaceUpload(false)
  }

  //check uploaded transactional Data Files
  useEffect(() => {
    if (transactionalDataFiles && transactionalDataFiles.length > 0) {
      const fileCheckInProgress = _.findKey(transactionalDataFiles, ['status', TransactionDataFileStatus.fileCheckInProgress])
      if (fileCheckInProgress) {
        setIsStratingUpload()
        setProgressPercent(100)
        setTimeout(() => {
          updateTransactionDataFileStatus(TransactionDataFileStatus.fileCheckInProgress)
          setTransactionDataFileStatus(TransactionDataFileStatus.fileCheckInProgress)
        }, DelayTime)
      }
      else {
        const fileCheckSuccess = _.find(transactionalDataFiles, ['status', TransactionDataFileStatus.fileCheckSuccess])
        if (fileCheckSuccess && transactionDataFileStatus === TransactionDataFileStatus.fileCheckInProgress) {
          updateTransactionDataFileStatus(TransactionDataFileStatus.fileCheckSuccess)
          setTransactionDataFileStatus(TransactionDataFileStatus.fileCheckSuccess)
          setTimeout(() => {
            setIsStratingUpload()
            updateIsUploaded(true)
            updateInsertFileName(fileCheckSuccess.fileName)
            updateTransactionDataFileStatus(TransactionDataFileStatus.initial)
            setTransactionDataFileStatus(TransactionDataFileStatus.initial)
          }, DelayTime)
        }
        else if (fileCheckSuccess) {
          updateIsUploaded(true)
          updateInsertFileName(fileCheckSuccess.fileName)
        }
        else {
          const fileCheckFailed = _.find(transactionalDataFiles, ['status', TransactionDataFileStatus.fileCheckFailed])
          if (fileCheckFailed) {
            resetUpload()
            setProgressPercent(100)
            updateTransactionDataFileStatus(TransactionDataFileStatus.fileCheckFailed)
            setTransactionDataFileStatus(TransactionDataFileStatus.fileCheckFailed)
          }
        }
      }
    }
  }, [transactionalDataFiles])

  //Call API to check transaction Data File status
  useEffect(() => {
    if (transactionDataFileStatus === TransactionDataFileStatus.fileCheckInProgress && transactionalDataFiles && transactionalDataFiles.length > 0) {
      const fileCheckInProgress = _.findKey(transactionalDataFiles, ['status', TransactionDataFileStatus.fileCheckInProgress])
      if (fileCheckInProgress) {
        //call api to check
        let model = REQUEST_MODEL
        model.uri = { engagementId, containerCode }
        model.geoCode = geoCode
        model.id = transactionalDataFiles[fileCheckInProgress].transactionalDataFileId
        setTimeout(async () => {
          await dispatch(getTransactionalDataFileById(model))
          setCheckTransactionDataFile(!checkTransactionDataFile)
        }, DelayTimeCheckTransactionDataFileStatus)
      }
    }
  }, [transactionDataFileStatus, transactionalDataFiles, checkTransactionDataFile])

  //Set progress percent to parents
  useEffect(() => {
    const progress = chunkCount === 0 ? 0 : progressPercent
    if (props.fn && props.fn.setProgressPercent && typeof props.fn.setProgressPercent === 'function') {
      props.fn.setProgressPercent(progress)
    }
  }, [progressPercent])

  //Set state value from props
  useEffect(() => {
    if (props.data && props.data.isCancelUpload !== isCancelUpload) {
      setIsCancelUpload(props.data.isCancelUpload)
    }
    if (props.data && props.data.uploadFailed !== uploadFailed) {
      setUploadFailed(props.data.uploadFailed)
    }
    if (props.data && props.data.isPaused !== isPaused) {
      setIsPaused(props.data.isPaused)
    }
    if (props.data && props.data.isReplaceUpload) {
      setIsReplaceUpload(props.data.isReplaceUpload)
      resetUpload()
      updateTransactionDataFileStatus(TransactionDataFileStatus.initial)
      updateInsertFileName('')
      updateIsUploaded(false)
    }
  }, [props.data])

  //Get list file uploaded
  useEffect(async () => {
    dispatch(showLoading())
    resetUpload()
    let model = REQUEST_MODEL
    model.uri = { engagementId, containerCode }
    model.geoCode = geoCode
    await dispatch(getTransactionalDataFiles(model))
    dispatch(hideLoading())
  }, [])

  //Handling upload cancellations
  useEffect(() => {
    if (isCancelUpload) {
      resetUpload()
      updateUploadFailed(0)
      //call api to cancel
      cancelApiToUpload()
    }
  }, [isCancelUpload])

  const cancelApiToUpload = () => {
    //call api to cancel
    let model = REQUEST_MODEL
    model.uri = { engagementId, containerCode }
    model.geoCode = geoCode
    model.payload = {
      FileName: insertFileName
    }
    cancelUploadTransactionDataFileRequest(model)
  }

  //Merge uploaded files
  useEffect(async () => {
    if (!isCancelUpload && !isPaused && uploadFailed === 0 && counterUploaded === chunkCount && counterUploaded > 0) {
      //Cancel upload
      if (props.fn && props.fn.setIsCanCancelUpload && typeof props.fn.setIsCanCancelUpload === 'function') {
        props.fn.setIsCanCancelUpload(false)
      }
      setProgressPercent(100)
      //call api to merged
      let model = REQUEST_MODEL
      model.uri = { engagementId, containerCode }
      model.geoCode = geoCode
      model.payload = {
        FileName: insertFileName,
        IsMerge: counterUploaded > 1
      }

      const resultAction = await dispatch(mergeUploadTransactionDataFileRequest(model))
      const { error, result } = unwrapResult(resultAction)
      if (error || !result || !result.data || !result.data.isSuccess) {
        //merge file has failed.
        if (!isCancelUpload) {
          updateUploadFailed(TransactionalDataManagementErrors.mergeFailed.code)
          resetUpload()
          cancelApiToUpload()
        }
        return
      }
    }
  }, [counterUploaded, isPaused])

  //Call the Api to upload
  const uploadFileToBE = async (file, counter, fileName) => {
    setIsUploading(true)
    //Get api's payload
    let model = REQUEST_MODEL
    model.uri = { engagementId, containerCode }
    model.geoCode = geoCode
    model.payload = {
      FileId: counter,
      File: file,
      FileName: fileName && fileName !== '' ? fileName : insertFileName
    }

    const resultAction = await dispatch(uploadTransactionDataFileRequest(model))
    const { error, result } = unwrapResult(resultAction)
    setIsUploading(false)

    // checking matching feature is enable or not
    if (_.get(result, 'statusCode') === 405) {
      return showWarningPopup()
    }
    if (error || !result || !result.data || !result.data.isSuccess) {
      //Your upload has failed.
      if (!isCancelUpload) {
        updateUploadFailed(TransactionalDataManagementErrors.uploadFailed.code)
        resetUpload()
      }
      return
    }
    if (result && result.data && result.data.isSuccess && !isCancelUpload && uploadFailed === 0) {
      let statePercent = progressPercent
      if (counter === 0 || counter === 1 || statePercent === 0) {
        statePercent = 1
      }
      const percent = statePercent + (100 / chunkCount)
      if (percent < 99) {
        setProgressPercent(percent)
      }
      else {
        setProgressPercent(99)
      }
      
      setCounterUploaded(counterUploaded + 1)
      if (counterUploaded >= chunkCount) {
        setCounterUploaded(chunkCount)
      }
      else {
        setCounter(counter + 1)
      }
    }
  }

  //Uplaod file chunk
  useEffect(() => {
    if (chunkCount > 1 && counter > 0 && counter <= chunkCount && !isCancelUpload && !isPaused && !isUploading) {
      const chunk = fileToBeUpload.slice(beginingOfTheChunk, endOfTheChunk)
      uploadFileToBE(chunk, counter)
      setBeginingOfTheChunk(endOfTheChunk)
      setEndOfTheChunk(endOfTheChunk + chunkSize)
    }
    else if (chunkCount === 1 && counter > 0 && counter <= chunkCount && !isCancelUpload && !isPaused && !isUploading && counterUploaded === 0) {
      uploadFileToBE(fileToBeUpload, 0, insertFileName)
    }
  }, [counter, isPaused])

  //Callback function
  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    setIsStratingUpload()
    let errorCode;
    
    if (rejectedFiles.length === 1) {
      errorCode = TransactionalDataManagementErrors.fileExtensionInvalid.code
    } else if (rejectedFiles.length > 1) {
      errorCode = TransactionalDataManagementErrors.multipleFiles.code
    }
    if (errorCode) {
      updateUploadFailed(errorCode)
      resetUpload()
      return
    }

    acceptedFiles.forEach((file) => {
      const fileName = file.name
      updateInsertFileName(fileName)

      //Check file extension
      const fileExtension = fileName.split('.').pop()
      const fileExtensionkey = _.findIndex(FileExtension, (item) => { return item === fileExtension })
      if (fileExtensionkey >= 0) {
        if (limitUploadTransactionalFileSize && file.size > (limitUploadTransactionalFileSize * 1024 * 1024)) {
          updateUploadFailed(TransactionalDataManagementErrors.fileSizeInvalid.code)
          resetUpload()
          return
        }

        //Setting chunk
        const totalCount = file.size % chunkSize === 0 ? file.size / chunkSize : Math.floor(file.size / chunkSize) + 1

        if (props.fn && props.fn.setIsCanCancelUpload && typeof props.fn.setIsCanCancelUpload === 'function') {
          props.fn.setIsCanCancelUpload(true)
        }
        if (totalCount > 0) {
          setChunkCount(totalCount)
          setFileToBeUpload(file)
          setCounter(1)
          setProgressPercent(1)
        }
      }
      else {
        updateUploadFailed(TransactionalDataManagementErrors.fileExtensionInvalid.code)
        resetUpload()
        return
      }
    })
  }, [])

  const uploadedForm = () => {
    return <UIDropzone
      dropzoneType={DropzoneType.uploaded}
      title={intl.formatMessage(messages.pageTitle)}
      content={intl.formatMessage(messages.dropzoneUploaded, {
        insertFileName: `${insertFileName}`,
        span: (...chunks) => <span>{chunks}</span>
      })}
      dropzoneClassName={'upload-transactional__dropzone'}
      uploadingClass={uploadingClass}
      icon={UploadedIcon}
      acceptExtensions={acceptFileExtensions}
    />
  }

  const uploadingForm = () => {
    return <UIDropzone
      dropzoneType={DropzoneType.uploading}
      title={intl.formatMessage(messages.pageTitle)}
      content={intl.formatMessage(messages.dropzoneDescriptions, {
        span: (...chunks) => <span>{chunks}</span>
      })}
      dropzoneClassName={'upload-transactional__dropzone dropzone__loading'}
      uploadingClass={uploadingClass}
      icon={UploadingIcon}
      acceptExtensions={acceptFileExtensions}
    />
  }

  const uploadForm = () => {
    return <UIDropzone
      dropzoneType={DropzoneType.upload}
      onDrop={onDrop}
      multiple={false}
      title={intl.formatMessage(messages.pageTitle)}
      content={intl.formatMessage(messages.dropzoneDescriptions, {
        span: (...chunks) => <span>{chunks}</span>
      })}
      dropzoneClassName={'upload-transactional__dropzone'}
      uploadingClass={uploadingClass}
      icon={UploadIcon}
      acceptExtensions={acceptFileExtensions}
    />
  }

  return (
    <>
      {isUploaded && insertFileName !== '' && !isReplaceUpload ? uploadedForm()
        : progressPercent !== 0 && transactionDataFileStatus !== TransactionDataFileStatus.fileCheckFailed && !isReplaceUpload ? uploadingForm()
          : uploadForm()}
    </>
  )
}
export default TransactionalDropzone