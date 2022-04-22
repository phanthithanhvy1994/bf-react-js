import { getUserSettingThunk, saveUserSettingThunk } from './Redux'

export const getUserProfileWithThunk = (dispatch) => {
  dispatch(getUserSettingThunk())
}

export const saveUserProfileWithThunk = (dispatch, payload) => {
  dispatch(saveUserSettingThunk(payload))
}

