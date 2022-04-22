import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useForm, FormProvider } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { unwrapResult } from '@reduxjs/toolkit'
import { useIntl, FormattedMessage } from 'react-intl'
import moment from 'moment'
import { Image } from 'semantic-ui-react'

import { RequestModal } from 'src/containers/Common/Components'
import { showLoading, hideLoading, openModal, closeModal, openErrorModal } from 'src/containers/Common/actions'
import { createScheduleTaskThunk, updateScheduleTaskThunk } from 'src/containers/Portfolio/Redux'
import { unlockObject } from '../services'
import { validationForm } from './validationForm'
import { taskMessages, warningMeassages, warningMessageKeyEnum, minTimeBeforeScheduled, limitTimeEditing, expirationWarningMessageStatusEnum } from './constants'
import { types } from 'src/containers/Common/Components/RequestModal/constants'
import messages from './messages'
import { scheduleTaskStatusMessages } from '../constants'
import { lockTypes } from 'src/config/constants'
import { Button } from 'src/components'
import ErrorIcon from 'src/assets/icons/svgs/triangle.svg'
import './styles.scss'

const ContentTaskModal = (props) => {
  const dispatch = useDispatch()
  const intl = useIntl()
  const { onClose, data, isEdit, lockData } = props
  const { engagementId, geoCode, containerCode } = useParams()
  const defaultdata = {
    id: null,
    scheduleDate: null,
    scheduleTime: null,
    scheduleStatus: scheduleTaskStatusMessages.statusScheduled.value,
    isLocked: lockData.isLocked
  }
  const minNextTime = new Date().getTime() + minTimeBeforeScheduled
  if (isEdit) {
    const scheduleDateTime = new Date(data.scheduleDateTime)
    defaultdata.id = data.id
    defaultdata.scheduleDate = scheduleDateTime
    defaultdata.scheduleTime = scheduleDateTime
  }

  const [ currentData, setCurrentData ] = useState({...defaultdata})
  
  useEffect(() => {
    if (isEdit) {
      const timer = !currentData.isLocked ? setTimeout(() => {
        dispatch(openModal({
          className: 'warning-modal warning-timeout-modal',
          haveCloseIcon: true,
          onClose,
          body: {
            content: intl.formatMessage(messages.warningLimitTimeEditingScheduleTask)
          }
        }))
        setCurrentData({...defaultdata, isLocked: true})
        handleUnlockObject()
      }, limitTimeEditing) : null;
      window.addEventListener('beforeunload', handleUnload)
      return () => {
        !lockData.isLocked && clearTimeout(timer)
        window.removeEventListener('beforeunload', handleUnload)
      }
    }
    return () => {}
  })

  const handleUnload = async () => {
    if (!currentData.isLocked) {
      await handleUnlockObject(true)
    }
  }

  const methods = useForm({
    mode: 'all',
  })
  const { formState, setError } = methods
  const { isDirty } = formState

  const handleClosePanel = () => {
    if (!isDirty || !editChanged()) {
      isEdit && !currentData.isLocked && handleUnlockObject()
      return onClose()
    }
    return dispatch(openModal({
      className: 'leave-modal',
      header: {
        content: intl.formatMessage(messages.headerConfirm)
      },
      body: {
        content: intl.formatMessage(messages.contentConfirm)
      },
      leftBtn: {
        listBtn: [{
          className: 'tertiary-btn',
          label: intl.formatMessage(messages.cancelBtn),
          onClick: async () => {
            dispatch(closeModal())
          }
        }]
      },
      rightBtn: {
        listBtn: [{
          className: 'primary-btn',
          label: intl.formatMessage(messages.yesBtn),
          onClick: () => {
            dispatch(closeModal())
            isEdit && !currentData.isLocked && handleUnlockObject()
            onClose()
          }
        }]
      }
    }))
  }

  const handleUnlockObject = async (keepalive = false) => {
    const payload = {
      uri: { containerCode },
      geoCode,
      payload: {
        lockType: lockTypes.scheduleTask,
        objectId: currentData.id
      },
      keepalive: keepalive
    }
    await unlockObject(payload)
  }

  const handleOnSubmit = async (data) => {
    if (moment().add(minTimeBeforeScheduled, 'ms').diff(defaultdata.scheduleDate, 's') > 0) {
      onClose()
    } else if (moment().add(minTimeBeforeScheduled, 'ms').diff(data.scheduleDate, 's') >= 0) {
      setError('scheduleTime', {
        type: 'minTimeSelect',
        message: taskMessages.scheduleValidateMinTimeSelect
      })
    } else {
      dispatch(showLoading())
      if (!isEdit) {
        await handleCreateScheduleTask(data)
      } else {
        await handleUpdateScheduleTask(data)
      }
    }
  }

  const handleCheckExpiryDateStatus = (result) => {
    const expiryDateStatus = _.get(result, 'data.data.expiryDateStatus')
    if (props.consentIDExpiryWarning && typeof props.consentIDExpiryWarning === 'function') {
      if (expiryDateStatus === expirationWarningMessageStatusEnum.expired) {
        props.consentIDExpiryWarning(warningMessageKeyEnum.consentIDExpired.value)
      }
      else if ( expiryDateStatus === expirationWarningMessageStatusEnum.expiryWarning) {
        props.consentIDExpiryWarning(warningMessageKeyEnum.consentIDExpiryWarning.value)
      }
    }
  }

  const handleCreateScheduleTask = async (data) => {
    const { scheduleDate, scheduleTime } = data

    const scheduleDateTime = {
      year: scheduleDate.getFullYear(),
      month: scheduleDate.getMonth() + 1,
      day: scheduleDate.getDate(),
      hour: scheduleTime.getHours(),
      minute: scheduleTime.getMinutes()
    }
    const requestModel = {
      uri: { engagementId: engagementId, containerCode },
      geoCode,
      payload: { scheduleDateTime : scheduleDateTime }
    }

    const { result } = unwrapResult(await dispatch(createScheduleTaskThunk(requestModel)))
    handleCheckExpiryDateStatus(result)
    handleClose(result)
  }

  const handleUpdateScheduleTask = async (data) => {
    const { scheduleDate, scheduleTime } = data
    const scheduleDateTime = {
      year: scheduleDate.getFullYear(),
      month: scheduleDate.getMonth() + 1,
      day: scheduleDate.getDate(),
      hour: scheduleTime.getHours(),
      minute: scheduleTime.getMinutes()
    }
    const requestModel = {
      uri : { engagementId: engagementId, containerCode },
      geoCode,
      payload : {id:currentData.id, scheduleDateTime : scheduleDateTime}
    }
    const { result } = unwrapResult(await dispatch(updateScheduleTaskThunk(requestModel)))
    handleCheckExpiryDateStatus(result)
    handleClose(result)
  }

  const handleClose = (result) => {
    const statusCode = _.get(result, 'statusCode')
    if (statusCode !== 200) {
      dispatch(hideLoading())
      dispatch(openErrorModal(warningMeassages[0].message))
    } else {
      const invalidatedKey = _.get(result.data, 'invalidatedKey')
      if (invalidatedKey) {
        let warningMeassage = warningMeassages.find(x => x.key === invalidatedKey)
        if (!warningMeassage) {
          warningMeassage = warningMeassages[0]
        }
        dispatch(hideLoading())
        dispatch(openErrorModal(warningMeassage.message))
      } else {
        dispatch(hideLoading())
        isEdit && handleUnlockObject()
        onClose(true)
      }
    }
  }

  const handleOnchangeDate = (value) => {
    setCurrentData({...currentData, scheduleDate: value})
  }

  const handleOnchangeTime = (value) => {
    setCurrentData({...currentData, scheduleTime: value})
  }

  const timeValidation = {
    required: taskMessages.scheduleTimeRequired,
    validate: {
      minTimeSelect: (value) => {
        let scheduleTime = currentData.scheduleDate
        if(!scheduleTime) return null
        scheduleTime.setHours(value.getHours())
        scheduleTime.setMinutes(value.getMinutes())
        const selectedTime = scheduleTime.getTime()
        return minNextTime <= selectedTime ? null : taskMessages.scheduleValidateMinTimeSelect 
      }
    }
  }

  const editChanged = () => {
    if (isEdit) {
      const defaultDataTime = new Date(defaultdata.scheduleTime).getTime()
      const defaultDataDate = new Date(defaultdata.scheduleDate).getTime()
      const curentDataTime = new Date(currentData.scheduleTime).getTime()
      const curentDataDate = new Date(currentData.scheduleDate).getTime()
      return defaultDataTime !== curentDataTime || defaultDataDate !== curentDataDate
    }
    return true
  }

  const renderMessageTaskBlocked = () => {
    return !lockData.isLocked ? null : <div className='task-blocked-message'>
      <Image src={ErrorIcon} className='task-blocked-message-icon'/>
      <p className='task-blocked-message-content'><FormattedMessage {...messages.messageTaskBlocked} values={{userName: `${lockData.userFirstName} ${lockData.userLastName}`}}/></p>
    </div>
  }

  const buildContentTabs = () => {
    const minDateSelect = new Date()
    minDateSelect.setDate(minDateSelect.getDate() + 1)
    return [
      {
        header: messages.scheduleExtraction.defaultMessage,
        form: {
          onSubmit: (data) => handleOnSubmit(data),
          id: 'schedule-extraction',
          className: 'create-schedule-task'
        },
        content: [
          {
            type: types.custom,
            content: renderMessageTaskBlocked()
          },
          {
            type: types.date,
            label: taskMessages.scheduleDate,
            className: 'create-schedule-task__input',
            name: 'scheduleDate',
            iconName: 'calendar-svg',
            iconSize: 'normal',
            disabled: currentData.isLocked,
            minDate: minDateSelect,
            onChange: (value) => handleOnchangeDate(value),
            validationForm: validationForm.scheduleDate,
            noLocalDateTime: true
          },
          {
            type: types.time,
            label: taskMessages.scheduleTime,
            className: 'create-schedule-task__input',
            name: 'scheduleTime',
            disabled: currentData.isLocked,
            onChange: (value) => handleOnchangeTime(value),
            validationForm: timeValidation
          },
          {
            type: types.custom,
            className: 'create-schedule-task__input create-schedule-task__input--custom-content',
            name: 'scheduleStatus',
            disabled: true,
            validationForm: validationForm.status,
            content:(
              <>
                <label>{taskMessages.status}</label>
                <Button disabled={true} className={'schedule-status-btn'}>{currentData.scheduleStatus}</Button>
              </>
            )
          }
        ],
        buttons: [
          {
            label: taskMessages.cancelBtn,
            className: 'secondary-btn',
            onClick: () => handleClosePanel()
          },
          {
            label: taskMessages.saveBtn,
            className: 'primary-btn',
            type: 'submit',
            disabled: !editChanged()
          }
        ]
      }
    ]
  }

  return <FormProvider {...methods}>
            <RequestModal
              contentTabs={buildContentTabs()}
              onClose={handleClosePanel}
              currentData={currentData}
            />
          </FormProvider>
}

export default ContentTaskModal
