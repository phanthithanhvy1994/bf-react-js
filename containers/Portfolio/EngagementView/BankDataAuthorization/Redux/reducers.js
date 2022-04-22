import { createSlice } from '@reduxjs/toolkit'
import { getPlatformCountriesThunk } from './thunks'

export const bdaSlice = createSlice({
  name: 'bda',
  initialState: {
    platformCountries: []
  },
  extraReducers: {
    [getPlatformCountriesThunk.fulfilled]: (state, { payload }) => {
      if (payload && payload.result) {
        state.platformCountries = payload.result.data
      }
    },
  }
})

const { reducer } = bdaSlice
export default reducer
