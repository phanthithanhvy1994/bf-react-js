import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { FormattedMessage, useIntl } from 'react-intl'
import { Image, ConfirmModal, UIProgress } from 'src/components'
import { Colors, TransactionDataFileStatus } from './constants'
import TransactionalGetFile from './transactionalGetFile'
import { getTransactionalDataFileError } from './services'
import CloseIcon from 'src/assets/Icons/svgs/close_icon_upload.svg'
import CompletedIcon from 'src/assets/Icons/svgs/completed_icon.svg'
import InprogressIcon from 'src/assets/Icons/svgs/inprogress_icon.svg'
import CheckFailedIcon from 'src/assets/Icons/svgs/check_failed_icon.svg'
import messages from './messages'
import CancelModalCloseIcon from 'src/assets/icons/svgs/close_blue.svg'

const TransactionalProgress = (props) => {
  const intl = useIntl()
  const { transactionalDataFiles } = useSelector((state) => state.engagement)
  const [progressPercent, setProgressPercent] = useState(0)
  const [openModal, setOpenModal] = useState(false)
  const [transactionDataFileStatus, setTransactionDataFileStatus] = useState(TransactionDataFileStatus.initial)

  //Set state value from props
  useEffect(() => {
    if (props.progressPercent !== progressPercent) {
      setProgressPercent(props.progressPercent)
    }
    if (props.transactionDataFileStatus !== transactionDataFileStatus) {
      setTransactionDataFileStatus(props.transactionDataFileStatus)
    }
  }, [props])

  const handleCancel = () => {
    if (props.setIsCancelUpload && typeof props.setIsCancelUpload === 'function') {
      props.setIsCancelUpload(true)
    }
    onCloseModal()
  }
  const onCloseModal = () => {
    document.getElementById('app').style.filter = 'blur(0px)'
    setOpenModal(false)
    if (props.setIsPaused && typeof props.setIsPaused === 'function') {
      props.setIsPaused(false)
    }
  }
  const onOpenModal = () => {
    document.getElementById('app').style.filter = 'blur(1.5px)'
    setOpenModal(true)
    if (props.setIsPaused && typeof props.setIsPaused === 'function') {
      props.setIsPaused(true)
    }
  }

  const uploadingFile = () => {
    const percent = Math.round(progressPercent)
    return (
      <>
        <div className='upload-transactional__progress__percent progress__uploading'>
          <div className={`progress__percent_uploading ${percent === 100 ? 'progress__uploaded' : ''}`}>
            <div className='progress__percent' style={{ width: percent + '%' }}>
              <span className='progress__percent__title'><FormattedMessage {...messages.progressTitle} /></span>
              <span className='percent'>{percent}%</span>
            </div>
          </div>
          <UIProgress percent={percent} attached='bottom' color={Colors.black} />
        </div>
        <div className='upload-transactional__progress__icon'>
          {percent === 100 ?
            <Image className='progress__icon' src={CompletedIcon} alt={<FormattedMessage {...messages.progressTitle} />} /> :
            props.isCanCancelUpload && <span onClick={onOpenModal}><Image className='progress__icon' src={CloseIcon} alt={<FormattedMessage {...messages.progressTitle} />} /></span>}
        </div>
      </>
    )
  }

  const fileValidityCheckInProgress = () => {
    return (
      <>
        <div className='upload-transactional__progress__percent'>
          <div className='progress__percent'>
            <span className='progress__percent__title'><FormattedMessage {...messages.inProgressTitle} /></span>
          </div>
          <p className='progress__content'><FormattedMessage {...messages.inProgressContent} /></p>
          <UIProgress percent={100} attached='bottom' className='check-inprogress' active />
        </div>
        <div className='upload-transactional__progress__icon'>
          <Image className='progress__icon spin-loading' src={InprogressIcon} alt={<FormattedMessage {...messages.inProgressTitle} />} />
        </div>
      </>
    )
  }

  const fileValidityCheckSuccessful = () => {
    return (
      <>
        <div className='upload-transactional__progress__percent'>
          <div className='progress__percent'>
            <span className='progress__percent__title'><FormattedMessage {...messages.successfulTitle} /></span>
          </div>
          <UIProgress percent={100} attached='bottom' color={Colors.black} active />
        </div>
        <div className='upload-transactional__progress__icon'>
          <Image className='progress__icon' src={CompletedIcon} alt={<FormattedMessage {...messages.successfulTitle} />} />
        </div>
      </>
    )
  }

  const FileValidityCheckFailed = () => {
    const fileCheckFailed = _.find(transactionalDataFiles, ['status', TransactionDataFileStatus.fileCheckFailed])
    if (!fileCheckFailed) return
    return (
      <>
        <div className='upload-transactional__progress__percent'>
          <div className='progress__percent'>
            <span className='progress__percent__title'><FormattedMessage {...messages.failedTitle} /></span>
          </div>
          <p className='progress__content'>
            <TransactionalGetFile
              showWarningPopup={props.showWarningPopup}
              serviceApi={getTransactionalDataFileError}
              messages={messages.failedContent}
              fileName={fileCheckFailed.fileName}
              queryData={{ 'transactionalDataFileId': fileCheckFailed.transactionalDataFileId }}
            />
          </p>
          <UIProgress percent={100} attached='bottom' color={Colors.black} active />
        </div>
        <div className='upload-transactional__progress__icon'>
          <Image className='progress__icon' src={CheckFailedIcon} alt={<FormattedMessage {...messages.failedTitle} />} />
        </div>
      </>
    )
  }

  const renderProgress = () => {
    switch (transactionDataFileStatus) {
      case TransactionDataFileStatus.fileCheckInProgress:
        return fileValidityCheckInProgress()
      case TransactionDataFileStatus.fileCheckSuccess:
        return fileValidityCheckSuccessful()
      case TransactionDataFileStatus.fileCheckFailed:
        return FileValidityCheckFailed()
      default:
        return uploadingFile()
    }
  }

  const cancelModal = () => {
    return (
      <ConfirmModal open={openModal}
        closeIcon={CancelModalCloseIcon}
        onModalClose={onCloseModal}
        onClose={onCloseModal}
        onConfirm={handleCancel}
        modalClassName='upload-transactional__modal'
        header={intl.formatMessage(messages.progressModalTitle)}
        content={intl.formatMessage(messages.progressModalContent)}
        cancelBtn={intl.formatMessage(messages.progressModalButtonBack)}
        confirmBtn={intl.formatMessage(messages.progressModalButtonCancel)}
      />
    )
  }

  return (
    <>
      {progressPercent && progressPercent !== 0 ?
        <>
          <div className='upload-transactional__progress'>
            {renderProgress()}
          </div>
          {transactionDataFileStatus === TransactionDataFileStatus.initial ? cancelModal() : ''}
        </> : ''}
    </>
  )
}
export default TransactionalProgress