import { createSlice } from '@reduxjs/toolkit'
import { getUserSettingThunk, saveUserSettingThunk } from './thunks'
import { getOPMContainerMapping, checkOrCreateNewUser } from '../../Redux/thunks'

export const accountSlice = createSlice({
  name: 'account',
  initialState: {
    currentUser: {},
    opmMappingContainer: [],
    isLoadAfterLoginStatus: false
  },
  reducers: {},
  extraReducers: {
    [getUserSettingThunk.fulfilled]: (state, { payload }) => {
      const user = _.get(payload, 'result.data.user')
      if (!_.isNil(user)) {
        const currentUser = _.get(payload, 'result.data')
        currentUser.user.fullName = `${_.get(currentUser, 'user.firstName', '')} ${_.get(currentUser, 'user.lastName', '')}`
        state.currentUser = currentUser
      }
    },
    [getOPMContainerMapping.fulfilled]: (state, { payload }) => {
      if (payload && payload.result) {
        state.opmMappingContainer = payload.result
        localStorage.setItem('geoFromOpm', payload.result.length > 0? payload.result[0].geoCode : '')
      }
    },
    [saveUserSettingThunk.fulfilled]: (state, { payload }) => {
      const user = _.get(payload, 'result.data.user')
      if (!_.isNil(user)) {
        const currentUser = _.get(payload, 'result.data')
        currentUser.user.fullName = `${_.get(currentUser, 'user.firstName', '')} ${_.get(currentUser, 'user.lastName', '')}`
        state.currentUser = currentUser
        user.cultureInfo && window.localize.setCultureInfo(user.cultureInfo)
      }
    },
    [checkOrCreateNewUser.fulfilled]: (state, { payload }) => {
      const user = _.get(payload, 'result.data.user')
      if (!_.isNil(user)) {
        state.isLoadAfterLoginStatus = true
        user.language && localStorage.setItem('language', user.language)
        user.locale && localStorage.setItem('locale', user.locale)
        user.cultureInfo && window.localize.setCultureInfo(user.cultureInfo)
      }
    }
  }
})

const { reducer } = accountSlice
export default reducer
