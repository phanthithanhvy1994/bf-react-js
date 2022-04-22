import { createAsyncThunk, createAction } from '@reduxjs/toolkit'

import { geoSupports, response404 } from 'src/config'
import { engManagement, GroupNameData, glData, files } from 'src/config/apiUrl/index'

export const updateListEngagements = createAction('engagement/updateListEngagements')

export const sortRecentEngagements = createAction('engagement/sortRecentEngagements')

export const updateEngagementById = createAction('engagement/updateEngagementById')
export const updateCurrentEngagement = createAction('engagement/updateCurrentEngagement')

export const updateStatusDeletedEngagementList = createAction('engagement/updateStatusDeletedEngagementList')

export const updateListScheduleTasks = createAction('engagement/updateListScheduleTasks')

export const clearListExtractionStatus = createAction('engagement/clearListExtractionStatus')

export const getCurrentEngagementByIdThunk = createAsyncThunk('Engagement/getCurrentEngagementsById', async (params) => {
  if (engManagement[params.geoCode])
    return await engManagement[params.geoCode].getCurrentEngagementById(params)
  return response404
})

export const getEngagementsByCurrentUserThunk = createAsyncThunk(
  'Engagement/getListEngagements',
  async (params) => {
    const promiseAll = []
    const promise = async (geoCode) => {
      if (engManagement[geoCode])
        return await engManagement[geoCode].getEngagementsListByCurrentUser(params)
      return response404
    }
    geoSupports.forEach((m) => promiseAll.push(promise(m)))

    let result = []
    await Promise.all(promiseAll).then((values) => {
      if (values && values.length > 0) {
        _.forEach(values, (value) => {
          if (value && value.result && value.result.statusCode === 200) {
            result = result.concat(value.result.data?.engagementCatalog)
          }
        })
      }
    })

    return result
  }
)

export const getDELsByPermissionThunk = createAsyncThunk('Engagement/getDELsByPermissionThunk', async (params) => {
  if (engManagement[params.geoCode])
    return await engManagement[params.geoCode].getDELsByPermission(params)
  return response404
})

export const submitDeletedEngagementThunk = createAsyncThunk('Engagement/submitDelThunk', async (params) => {
  if (engManagement[params.geoCode])
    return await engManagement[params.geoCode].submitDeletedEngagement(params)
  return response404
})

export const approveDeletionThunk = createAsyncThunk('Engagement/approveDelThunk', async (params) => {
  if (engManagement[params.geoCode])
    return await engManagement[params.geoCode].approveDeletedEngagement(params)
  return response404
  
})

export const rejectDeletionThunk = createAsyncThunk('Engagement/rejectDelThunk', async (params) => {
  if (engManagement[params.geoCode])
    return await engManagement[params.geoCode].rejectDeletedEngagement(params)
  return response404
})

export const getAllTimeZonesThunk = createAsyncThunk(
  'GroupNameData/getAllTimeZones',
  async (params) => {
    if (GroupNameData[params.geoCode]) {
      const timezones = await GroupNameData[params.geoCode].getAllTimeZones()
      return timezones
    }
    return response404
  }
)

export const getAuthorizedInstitionByEngagementThunk = createAsyncThunk(
  'GroupNameData/getAuthorizedInstitutions',
  async (params) => {
    if (GroupNameData[params.geoCode]) {
      return GroupNameData[params.geoCode].getAuthorizedInstitutions(params)
    }
    return response404
  }
)

export const updateAuthorizedInstitutionsThunk = createAsyncThunk(
  'GroupNameData/updateAuthorizedInstitutionTimeZone',
  async (params) => {
    if (params && params.geoCode && GroupNameData[params.geoCode]) {
      return GroupNameData[params.geoCode].updateAuthorizedInstitutionTimeZone(params)
    }
    return response404
  }
)

export const createScheduleTaskThunk = createAsyncThunk(
  'GroupNameData/createScheduleTask',
  async (params) => {
    if (GroupNameData[params.geoCode]) {
      return GroupNameData[params.geoCode].createScheduleTask(params)
    }
    return response404
  }
)

export const updateScheduleTaskThunk = createAsyncThunk(
  'GroupNameData/updateScheduleTask',
  async (params) => {
    if (GroupNameData[params.geoCode]) {
      return GroupNameData[params.geoCode].updateScheduleTask(params)
    }
    return response404
  }
)

export const getScheduleTasksThunk = createAsyncThunk(
  'GroupNameData/getScheduleTasks',
  async (params) => {
    if (GroupNameData[params.geoCode]) {
      return GroupNameData[params.geoCode].getScheduleTasks(params)
    }
    return response404
  }
)

export const cancelScheduleTasksThunk = createAsyncThunk(
  'GroupNameData/cancelScheduleTasks',
  async (params) => {
    if (GroupNameData[params.geoCode]) {
      return GroupNameData[params.geoCode].cancelScheduleTasks(params)
    }
    return response404
  }
)

/*Transactional Data Management*/
export const getTransactionalDataFiles = createAsyncThunk('engagement/getTransactionalDataFiles', async (params) => {
  if (params && params.geoCode && glData[params.geoCode]) {
    const results = await glData[params.geoCode].getTransactionalDataFiles(params)
    return results
  }
  return response404
})

export const getTransactionalDataFileById = createAsyncThunk('engagement/getTransactionalDataFileById', async (params) => {
  if (params && params.geoCode && glData[params.geoCode]) {
    const results = await glData[params.geoCode].getTransactionalDataFileById(params)
    return results
  }
  return response404
})

export const mergeUploadTransactionDataFileRequest = createAsyncThunk('engagement/mergeUploadTransactionDataFileRequest', async (params) => {
  if (params && params.geoCode && glData[params.geoCode]) {
    const results = await glData[params.geoCode].mergeUploadTransactionDataFileRequest(params)
    return results
  }
  return response404
})

export const uploadTransactionDataFileRequest = createAsyncThunk('engagement/uploadTransactionDataFileRequest', async (params) => {
  if (params && params.geoCode && files[params.geoCode]) {
    const results = await files[params.geoCode].uploadTransactionDataFileRequest(params)
    return results
  }
  return response404
})
/*End Transactional Data Management*/

export const getExtractionStatusThunk = createAsyncThunk(
  'GroupNameData/getExtractionStatus',
  async (params) => {
    if (GroupNameData[params.geoCode]) {
      return GroupNameData[params.geoCode].getExtractionStatus(params)
    }
    return response404
  }
)

export const retryExtractionDataThunk = createAsyncThunk(
  'GroupNameData/retryExtractionData',
  async (params) => {
    if (GroupNameData[params.geoCode]) {
      return GroupNameData[params.geoCode].retryExtractionData(params)
    }
    return response404
  }
)