import React, { useMemo, useState, useEffect } from 'react'
import { Grid } from 'semantic-ui-react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { useIntl } from 'react-intl'
import { REQUEST_MODEL } from 'src/config/constants'
import { unwrapResult } from '@reduxjs/toolkit'
import { Container, Image } from 'src/components'
import SingleTable from 'src/components/Table/SingleTable'
import illustPortfolioView from 'src/assets/icons/svgs/illustportfolioview.svg'
import { scheduleTaskListMessages, headerTable, tableSettings, minTimeBeforeScheduled } from './constants'
import { scheduleTaskStatus, scheduleTaskStatusMessages } from '../constants'
import { showLoading, hideLoading, openModal, closeModal } from 'src/containers/Common/actions'
import { listScheduleTasksSelector, getScheduleTasksThunk, cancelScheduleTasksThunk, updateListScheduleTasks } from 'src/containers/Portfolio/Redux'
import messages from './messages'
import failedIcon from 'src/assets/icons/svgs/failed_icon.svg'
import ExtractionStatusModal from '../ViewFailuresModal'

const ScheduleTasks = (props) => {
  const dispatch = useDispatch()
  const intl = useIntl()
  const { cancelTasks, setCancelTasks, setIsDisabledCancel, handleEditTask, handleSaveSuccess, setCountScheduledTask, handleViewFailTask, disableEditScheduleTasks } = props
  const listScheduleTasks = useSelector(listScheduleTasksSelector)
  const [listScheduleTaskCancel, setListScheduleTaskCancel] = useState([])
  const { engagementId, geoCode, containerCode } = useParams()
  const minNextTime = new Date().getTime() + minTimeBeforeScheduled
  const [isViewFailure, setIsViewFailure] = useState(false)
  const [contentFailTaskModal, setContentFailTaskModal] = useState([])
  const [isReload, setIsReload] = useState(false)

  useEffect(async () => {
    const model = REQUEST_MODEL
    model.uri = { engagementId, containerCode }
    model.geoCode = geoCode
    dispatch(getScheduleTasksThunk(model))
  }, [])

  useEffect(async () => {
    if (cancelTasks) {
      handleCancelTasks()
      setCancelTasks(false)
    }
  }, [cancelTasks])

  useEffect(() => {
    const reloadAction = setTimeout(() => {
      setIsReload(!isReload)
    }, tableSettings.numberOfSecondToReload * 1000)
    return () => clearTimeout(reloadAction)
  }, [isReload])

  const cancelTask = async () => {
    const nextTime = new Date().getTime() + minTimeBeforeScheduled
    const listScheduleTaskCancelIds = _.map(_.filter(listScheduleTaskCancel, (scheduleTaskCancel) => (new Date(scheduleTaskCancel.scheduleDateTime)).getTime() > nextTime), 'id')

    if (listScheduleTaskCancelIds.length > 0) {
      const model = {
        ...REQUEST_MODEL,
        uri: { engagementId, containerCode },
        payload: { requestIds: listScheduleTaskCancelIds },
        geoCode
      }
      const { result } = unwrapResult(await dispatch(cancelScheduleTasksThunk(model)))
      if (result.statusCode === 200) {
        setIsDisabledCancel(true)
        handleSaveSuccess()
      }
    }

    dispatch(hideLoading())
  }

  const handleCancelTasks = () => {
    return dispatch(
      openModal({
        className: 'warning-cancel-task-modal',
        header: {
          content: null,
        },
        body: {
          content: intl.formatMessage(messages.contentConfirmCancelTask),
        },
        leftBtn: {
          listBtn: [
            {
              className: 'tertiary-btn',
              label: intl.formatMessage(messages.closeBtn),
              onClick: handleCloseBtn,
            },
          ],
        },
        rightBtn: {
          listBtn: [
            {
              className: 'primary-btn',
              label: intl.formatMessage(messages.cancelBtn),
              onClick: handleCancelTask,
            },
          ],
        },
      }),
    )
  }

  useEffect(() => {
    if (listScheduleTaskCancel.length > 0) {
      let scheduleTasks = listScheduleTasks.map((x) => {
        return {
          ...x,
          checked: _.some(listScheduleTaskCancel, {id: x.id})
        }
      })
      dispatch(updateListScheduleTasks(scheduleTasks))
      setIsDisabledCancel(false)
    } else {
      dispatch(updateListScheduleTasks(null))
      setIsDisabledCancel(true)
    }
  }, [listScheduleTaskCancel])

  const renderRowData = (record) => {
    return columnsDetail(record, handleCheckItem)
  }

  const handleCheckItem = (e, data) => {
    const checkedScheduleTask = _.find(listScheduleTasks, x => x.id === data.value)
    if (checkedScheduleTask && checkedScheduleTask.status === scheduleTaskStatus.scheduled) {
      let filterScheduleTaskCancel = _.cloneDeep(listScheduleTaskCancel)
      if (data.checked) {
        if (!_.some(filterScheduleTaskCancel, {id: checkedScheduleTask.id})) {
          filterScheduleTaskCancel.push({id: checkedScheduleTask.id, scheduleDateTime: checkedScheduleTask.scheduleDateTime})
        }
      } else {
        filterScheduleTaskCancel = _.filter(filterScheduleTaskCancel, x => x.id !== data.value)
      }
      setListScheduleTaskCancel(filterScheduleTaskCancel)
    }
  }

  const handleCloseBtn = () => {
    dispatch(closeModal())
  }

  const handleCancelTask = () => {
    dispatch(showLoading())
    setListScheduleTaskCancel([])
    cancelTask()
    dispatch(closeModal())
  }

  const columnsDetail = (scheduleTask, handleCheckItem) => {
    const formattedScheduleStatus = _.find(scheduleTaskStatusMessages, x => x.id === scheduleTask.status)
    const timeSchedule = (new Date(scheduleTask.scheduleDateTime)).getTime()
    const activeEdit = scheduleTask.status === scheduleTaskStatus.scheduled && timeSchedule > minNextTime
    return [
      {
        type: 'checkbox',
        func: handleCheckItem,
        className: `schedule-task__container__schedule-list__container__checkbox ${!activeEdit ? '--row-disabled' : ''}`,
        isDisabled: !activeEdit,
        checked: scheduleTask.checked
      },
      {
        className: 'schedule-task__container__schedule-list__container__scheduled-extraction',
        type: 'datetimeByLocale',
        value: scheduleTask.scheduleDateTime
      },
      {
        className: 'schedule-task__container__schedule-list__container__created-date',
        type: 'date',
        value: scheduleTask.createdTime
      },
      {
        className: 'schedule-task__container__schedule-list__container__status',
        value: scheduleTask?.status != scheduleTaskStatusMessages.statusFailed.id  && scheduleTask?.isInstantRetry == false ? formattedScheduleStatus?.value :
          <div> 
            <div className='inline'>{formattedScheduleStatus?.value} </div>
            <Image inline src={failedIcon}/>
          </div>
      },
      {
        className: 'schedule-task__container__schedule-list__container__task-owner',
        value: scheduleTask.taskOwner
      },
      {
        className: 'schedule-task__container__schedule-list__container__last-changed-by',
        value: scheduleTask.lastChangedBy
      },
      {
          value: scheduleTask?.status == scheduleTaskStatusMessages.statusFailed.id  || scheduleTask?.isInstantRetry == true ?
            <label className='link'
              onClick= {() =>handleOpenRequestModal(scheduleTask)}
            > {scheduleTaskListMessages.viewFailures} </label>
            : activeEdit ? <div className='icon--pencil' disabled={disableEditScheduleTasks} onClick={() => handleEditTask(scheduleTask)}></div> : null,
            className: 'edit-icon'
        }
    ]
  }

  const handleOpenRequestModal = (scheduleTask) => {
    setContentFailTaskModal(scheduleTask)
    setIsViewFailure(true)
  }

  const handleCloseRequestModal = () => {
    setIsViewFailure(false)
  }

  const renderListOfScheduleTasks = useMemo(() => {
    const scheduledTasks = listScheduleTasks.filter(x => x.status === scheduleTaskStatus.scheduled)
    setCountScheduledTask(scheduledTasks.length)

    const length = listScheduleTasks.length
    if (length > 0) {
      const scrollClass = (length * tableSettings.rowHeight) > (window.innerHeight - tableSettings.tableHeightOffset) ? 'scroll-table' : '' //caculating have scroll table
      return (
        <SingleTable
          headerTable={headerTable}
          listData={listScheduleTasks}
          renderRowData={renderRowData}
          isDisabledRow={false}
          selectable={false}
          classes={`primary-table schedule-task-list-table ${scrollClass}`}
        />
      )
    } else {
      return (
        <>
          <Image src={illustPortfolioView} alt='illustPortfolioView' centered className='no-extract-schedules' />
          <div className='div--centered'>{scheduleTaskListMessages.emptySchedule}</div>
        </>
      )
    }
  }, [listScheduleTasks, isReload])

  return (
    <Container classes='schedule-task__container__schedule-list__container'>
      <Grid columns='equal'>
        <Grid.Column>
          {renderListOfScheduleTasks}
        </Grid.Column>
      </Grid>
      {isViewFailure && <ExtractionStatusModal contentFailTaskModal={contentFailTaskModal} onClose={handleCloseRequestModal} />}
    </Container>
  )
}

export default ScheduleTasks
