import { createAsyncThunk } from '@reduxjs/toolkit'
import { opm, engManagement } from 'src/config/apiUrl/index'
import { response404 } from 'src/config'

export const getOPMContainerMapping = createAsyncThunk('opm/getContainerMappingByEmail', async (payload) => {
  return await opm.getContainerMappingByEmail(payload)
})

export const checkOrCreateNewUser = createAsyncThunk('UserSettings/checkOrCreateNewUser', async (payload) => {
  if (engManagement[payload.geoCode])
    return await engManagement[payload.geoCode].updateUserLanguageAndLocale(payload)
  return response404
})

export const getCultureInfo = createAsyncThunk('UserSettings/getCultureInfo', async (payload) => {
  if (engManagement[payload.geoCode])
    return await engManagement[payload.geoCode].getCultureInfo(payload)
  return response404
})
