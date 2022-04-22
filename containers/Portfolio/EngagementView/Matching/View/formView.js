import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react'
import { useSelector } from 'react-redux'
import { Grid  } from 'semantic-ui-react'

import { Header, Input, Inline, Button, Image } from 'src/components'
import ErrorIcon from 'src/assets/icons/svgs/triangle.svg'
import CompleteIcon from 'src/assets/icons/svgs/step_complete.svg'
import disablePointerBoldRightIcon from 'src/assets/icons/svgs/pointer_bold_right_disable.svg'
import activePointerBoldRightIcon from 'src/assets/icons/svgs/pointer_bold_right_active.svg'

import { matching, rangeNumber, incrementValue, defaultNumber, stateStepsRes } from '../constants'
import { infoDataMatchingSelector } from '../Redux'

const FormView = (props, ref) => {
  const infoDataMatching = useSelector(infoDataMatchingSelector)
  const { isGroupNameDataStatus, isTransactionDataStatus, onRefreshView, startMatchingProcess, isMatchingProcessing } = props
  const [inputValue, setInputValue] = useState(defaultNumber)
  const [isInputValid, setIsInputValid] = useState(true)
  const [isDisableInputDate, setIsDisableInputDate] = useState(true)
  const [isDisableStartButton, setIsDisableStartButton] = useState(false)

  useEffect(() => {
    const { matchingPrepareInfoRes, engagementUserMatchingRes } = infoDataMatching
    setInputValue(_.get(matchingPrepareInfoRes, 'dateDifference', defaultNumber))
    const listStatusCanEnableStartMatching = [stateStepsRes.FAILED, stateStepsRes.TIMEOUT, stateStepsRes.CANCELLED, stateStepsRes.COMPLETED]
    if (!_.isEmpty(engagementUserMatchingRes) && !listStatusCanEnableStartMatching.includes(engagementUserMatchingRes.status)) {
      setIsDisableInputDate(true)
      setIsDisableStartButton(true)
    } else {
      setIsDisableInputDate(false)
      setIsDisableStartButton(false)
    }
  }, [infoDataMatching])

  const changeNumberQuantity = (type) => {
    let currentNumber
    if (type == 1) {
      currentNumber = Number(inputValue) + incrementValue
    } else {
      currentNumber = Number(inputValue) - incrementValue
    }
    setInputValue(currentNumber)

    if (currentNumber < rangeNumber.min || currentNumber > rangeNumber.max) {
      setIsInputValid(false)
      setIsDisableStartButton(true)
    } else {
      setIsInputValid(true)
      setIsDisableStartButton(false)
    }
  }

  const handleInput = (data) => {
    const value = Number(data.value)
    const tmp = (/^\d+$/g).test(value) && value % 1 === 0 && value >= rangeNumber.min && value <= rangeNumber.max
    setIsInputValid(tmp)
    setIsDisableStartButton(!tmp)
    setInputValue(value.toString())
  }

  const onStartMatchingProcess = (inputValue) => {
    startMatchingProcess(inputValue)
    setIsDisableInputDate(true)
    setIsDisableStartButton(true)
  }

  useImperativeHandle(ref, () => ({
    startMatchingProcess () {
      onStartMatchingProcess(inputValue)
    }
  }), [])

  const renderRowDataStatus = () => {
    const isDisabledDateDifference = !isGroupNameDataStatus || !isTransactionDataStatus || isDisableInputDate || isMatchingProcessing
    const isClickButton = isGroupNameDataStatus && isTransactionDataStatus && !isDisableInputDate && !isMatchingProcessing
    const notCompletedClass = (!isGroupNameDataStatus || !isTransactionDataStatus) ? 'matching__row__not-completed' : ''
    return (
      <Grid.Row className={`matching__row matching_data_status ${notCompletedClass}`}>
        <Grid.Column>
          <div className='group-GroupName'>
            <div className='matching-label'>
              {matching.GroupNameData}
            </div>
            <div className='matching-status'>
              <Image src={`${isGroupNameDataStatus ? CompleteIcon : ErrorIcon}`} /> {isGroupNameDataStatus ? matching.extractionCompleted : matching.extractionNotCompleted}
            </div>
          </div>
          <div className='group-transaction'>
            <div className='matching-label'>
              {matching.transactionalData}
            </div>
            <div className='matching-status'>
              <Image src={`${isTransactionDataStatus ? CompleteIcon : ErrorIcon}`} /> {isTransactionDataStatus ? matching.uploadCompleted : matching.uploadNotCompleted}
            </div>
          </div>
          <div className='group-date'>
            <div className='matching-label'>
              {matching.dateDifference}
            </div>
            <div className='matching-status date-difference'>
              <div className='wrapper-inputNumber'>
                <Input
                  type='number'
                  value={inputValue}
                  className={`inputNumber ${isDisabledDateDifference? 'invalid' : ''} ${!isInputValid ? 'matching-error' : ''}`}
                  onChange={(e, value) => handleInput(value)}
                />
                <div className='inputNumber-nav'>
                  <Button
                    className={`inputNumber-button inputNumber-up ${isDisabledDateDifference? 'invalid' : ''} ${!isInputValid ? 'matching-error' : ''}`}
                    onClick={() => isClickButton && changeNumberQuantity(1)}
                  />
                  <Button
                    className={`inputNumber-button inputNumber-down ${isDisabledDateDifference? 'invalid' : ''} ${!isInputValid ? 'matching-error' : ''}`}
                    onClick={() => isClickButton && changeNumberQuantity(0)}
                  />
                </div>
              </div>
            </div>
            { !isInputValid && <div className='helper-text'>
              {matching.helperText}
            </div>
            }
          </div>
        </Grid.Column>
      </Grid.Row>
    )
  }

  const renderRowDataHeader = () => {
    return (
      <Grid.Row className='matching__row matching_header'>
        <Grid.Column>
          <Header as='h1'>{matching.dataMatching}</Header>
        </Grid.Column>
      </Grid.Row>
    )
  }

  const renderRowDataWarningInline = () => {
    return <Grid.Row className='matching__row matching_data_error'>
      <Grid.Column>
        <Inline
          type='error'
          title={matching.missingDataError}
          content={matching.missingData}
          button={matching.refreshView}
          onClickButton={onRefreshView}
        />
      </Grid.Column>
    </Grid.Row >
  }

  const renderMatchingProcessing = () => {
    return <Grid.Row className='matching__row matching__processing'>
      <Grid.Column>
        <Inline
          type='error'
          title={matching.matchingProcessingError}
          content={matching.matchingProcessing}
        />
      </Grid.Column>
    </Grid.Row >
  }

  const renderRowDataButton = () => {
    const btnStatus = !isDisableStartButton && isGroupNameDataStatus && isTransactionDataStatus && !isMatchingProcessing & isInputValid
    return <Grid.Row className='matching__row matching__buttons'>
      <Grid.Column className='start-matching-button'>
        <Button className={`${btnStatus ? 'matching-button-active' : 'matching-button-disable'}`}
          onClick={() => btnStatus && onStartMatchingProcess(inputValue)}
        >
          <div className='textStart'>{matching.startMatchingProcess}</div> <Image noWrapper src={`${btnStatus ? activePointerBoldRightIcon : disablePointerBoldRightIcon}`} />
        </Button>
      </Grid.Column>
    </Grid.Row>
  }

  return (
    <Grid columns='equal'>
      {renderRowDataHeader()}
      {renderRowDataStatus()}
      {!isGroupNameDataStatus || !isTransactionDataStatus ? renderRowDataWarningInline() : ''}
      {renderRowDataButton()}
      {isMatchingProcessing && isGroupNameDataStatus && isTransactionDataStatus ? renderMatchingProcessing() : ''}
    </Grid>
  )
}

export default forwardRef(FormView)