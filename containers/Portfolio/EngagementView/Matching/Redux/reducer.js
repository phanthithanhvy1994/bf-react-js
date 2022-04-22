import { createSlice } from '@reduxjs/toolkit'
import { getInfoMatchingThunk, cancelMatchingThunk } from './thunks'

export const matchingSlice = createSlice({
  name: 'matching',
  initialState: {
    infoDataMatching: {}
  },
  extraReducers: {
    [getInfoMatchingThunk.fulfilled]: (state, { payload }) => {
      if (payload && payload.result) {
        state.infoDataMatching = _.get(payload, 'result.data', {})
      }
    },
    [cancelMatchingThunk.fulfilled]: (state, { payload }) => {
      if (payload && payload.result) {
        state.infoDataMatching = _.get(payload, 'result.data', {})
      }
    }
  }
})

const { reducer } = matchingSlice
export default reducer