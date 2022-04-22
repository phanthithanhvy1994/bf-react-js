import { GroupNameData } from 'src/config/apiUrl/index'
import { response404 } from 'src/config'

import { actionType } from './constants'

const stateCreateRequestReducers = (state, action) => {
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

const sendAuthorizationRequest = async (payload) => {
  if (GroupNameData[payload.geoCode]) {
    return await GroupNameData[payload.geoCode].sendAuthorizationRequest(payload)
  }
  return response404
}

export {
  stateCreateRequestReducers,
  sendAuthorizationRequest
}