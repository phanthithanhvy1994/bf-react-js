import { GroupNameData } from 'src/config/apiUrl/index'
import { response404 } from 'src/config'

import { actionType } from './constants'

const stateResendRequestReducers = (state, action) => {
  switch (action.type) {
    case actionType.SET_CURRENT_STEP:
      return {
        ...state,
        currentStep: action.payload
      }
    case actionType.SET_CURRENT_DATA:
      return {
        ...state,
        currentData: { ...state.currentData, ...action.payload }
      }
    case actionType.SET_INIT_DATA:
      return {
        ...state,
        currentData: action.payload
      }
  }
}

const getAuthorizationRequest = async (payload) => {
  if (GroupNameData[payload.geoCode])
    return await GroupNameData[payload.geoCode].getAuthorizationRequest(payload)
  return response404
}

export {
  stateResendRequestReducers,
  getAuthorizationRequest
}
