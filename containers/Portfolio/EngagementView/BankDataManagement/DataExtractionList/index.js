import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Container, Button, Image } from 'src/components'
import addCircleIcon from 'src/assets/icons/svgs/add_circle_icon.svg'
import { scheduleTaskMessages, maxCreateScheduledTask } from './constants'
import { Dimmer } from 'semantic-ui-react'
import { openErrorModal } from 'src/containers/Common/actions'
import { handleLockingObject, getIsAuthorizedTimezoneSelected } from './services'
import { warningMeassages, warningMessageKeyEnum } from './ContentTaskModal/constants'
import checked_circle_green from 'src/assets/Icons/svgs/checked_circle_green.svg'
import './styles.scss'
import ScheduleTasks from './ScheduleTaskList'
import ContentTaskModal from './ContentTaskModal'

import { REQUEST_MODEL, lockTypes } from 'src/config/constants'
import EngagementViewNav from 'src/containers/Portfolio/EngagementView/EngagementViewNav'
import { getCurrentEngagementByIdThunk } from 'src/containers/Portfolio/Redux'

function DataExtractionList(props) {
  const dispatch = useDispatch()
  const [isDisabledCancel, setIsDisabledCancel] = useState(true)
  const [cancelTasks, setCancelTasks] = useState(false)
  const [isOpenSuccess, setIsOpenSuccess] = useState(false)
  const [countScheduledTask, setCountScheduledTask] = useState(0)
  const [contentTaskModal, setContentTaskModal] = useState({
    data: null,
    isOpenTaskModal : false,
    isEdit: false
  })
  const [data, setData] = useState({})
  const [disableEditScheduleTasks, setDisableEditScheduleTasks] = useState(false)

  const { engagementId, geoCode, containerCode } = useParams()
  const model = {
    ...REQUEST_MODEL,
    uri: { engagementId, containerCode },
    geoCode
  }

  const renderScheduleList = () => {
    return (
      <>
        <EngagementViewNav />
        <div className='schedule-task'>
          <Container classes='schedule-task__container'>
            <div className='schedule-task__container__actions'>
              <Button
                className='primary-btn btn--create'
                onClick={createTask}>
                <Image src={addCircleIcon} centered />
                {scheduleTaskMessages.createTask}
              </Button>
              <Button
                className='btn--cancel'
                disabled={isDisabledCancel}
                onClick={() => setCancelTasks(true)}>
                {scheduleTaskMessages.cancelTask}
              </Button>
            </div>
            <div className='schedule-task__container__schedule-list'>
              <ScheduleTasks disableEditScheduleTasks={disableEditScheduleTasks} cancelTasks={cancelTasks} setCancelTasks={setCancelTasks} setIsDisabledCancel={setIsDisabledCancel} handleEditTask={handleEditTask} handleSaveSuccess={handleSaveSuccess} setCountScheduledTask={setCountScheduledTask}/>
            </div>
          </Container>
        </div>
      </>
    )
  }

  const createTask = async () => {
    let message = null
    if(countScheduledTask >= maxCreateScheduledTask) {
      message = warningMeassages[warningMessageKeyEnum.maximumNumberScheduled.value].message
    } else {
      const payload = {
        uri: { engagementId, containerCode },
        geoCode,
      }
      const { result } = await getIsAuthorizedTimezoneSelected(payload)
      if (result.statusCode === 200 && result.data) {
        setContentTaskModal({ isOpenTaskModal: true })
      } else {
        message = warningMeassages[warningMessageKeyEnum.timeZoneAuthorized.value].message
      }
    }
    if(message !== null) dispatch(openErrorModal(message))
  }

  const openConsentIDExpiryWarningMessage = (warningMessageKey) => {
    let message = null
    if(warningMessageKey) {
      message = warningMeassages[warningMessageKey].message
    }
    if(message !== null) dispatch(openErrorModal(message))
  }

  const handleEditTask = async (data) => {
    setDisableEditScheduleTasks(true)
    setData(data)
  }

  const handleEditTaskCallback = async () => {
    const lockData = await checkLockEdit(data.id)
    setDisableEditScheduleTasks(false)
    setContentTaskModal({
      isOpenTaskModal: true,
      isEdit: true,
      data: data,
      lockData: lockData
    })
  }

  useEffect(() => {
    if (disableEditScheduleTasks) {
      handleEditTaskCallback()
    }
  }, [disableEditScheduleTasks]);

  const checkLockEdit = async (scheduleTaskId) => {
    const payload = {
      uri: { containerCode },
      geoCode,
      payload: {
        lockType: lockTypes.scheduleTask,
        objectId: scheduleTaskId
      }
    }
    const { result } = await handleLockingObject(payload)
    if (result.statusCode === 200) {
      return result.data
    }
    return {}
  }

  useEffect(() => {
    dispatch(getCurrentEngagementByIdThunk(model))
  }, [])

  const handleCloseTaskModal = (saveSuccess) => {
    setContentTaskModal({})
    saveSuccess && handleSaveSuccess()
  }

  const handleSaveSuccess = () => {
    setIsOpenSuccess(true)
    setTimeout(() => {
      setIsOpenSuccess(false)
    }, 1500)
  }

  return (
    <>
      {renderScheduleList()}
      {contentTaskModal.isOpenTaskModal && <ContentTaskModal data={contentTaskModal.data} isEdit={contentTaskModal.isEdit} lockData={{...contentTaskModal.lockData}} onClose={handleCloseTaskModal} consentIDExpiryWarning={openConsentIDExpiryWarningMessage}/>}
      <Dimmer className='gray-bg' active={isOpenSuccess} page>
        <Image src={checked_circle_green} centered />
      </Dimmer>
    </>
  )
}

export default DataExtractionList
