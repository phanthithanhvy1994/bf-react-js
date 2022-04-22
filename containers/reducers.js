
import { combineReducers } from '@reduxjs/toolkit'
import { connectRouter } from 'connected-react-router'

import accountReducer from './Setting/UserProfile/Redux/reducers'
import commonReducer from './Common/reducers'
import engagementReducer from './Portfolio/Redux/reducers'
import bdaReducer from './Portfolio/EngagementView/GroupNameDataAuthorization/Redux/reducers'
import matchingReducer from './Portfolio/EngagementView/Matching/Redux/reducer'

export default function createRootReducer(history) {
  const createRootReducer = combineReducers({
    router: connectRouter(history),
    account: accountReducer,
    common: commonReducer,
    engagement: engagementReducer,
    bda: bdaReducer,
    matching: matchingReducer
  })

  return createRootReducer
}
