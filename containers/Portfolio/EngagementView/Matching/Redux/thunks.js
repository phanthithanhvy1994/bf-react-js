import { createAsyncThunk } from '@reduxjs/toolkit'

import { matching } from 'src/config/apiUrl/index'
import { response404 } from 'src/config'

export const getInfoMatchingThunk = createAsyncThunk('matching', async (params) => {
  if (matching[params.geoCode]){
    return await matching[params.geoCode].getInfoMatching(params)}
  return response404
})

export const cancelMatchingThunk = createAsyncThunk('cancelMatching', async (params) => {
  if (matching[params.geoCode]){
    return await matching[params.geoCode].cancelMatching(params)}
  return response404
})