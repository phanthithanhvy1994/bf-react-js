import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Button, Modal, Image } from 'src/components'
import { extractionStatuskMessages } from './constants'
import { scheduleTaskStatus } from '../constants'
import FailedIcon from 'src/assets/icons/svgs/failed_icon.svg'
import SuccessfulIcon from 'src/assets/icons/svgs/successful_icon.svg'
import CloseIcon from 'src/assets/Icons/svgs/close_blue.svg'
import { REQUEST_MODEL } from 'src/config/constants'
import { listExtractionStatusSelector, getExtractionStatusThunk, retryExtractionDataThunk, clearListExtractionStatus } from 'src/containers/Portfolio/Redux'

const ExtractionStatusModal = (props) => {
  const { onClose, contentFailTaskModal } = props
  const dispatch = useDispatch()
  const { engagementId, geoCode, containerCode } = useParams()
  const listExtractionStatus = useSelector(listExtractionStatusSelector)
  const [isClickedRetry, setIsclickedRetry] = useState(false)
  const [isClickedRetryAll, setIsclickedRetryAll] = useState(false)
  const [isExistsRetryFailed, setIsExistsRetryFailed] = useState(false)
  const [isExistsFailed, setIsExistsFailed] = useState(false)
  const [isExistsFailedCanRetry, setIsExistsFailedCanRetry] = useState(false)
  const [intervalExtraction, setintervalExtraction] = useState(null)

  useEffect(async () => {
    const interval = setInterval(async () => {
      await getExtractionStatus()
    }, 5000)
    setintervalExtraction(interval)

    await getExtractionStatus()
  }, [])

  useEffect(() => {
    setIsclickedRetry(_.filter(listExtractionStatus, x => x.isClickRetry === true).length > 0)
    setIsExistsRetryFailed(_.filter(listExtractionStatus, x => x.isInstantRetry === true && x.status === scheduleTaskStatus.failed).length > 0)
    setIsExistsFailed(_.filter(listExtractionStatus, x => x.status === scheduleTaskStatus.inProgress || x.status === scheduleTaskStatus.failed).length > 0)
    setIsExistsFailedCanRetry(_.filter(listExtractionStatus, x => x.status === scheduleTaskStatus.failed && x.canRetry === true).length > 0)
  }, [listExtractionStatus])

  const getExtractionStatus = async () => {
    const model = REQUEST_MODEL
    model.uri = { engagementId, containerCode }
    model.geoCode = geoCode
    model.query = { scheduleTaskId: contentFailTaskModal.id }
    await dispatch(getExtractionStatusThunk(model))
  }

  const hanldeOnClose = () => {
    clearInterval(intervalExtraction)
    dispatch(clearListExtractionStatus())
    onClose()
  }
  const onClickRetryAll = () => {
    const model = REQUEST_MODEL
    model.uri = { engagementId, containerCode }
    model.geoCode = geoCode
    model.query = {}
    model.payload = { scheduleTaskId: contentFailTaskModal.id, isRetryAll: true }
    dispatch(retryExtractionDataThunk(model))
    setIsclickedRetry(true)
    setIsclickedRetryAll(true)
  }

  const onClickRetry = (e, scheduleTaskInstitutionExecution) => {
    e.currentTarget.disabled = true
    setIsclickedRetry(true)
    const model = REQUEST_MODEL
    model.uri = { engagementId, containerCode }
    model.geoCode = geoCode
    model.query = {}
    model.payload = { scheduleTaskId: contentFailTaskModal.id, scheduleTaskInsitutionId: scheduleTaskInstitutionExecution.id, isRetryAll: false }
    dispatch(retryExtractionDataThunk(model))
  }

  const buildRowSuccess = (data) => {
    return (
      <div className='es-row-content' key={data.id}>
        <div className='es-GroupName-name'>{data.GroupNameName}</div>
        <div className='es-retry-status'>{data.isInstantRetry === true ? extractionStatuskMessages.retrySuccessMessage : ''}</div>
        <div className='es-view-extract'>{data.isInstantRetry === true ? extractionStatuskMessages.viewExtract : ''}</div>
      </div> 
    )
  }

  const buildRowFail = (data) => {
    return (
      <div className='es-row-content' key={data.id}>
        <div className='es-GroupName-name'>{data.GroupNameName}</div>
        <div className='es-fail-content'>
          {
            !_.isNull(data.errorCode) ? <div className='es-invalid-token'>{extractionStatuskMessages.invalidToken}</div> : 
              data.isInstantRetry === true && data.status === scheduleTaskStatus.failed ?
                <div className='es-fail-try'>{extractionStatuskMessages.retryFail}<span>{extractionStatuskMessages.starSymbol}</span></div> : <Button className={data.canRetry ? 'secondary-btn' : 'secondary-btn disabled'} loading={data.isClickRetry} disabled={isClickedRetryAll} onClick={(e) => onClickRetry(e, data)}>{extractionStatuskMessages.retry}</Button>
          }
        </div>
      </div> 
    )
  }

  const renderModalContent = () => (
    <Modal className="extraction-status-modal" open={true} onClose={hanldeOnClose}>
      <Image className='close-btn' src={CloseIcon} onClick={hanldeOnClose}/>
      <div className='es-content-wrapper'>
        <div className='es-content'>
          <div className='extraction-status-header'>{extractionStatuskMessages.extractionStatus}</div>
          <div className='extraction-status-message'>{isClickedRetry && extractionStatuskMessages.inprogress}</div>

          <div className='header-content'>
            <Image src={SuccessfulIcon} className='icon'/>
            <div className='es-title'><label>{extractionStatuskMessages.successful}</label></div>
          </div>
          <div className='line'/>
          {(listExtractionStatus || []).map((extractionStatus) => extractionStatus.status === scheduleTaskStatus.completed && buildRowSuccess(extractionStatus))}

          {isExistsFailed &&
          <div>
            <div className='header-content'>
              <Image src={FailedIcon} className='icon'/>
              <div className='es-title'><label>{extractionStatuskMessages.fail}</label></div>
              <div className={isClickedRetry || isExistsFailedCanRetry === false ? 'es-retry-all-disable' : 'es-retry-all'}><a className='link' onClick={onClickRetryAll}>{extractionStatuskMessages.retryAll}</a></div>
            </div>
            <div className='line'/>
          </div>}

          {((listExtractionStatus || []).filter(x => x.status === scheduleTaskStatus.failed || x.status === scheduleTaskStatus.inProgress)).map((extractionStatus) => 
              (extractionStatus.status === scheduleTaskStatus.failed || extractionStatus.status === scheduleTaskStatus.inProgress) && buildRowFail(extractionStatus))}

          {isExistsRetryFailed && <div className='es-retry-fail-message'><span>{extractionStatuskMessages.starSymbol}</span>{extractionStatuskMessages.retryFailMessage}</div>}

          <div className='button-group-side'>
            <Button className='primary-btn btn--close' onClick={hanldeOnClose}>
              {extractionStatuskMessages.closeBtn}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  )

  return <>{renderModalContent()}</>
}

export default ExtractionStatusModal
