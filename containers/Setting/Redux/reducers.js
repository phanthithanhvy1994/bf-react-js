import { combineReducers } from '@reduxjs/toolkit'

import accountReducer from '../UserProfile/Redux/reducers'

export default combineReducers({
  account: accountReducer
})