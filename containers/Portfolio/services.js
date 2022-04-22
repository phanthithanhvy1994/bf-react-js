import { actionType } from './constants'

const statePortfolioReducers = (state, action) => {
  switch (action.type) {
    case actionType.TOGGLE_POPUP:
      return {
        ...state,
        openEngCreation: action.payload
      }
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

export {
  statePortfolioReducers
}