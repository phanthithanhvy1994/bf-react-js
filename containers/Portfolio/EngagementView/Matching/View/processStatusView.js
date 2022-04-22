import React, { useState, useMemo, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import { Grid } from 'semantic-ui-react'
import { useIntl } from 'react-intl'
import { useDispatch } from 'react-redux'

import { Image, Button, Banner, Dialogue } from 'src/components'
import { showLoading, hideLoading } from 'src/containers/Common/actions'
import { REQUEST_MODEL, TIME } from 'src/config/constants'

import { matching, inprogressChildSteps, matchingSteps, stateStepsRes, steps } from '../constants'
import { cancelMatchingThunk } from '../Redux'
import usePrevious from '../usePrevious'
import RefreshIcon from 'src/assets/icons/svgs/IconRefresh_white.svg'
import ArrowRightIcon from 'src/assets/icons/svgs/pointer_bold_right_active.svg'
import CalendarIcon from 'src/assets/icons/svgs/IconCalendar.svg'
import ElapsedTimeIcon from 'src/assets/icons/svgs/ElapsedTime.svg'
import WarningIcon from 'src/assets/icons/svgs/warning.svg'
import InformationIcon from 'src/assets/icons/svgs/Information.svg'

const ProcessStatusView = (props) => {
  const { formatMessage } = useIntl()
  const dispatch = useDispatch()
  const { engagementUserMatchingRes, onRefreshView, restartMatchingProcess, isMatchingProcessing } = props
  const stepMatchingStatus = _.get(engagementUserMatchingRes, 'status', null)
  const matchingTypeRes = _.get(engagementUserMatchingRes, 'matchingTypeRes', [])
  const preStepMatching = usePrevious({ status: stepMatchingStatus, matchingId: _.get(engagementUserMatchingRes, 'matchingId', null) })

  const [openDialogue, setOpenDialogue] = useState(false)
  const [isDisableRestartBtn, setIsDisableRestartBtn] = useState(false)
  const [isShowCancelModel, setIsShowCancelModel] = useState(false)
  const [dialogueContent, setDialogueContent] = useState({
    matchingDialogueHeaderIcon: null,
    matchingDialogueHeader: null,
    matchingDialogueContent: null,
    matchingDialogueCancelButton: null,
    matchingDialogueConfirmButton: null,
    matchingDialogueOnConfirm: null,
    matchingDialogueClassName: null
  })
  const listStatusDisableCancelBtn = [stateStepsRes.CANCELLING, stateStepsRes.FAILED, stateStepsRes.TIMEOUT, stateStepsRes.CANCELLED]
  const checkStepCompleted = (name) => {
    return _.find(matchingTypeRes, (matchingStep) => matchingStep.name === name && matchingStep.isCompleted)
  }
  const isOneToOneCompleted = checkStepCompleted(inprogressChildSteps.oneToOne)
  const isOneToManyCompleted = checkStepCompleted(inprogressChildSteps.oneToMany)
  const isManyToOneCompleted = checkStepCompleted(inprogressChildSteps.manyToOne)

  const { engagementId, geoCode, containerCode } = useParams()
  const model = {
    ...REQUEST_MODEL,
    uri: { engagementId, containerCode },
    geoCode
  }

  useEffect(() => {
    const isCancelled = stepMatchingStatus === stateStepsRes.CANCELLED &&
      (preStepMatching?.status === stateStepsRes.CANCELLING || preStepMatching?.status === stateStepsRes.QUEUE) &&
      preStepMatching?.matchingId === _.get(engagementUserMatchingRes, 'matchingId', null)

    if (isCancelled) {
      setContentDialogue(
        InformationIcon,
        formatMessage(matching.matchingProceedCancelledHeader),
        formatMessage(matching.matchingProceedCancelledContent),
        '',
        formatMessage(matching.matchingDialogueCloseButton),
        onCloseDialogue,
        'dialogue-cancelled-matching'
      )
      setOpenDialogue(true)
    }
    setIsDisableRestartBtn(false)
  }, [stepMatchingStatus])

  useEffect(() => {
    if (isShowCancelModel) {
      let stepMatching = ''

      switch (stepMatchingStatus) {
        case stateStepsRes.QUEUE:
          stepMatching = matching.matchingProcessInQueue
          break
        case stateStepsRes.INPROGRESS:
          if (!isOneToOneCompleted) {
            stepMatching = matching.oneToOne
          }
          if (isOneToOneCompleted && !isOneToManyCompleted) {
            stepMatching = matching.oneToMany
          }
          break
      }
      setIsShowCancelModel(false)
      if (!stepMatching) return
      setContentDialogue(
        WarningIcon,
        formatMessage(matching.matchingCancelledHeader),
        formatMessage(matching.matchingCancelledContent, { stepMatching: stepMatching }),
        formatMessage(matching.matchingDialogueCancelButton),
        formatMessage(matching.matchingDialogueProceedButton),
        proceedCancelMatching,
        'dialogue-cancel-matching'
      )
      setOpenDialogue(true)
    }
  }, [isShowCancelModel])

  const pad2 = (number) => {
    number = '0' + number
    return number.substr(number.length - 2)
  }

  const millisToHoursMinutesAndSeconds = (millis) => {
    let hours = Math.floor((millis / (60 * 60 * 10000000)) % 24)
    let mins = Math.floor((millis / (60 * 10000000)) % 60)
    let seconds = Math.round((millis / 10000000) % 60)

    return `${hours ? pad2(hours) + ':' : ''}${pad2(mins)}:${pad2(seconds)}`
  }

  const renderRestartMatching = () => {
    const isShowRestartBtn = stepMatchingStatus === stateStepsRes.FAILED || stepMatchingStatus === stateStepsRes.TIMEOUT

    return isShowRestartBtn &&
      <Button primary disabled={isDisableRestartBtn} onClick={restartMatching} className='btn-image-icon right restart-matching-btn'>
        <Image src={ArrowRightIcon} />
        {matching.restartMatching}
      </Button>
  }

  const renderBannerQueue = (status) => {
    switch (status) {
      case stateStepsRes.QUEUE:
        return <Banner icon type='cancel-in-progress' className='custom-warning custom-warning--queue' text={matching.addedToQueueMsg} />
      case stateStepsRes.CANCELLING:
        return <Banner icon type='cancel-in-progress' className='custom-warning custom-warning--cancelling' text={matching.cancellationInProgress} />
      case stateStepsRes.TIMEOUT:
        return <Banner icon type='error' className='width-content states custom-timeout' text={matching.timedOut} />
      case stateStepsRes.FAILED:
        return <Banner icon type='failed' className='width-content box-shadow-none banner-queue-icon-failed' text={matching.failed} />
      default:
        return
    }
  }

  const renderQueue = () => {
    return <>
      <div className='step-tracker__content'>
        {renderBannerQueue(stepMatchingStatus)}
        {stepMatchingStatus === stateStepsRes.FAILED && <Banner type='error' className='height-content banner-matching-error' icon text={matching.matchingFailedMsg} />}
        {stepMatchingStatus === stateStepsRes.TIMEOUT && <Banner className='warning height-content padding-content' icon text={matching.matchingTimeoutMsg} />}
      </div>
      <div className='step-tracker__action'>
        <Button
          secondary
          onClick={() => cancelMatching()}
          disabled={listStatusDisableCancelBtn.includes(stepMatchingStatus)}
        >
          {matching.cancelMatching}
        </Button>
        <Button primary onClick={onRefreshView} className='btn-image-icon'>
          <Image src={RefreshIcon} />
          {matching.refreshView}
        </Button>
        {renderRestartMatching()}
      </div>
    </>
  }

  const renderTimeQueue = () => {
    const dateInfo = stepMatchingStatus && engagementUserMatchingRes.createdTime
    const startDate = window.localize.toLocaleDate(dateInfo)
    const startTime = window.localize.toLocalDate(dateInfo, TIME.DEFAULT_TIME)
    return <div className='step-tracker__datetime'>
      <Image src={CalendarIcon} />
      <strong>{matching.startDate}</strong>
      <span className='date'>{startDate}</span>
      <span className='time'>{startTime}</span>
    </div>
  }

  const renderBannerChildStep = (status) => {
    switch (status) {
      case stateStepsRes.INPROGRESS:
        return <Banner icon type='in-progress' className='width-content states' text={matching.inProgress} />
      case stateStepsRes.CANCELLING:
        return <Banner icon type='cancel-in-progress' className='width-content states' text={matching.cancellationInProgress} />
      case stateStepsRes.TIMEOUT:
        return <Banner icon type='timed-out' className='width-content states' text={matching.timedOut} />
      case stateStepsRes.FAILED:
        return <Banner icon type='failed' className='width-content states' text={matching.failed} />
      default:
        return
    }
  }

  const renderInprocess = () => {
    return <>
      <div className='step-tracker__content'>
        <ul className='timeline'>
          <li className='active'>
            <span>{matching.oneToOne}</span>
            {isOneToOneCompleted ?
              <Banner icon type='success' className='width-content states' text={matching.completed} /> :
              renderBannerChildStep(stepMatchingStatus)
            }
          </li>
          <li className={isOneToOneCompleted ? 'active' : ''}>
            <span>{matching.oneToMany}</span>
            {isOneToManyCompleted ?
              <Banner icon type='success' className='width-content states' text={matching.completed} /> :
              isOneToOneCompleted ? renderBannerChildStep(stepMatchingStatus) : ''
            }
          </li>
          <li className={isOneToManyCompleted ? 'active' : ''}>
            <span>{matching.manyToOne}</span>
            {isManyToOneCompleted ?
              <Banner icon type='success' className='width-content states' text={matching.completed} /> :
              isOneToManyCompleted ? renderBannerChildStep(stepMatchingStatus) : ''
            }
          </li>
        </ul>
        {stepMatchingStatus === stateStepsRes.FAILED && <Banner type='error' className='height-content banner-matching-error' icon text={matching.matchingFailedMsg} />}
        {stepMatchingStatus === stateStepsRes.TIMEOUT && <Banner className='warning height-content padding-content' icon text={matching.matchingTimeoutMsg} />}
      </div>
      <div className='step-tracker__action'>
        <Button
          secondary
          disabled={listStatusDisableCancelBtn.includes(stepMatchingStatus) || !!isOneToManyCompleted}
          onClick={() => cancelMatching()}>
          {matching.cancelMatching}
        </Button>
        <Button primary onClick={() => onRefreshView()} className='btn-image-icon'>
          <Image src={RefreshIcon} />
          {matching.refreshView}
        </Button>
        {renderRestartMatching()}
      </div>
    </>
  }

  const renderTimeCompleted = () => {
    const totalElapsedTime = stepMatchingStatus && millisToHoursMinutesAndSeconds(engagementUserMatchingRes.totalTime)
    const dateInfo = stepMatchingStatus && engagementUserMatchingRes.endTime
    const endDate = window.localize.toLocaleDate(dateInfo)
    const endTime = window.localize.toLocalDate(dateInfo, TIME.DEFAULT_TIME)
    return <>
      <div className='step-tracker__elapsedtime'>
        <Image src={ElapsedTimeIcon} />
        <strong>{matching.totalElapsedTime}</strong>
        <span>{totalElapsedTime}</span>
      </div>
      <div className='step-tracker__datetime'>
        <Image src={CalendarIcon} />
        <strong>{matching.endDate}</strong>
        <span className='date'>{endDate}</span>
        <span className='time'>{endTime}</span>
      </div>
    </>
  }

  const renderBanner = () => {
    const isShowBanner = stepMatchingStatus !== stateStepsRes.COMPLETED && stepMatchingStatus !== stateStepsRes.CANCELLED
    return isShowBanner && <Grid.Row className='matching-banner'>
      <Grid.Column>
        <Banner icon type='information' className='' text={matching.matchingCompletionTime} />
      </Grid.Column>
    </Grid.Row>
  }

  const onCloseDialogue = () => {
    setOpenDialogue(false)
  }

  const setContentDialogue = (icon, header, content, cancelBtn, confirmBtn, onConfirm, dialogueClassName) => {
    setDialogueContent({
      matchingDialogueHeaderIcon: icon,
      matchingDialogueHeader: header,
      matchingDialogueContent: content,
      matchingDialogueCancelButton: cancelBtn,
      matchingDialogueConfirmButton: confirmBtn,
      matchingDialogueOnConfirm: onConfirm,
      matchingDialogueClassName: dialogueClassName
    })
  }

  const proceedCancelMatching = async () => {
    dispatch(showLoading())
    await dispatch(cancelMatchingThunk(model))
    setOpenDialogue(false)
    dispatch(hideLoading())
  }

  const cancelMatching = async () => {
    await onRefreshView()
    setIsShowCancelModel(true)
  }

  const restartMatching = () => {
    setContentDialogue(
      WarningIcon,
      formatMessage(matching.matchingRestartHeader),
      formatMessage(matching.matchingRestartContent),
      formatMessage(matching.matchingDialogueCancelButton),
      formatMessage(matching.matchingDialogueRestartButton),
      onRestartMatching,
      'dialogue-restart-matching'
    )
    setOpenDialogue(true)
  }

  const onRestartMatching = () => {
    setIsDisableRestartBtn(true)
    setOpenDialogue(false)
    restartMatchingProcess()
  }

  const buildsMatchingSteps = useMemo(() => {
    const newMatchingSteps = matchingSteps.map((step) => {

      if (step.step === steps.QUEUE) {
        if (!stepMatchingStatus) return step

        const listStatusCanShowStepQueue = [
          stateStepsRes.QUEUE,
          stateStepsRes.CANCELLING,
          stateStepsRes.TIMEOUT,
          stateStepsRes.FAILED
        ]

        if (matchingTypeRes.length === 0 && listStatusCanShowStepQueue.includes(stepMatchingStatus)) {
          return { ...step, state: 'active', content: renderQueue(), timeContent: renderTimeQueue() }
        }

        if (matchingTypeRes.length > 0 && stepMatchingStatus !== stateStepsRes.CANCELLED) {
          return { ...step, state: 'success', timeContent: renderTimeQueue() }
        }

        return step
      }

      if (step.step === steps.INPROGRESS) {
        const listStatusCanShowStepInprogress = [
          stateStepsRes.INPROGRESS,
          stateStepsRes.CANCELLING,
          stateStepsRes.TIMEOUT,
          stateStepsRes.FAILED
        ]

        if (matchingTypeRes.length > 0 && listStatusCanShowStepInprogress.includes(stepMatchingStatus) && stepMatchingStatus !== stateStepsRes.COMPLETED) {
          return { ...step, state: 'active', content: renderInprocess() }
        }

        if (stepMatchingStatus === stateStepsRes.COMPLETED) {
          return { ...step, state: 'success' }
        }

        return step
      }

      if (step.step === steps.COMPLETED && stepMatchingStatus === stateStepsRes.COMPLETED) {

        return { ...step, state: 'success', timeContent: renderTimeCompleted() }
      }

      return step
    })

    return newMatchingSteps
  }, [engagementUserMatchingRes, isDisableRestartBtn])

  const renderContent = () => {
    return buildsMatchingSteps.map((step, idx) => {
      return <div key={idx} className={`step-tracker ${step?.state}`}>
        <div className='step-tracker__order'></div>
        <div className='step-tracker__wrapper'>
          <div className='step-tracker__header'>
            <div className='step-tracker__title'>{step?.title}</div>
            {step?.timeContent}
          </div>
          {step?.content}
        </div>
      </div>
    })
  }

  const renderViewMatchingButton = useMemo(() => {
    const isShowBtn = _.get(engagementUserMatchingRes, 'status') === stateStepsRes.COMPLETED
    return (
      isShowBtn && (<Grid.Row className='matching__row--btn'>
        <Grid.Column>
          <Button primary className='matching-button-active'>
            {matching.matchingResultsButton}
          </Button>
        </Grid.Column>
      </Grid.Row>))
  }, [engagementUserMatchingRes])

  const {
    matchingDialogueHeaderIcon,
    matchingDialogueHeader,
    matchingDialogueContent,
    matchingDialogueCancelButton,
    matchingDialogueConfirmButton,
    matchingDialogueOnConfirm,
    matchingDialogueClassName
  } = dialogueContent
  
  return (
    <>
      <Grid columns='equal'>
        { engagementUserMatchingRes && renderBanner()}
        <Grid.Row className={`
          matching__row matching__contents
          ${engagementUserMatchingRes && stepMatchingStatus == stateStepsRes.COMPLETED ? 'matching_completed' : ''}
          ${engagementUserMatchingRes && stepMatchingStatus !== stateStepsRes.COMPLETED && stepMatchingStatus !== stateStepsRes.CANCELLED ? 'matching_running' : ''}
          ${isMatchingProcessing ? 'matching_proccessing' : ''}
        `}>
          <Grid.Column>
            {renderContent()}
          </Grid.Column>
        </Grid.Row>
        {renderViewMatchingButton}
      </Grid>
      <Dialogue
        open={openDialogue}
        closeIcon={true}
        onModalClose={onCloseDialogue}
        onClose={onCloseDialogue}
        headerIcon={matchingDialogueHeaderIcon}
        modalClassName={`dialogue-modal-matching ${matchingDialogueClassName}`}
        header={matchingDialogueHeader}
        content={matchingDialogueContent}
        cancelBtn={matchingDialogueCancelButton}
        confirmBtn={matchingDialogueConfirmButton}
        onConfirm={matchingDialogueOnConfirm}
      />
    </>
  )
}

export default ProcessStatusView