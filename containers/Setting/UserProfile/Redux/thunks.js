import { createAsyncThunk } from '@reduxjs/toolkit'

import { engManagement } from 'src/config/apiUrl/index'
import { showToastMessage, hideLoading, showLoading } from 'src/containers/Common/actions'
import { configToastify, geoFromOpm, response404 } from 'src/config'
import { userSettingsMessages } from 'src/containers/Setting/UserProfile/constants'

export const getUserSettingThunk = createAsyncThunk('UserSettings/GetUserSettings', async (params, thunkAPI) => {
  thunkAPI.dispatch(showLoading())
  let response = {}
  if (engManagement[geoFromOpm()]) {
    response = await engManagement[geoFromOpm()].getUserSettings(params)
  }
  else {
    response = response404
  } 
  thunkAPI.dispatch(hideLoading())
  return response
})

export const saveUserSettingThunk = createAsyncThunk('UserSettings/UpdateUserSettings', async (params, thunkAPI) => {
  let saveUserSettings = {}
  if (engManagement[params.geoCode])
    saveUserSettings = await engManagement[params.geoCode].saveUserSettings(params)
  else saveUserSettings = response404

  if (saveUserSettings.result.statusCode != 404 && saveUserSettings.result.data.status.code !== 'success') {
    configToastify.message = userSettingsMessages[saveUserSettings.result.data.status.msg]
  }
  else 
    configToastify.message= userSettingsMessages.saved
  thunkAPI.dispatch(showToastMessage(configToastify))
  return saveUserSettings
})

