import React, { useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { useParams, useHistory } from 'react-router-dom'
import { Button, ConfirmModal } from 'src/components'
import messages from './messages'
import { disablePreviousUploadedTransactionalData, checkMatchingRunning } from './services'
import { REQUEST_MODEL, GroupName_URL } from 'src/config/constants'
import CloseIcon from 'src/assets/icons/svgs/close_blue.svg'

const TransactionalButtons = (props) => {
  const intl = useIntl()
  const { isViewData, isReplaceUpload, showWarningPopup } = props
  const [openModal, setOpenModal] = useState(false)
  const { geoCode, containerCode, engagementId } = useParams()
  const [isMatchingProcess, setIsMatchingProcess] = useState(false)
  const history = useHistory()

  const model = {
    ...REQUEST_MODEL,
    uri: { engagementId, containerCode },
    geoCode
  }

  const setViewData = (value = true) => {
    if (props.setIsViewData && typeof props.setIsViewData === 'function') {
      props.setIsViewData(value)
    }
  }
  const navigateMatchingView = () => {
    history.push(`./${GroupName_URL.MATCHING}`)
  }
  const setReplaceUpload = () => {
    if (props.setIsReplaceUpload && typeof props.setIsReplaceUpload === 'function') {
      props.setIsReplaceUpload(true)
    }
  }

  const disableTransactionalData = async () => {
    // call api to disable uploaded transactional data
    const res = await disablePreviousUploadedTransactionalData(model)
    // checking matching feature is enable or not
    if (_.get(res, 'result.statusCode') === 405) {
      return showWarningPopup()
    }
  }

  const onCloseModal = () => {
    document.getElementById('app').style.filter = 'blur(0px)'
    setOpenModal(false)
  }

  const onOpenModal = async () => {
    // call api to check matching running
    const res = await checkMatchingRunning(model)
    const isMatchingRunning = _.get(res, 'result.data.isMatchingRunning', false) 
    setIsMatchingProcess(isMatchingRunning)
    document.getElementById('app').style.filter = 'blur(1.5px)'
    setOpenModal(true)
  }

  const handleReplaceUpload = () => {
    if (isViewData) {
      setViewData(false)
    }
    setReplaceUpload()
    onCloseModal()
    disableTransactionalData()
  }

  const replaceUploadModal = () => {
    return (
      <ConfirmModal open={openModal}
        closeIcon={CloseIcon}
        onModalClose={onCloseModal}
        onClose={onCloseModal}
        onConfirm={!isMatchingProcess && handleReplaceUpload}
        modalClassName={`upload-transactional__modal ${isMatchingProcess && 'matching-process'}`}
        header={!isMatchingProcess && intl.formatMessage(messages.replaceUploadModalTitle)}
        content={isMatchingProcess ? intl.formatMessage(messages.isMatchingProcess) : intl.formatMessage(messages.replaceUploadModalContent)}
        cancelBtn={!isMatchingProcess && intl.formatMessage(messages.replaceUploadModalButtonCancel)}
        confirmBtn={!isMatchingProcess && intl.formatMessage(messages.replaceUploadModalButtonReplace)}
      />
    )
  }

  return (
    <>
      {!isReplaceUpload ?
        <div className='upload-transactional__buttons'>
          <div className='upload-transactional__buttons__button'>
            <Button basic color='blue' onClick={onOpenModal}><FormattedMessage {...messages.buttonReplace} /></Button>
          </div>
          {!isViewData && (
            <div className='upload-transactional__buttons__button'>
              <Button primary icon onClick={setViewData}><FormattedMessage {...messages.buttonUploaded} /></Button>
            </div>
          )}
          <div className='upload-transactional__buttons__button'>
            <Button primary icon onClick={navigateMatchingView}><FormattedMessage {...messages.buttonMatching} /></Button>
          </div>
          {replaceUploadModal()}
        </div>
        : ''}
    </>

  )
}
export default TransactionalButtons