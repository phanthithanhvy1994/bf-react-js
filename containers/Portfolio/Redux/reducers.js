import { createSlice } from '@reduxjs/toolkit'
import { statusApproved } from '../constants'
import { GuidEmpty } from 'src/config/constants'
import { scheduleTaskStatus } from 'src/containers/Portfolio/EngagementView/GroupNameDataManagement/DataExtractionList/constants'
import { getEngagementsByCurrentUserThunk, getCurrentEngagementByIdThunk, getAllTimeZonesThunk,
  getTransactionalDataFiles, getTransactionalDataFileById, mergeUploadTransactionDataFileRequest, uploadTransactionDataFileRequest,
  getScheduleTasksThunk, cancelScheduleTasksThunk, createScheduleTaskThunk, updateScheduleTaskThunk, getExtractionStatusThunk, retryExtractionDataThunk } from './thunks'

const getDataFile = (state, { payload }) => {
  const transactionalDataFile = _.get(payload, 'result.data', {})
  if (transactionalDataFile && transactionalDataFile.transactionalDataFileId && transactionalDataFile.transactionalDataFileId !== GuidEmpty
      && transactionalDataFile.isSuccess) {
    const transactionalDataFileKey = _.findKey(state.transactionalDataFiles, ['transactionalDataFileId', transactionalDataFile.transactionalDataFileId])
    if (transactionalDataFileKey) {
      if (!_.isEqual(state.transactionalDataFiles[transactionalDataFileKey], transactionalDataFile)) {
        state.transactionalDataFiles = [transactionalDataFile]
      }
    }
    else {
      state.transactionalDataFiles = [transactionalDataFile]
    }
  }
}

export const engagementSlice = createSlice({
  name: 'engagement',
  initialState: {
    currentEngagement: {},
    listOfEngagements: [],
    allTimeZones: [],
    transactionalDataFiles: [],
    listScheduleTasks: [],
    listExtractionStatus: []
  },
  reducers: {
    updateListEngagements: (state, { payload }) => {
      state.listOfEngagements = [payload.result.data, ...state.listOfEngagements]
      localStorage.setItem('listOfEngagements', JSON.stringify(state.listOfEngagements))
    },
    updateEngagementById: (state, { payload }) => {
      state.listOfEngagements = state.listOfEngagements.map(engagement => (engagement.id === payload.id && {...engagement, ...payload}) || engagement)
      localStorage.setItem('listOfEngagements', JSON.stringify(state.listOfEngagements))
    },
    updateCurrentEngagement: (state, { payload }) => {
      state.currentEngagement = payload
    },
    sortRecentEngagements: (state, { payload }) => {
      state.listOfEngagements = _.reduce(state.listOfEngagements, (result, value) => {
        if (value.id === payload.engagementId) {
          result.unshift(value)
        } else {
          result.push(value)
        }
        return result
      }, [])
    },
    updateStatusDeletedEngagementList: (state, { payload }) => {
      const { engagementId, status } = payload
      if (status === statusApproved) {
        const index = state.listOfEngagements.findIndex(engagement => engagement.id === engagementId)
        state.listOfEngagements.splice(index, 1)
        return state
      }
      state.listOfEngagements = state.listOfEngagements.map(engagement => {
        if (engagement.id === engagementId) {
          engagement.status = status
        }
        return engagement
      })
    },
    updateListScheduleTasks: (state, { payload }) => {
      if (payload) {
        state.listScheduleTasks = payload
      } else {
        _.forEach(state.listScheduleTasks, function(x) {
          if (x.status === scheduleTaskStatus.scheduled && x.checked) {
            x.checked = false
          }
        })
      }
      localStorage.setItem('listOfEngagements', JSON.stringify(state.listOfEngagements))
    },
    clearListExtractionStatus: (state) => {
      state.listExtractionStatus = []
    }
  },
  extraReducers: {
    [getEngagementsByCurrentUserThunk.fulfilled]: (state, { payload }) => {
      if (payload && payload) {
        state.listOfEngagements = payload
      }
    },
    [getCurrentEngagementByIdThunk.fulfilled]: (state, { payload }) => {
      if (payload && payload.result) {
        state.currentEngagement = _.get(payload, 'result.data.engagement', {})
      }
    },
    [getAllTimeZonesThunk.fulfilled]: (state, { payload }) => {
      if (payload && payload.result) {
        state.allTimeZones = _.get(payload, 'result.data', [])
      }
    },
    [getTransactionalDataFiles.fulfilled]: (state, { payload }) => {
      state.transactionalDataFiles = _.get(payload, 'result.data', [])
    },
    [getTransactionalDataFileById.fulfilled]: getDataFile,
    [mergeUploadTransactionDataFileRequest.fulfilled]: getDataFile,
    [createScheduleTaskThunk.fulfilled]: (state, { payload }) => {
      if (payload && payload.result && payload.result.statusCode === 200 && !payload.result.data.invalidatedKey) {
        const newScheduleTask = _.get(payload, 'result.data.data', {})
        let listTasks = [...state.listScheduleTasks]
        const tasksScheduleds = listTasks.filter(x => x.status === scheduleTaskStatus.scheduled)
        const countScheduleds = tasksScheduleds.length
        if (countScheduleds > 0) {
          let addIndex = -1
          for(let i = 0; i < countScheduleds; i++) {
            if(newScheduleTask.scheduleDateTime < listTasks[i].scheduleDateTime) {
              addIndex = i
              break
            }
          }
          listTasks.splice(addIndex !== -1 ? addIndex : countScheduleds, 0, newScheduleTask)
        } else {
          listTasks.unshift(newScheduleTask)
        }
        state.listScheduleTasks = listTasks
      }
    },
    [updateScheduleTaskThunk.fulfilled]: (state, { payload }) => {
      if (payload && payload.result && payload.result.statusCode === 200 && !payload.result.data.invalidatedKey) {
        const updatedData = _.get(payload, 'result.data.data', {})
        let listTasks = [...state.listScheduleTasks]
        let tasksScheduledUpdate = listTasks.find(x => x.id === updatedData.id) || {}
        tasksScheduledUpdate.scheduleDateTime = updatedData.scheduleDateTime
        tasksScheduledUpdate.lastChangedBy = updatedData.lastChangedBy
        listTasks = listTasks.filter(x => x.id !== updatedData.id)
        const tasksScheduleds = listTasks.filter(x => x.status === scheduleTaskStatus.scheduled)
        const countScheduleds = tasksScheduleds.length
        if (countScheduleds > 0) {
          let addIndex = -1
          for (let i = 0; i < countScheduleds; i++) {
            if (tasksScheduledUpdate.scheduleDateTime < listTasks[i].scheduleDateTime) {
              addIndex = i
              break
            }
          }
          listTasks.splice(addIndex !== -1 ? addIndex : countScheduleds, 0, tasksScheduledUpdate)
        } else {
          listTasks.unshift(tasksScheduledUpdate)
        }
        state.listScheduleTasks = listTasks
      }
    },
    [getScheduleTasksThunk.fulfilled]: (state, { payload }) => {
      if (payload && payload.result) {
        state.listScheduleTasks = _.get(payload, 'result.data', [])
      }
    },
    [cancelScheduleTasksThunk.fulfilled]: (state, { payload }) => {
      const cancelled = _.get(payload, 'result.data')
      const cancelledIds = cancelled.map(x => x.id)
      let listTasks = [...state.listScheduleTasks]
      let listCancelled = listTasks.filter(x => cancelledIds.includes(x.id))
      
      if (listCancelled.length > 0) {
        let listCancelledTask = listTasks.filter(x => x.status === scheduleTaskStatus.cancelled)
        listTasks = listTasks.filter(x => !cancelledIds.includes(x.id) && x.status !== scheduleTaskStatus.cancelled)

        _.each(cancelled, (item) => {
          let scheduleTask = _.find(listCancelled, x => x.id === item.id)
          if (scheduleTask) {
            scheduleTask.status = item.status
            scheduleTask.lastChangedBy = item.lastChangedBy
            scheduleTask.checked = false
            listCancelledTask.push(scheduleTask)
          }
        })

        listCancelledTask.sort((a, b) => a.scheduleDateTime > b.scheduleDateTime ? -1 : 1)
        listTasks.push.apply(listTasks, listCancelledTask)
        state.listScheduleTasks = listTasks
      }
    },
    [getExtractionStatusThunk.fulfilled]: (state, { payload }) => {
      state.listExtractionStatus = []
      if (payload && payload.result) {
        let listExtractionStatus = []
        const listExtractionStatusResult = _.get(payload, 'result.data')
        listExtractionStatusResult && listExtractionStatusResult.map((item) => {
          if (item.status === scheduleTaskStatus.inProgress && item.isInstantRetry === true) {
            listExtractionStatus.push({
              ...item, isClickRetry: true
            })
          } else if (item.status !== scheduleTaskStatus.inProgress) {
            listExtractionStatus.push({
              ...item, isClickRetry: false
            })
          }
        })
        state.listExtractionStatus = listExtractionStatus
      }
    },
    [retryExtractionDataThunk.fulfilled]: (state, { payload }) => {
      if (payload && payload.result) {
        const listExtractionStatusIds = _.get(payload, 'result.data')
        let listExtractionStatusCopy = [...state.listExtractionStatus]
        _.forEach(listExtractionStatusCopy, function(x) {
          if (listExtractionStatusIds.filter(y => y === x.id).length > 0) {
            x.isClickRetry = true
          }
        })
        state.listExtractionStatus = listExtractionStatusCopy
      }
    }
  }
})

const { reducer } = engagementSlice
export default reducer
