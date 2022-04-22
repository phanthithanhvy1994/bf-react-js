import { createAsyncThunk } from '@reduxjs/toolkit'

import { GroupNameData } from 'src/config/apiUrl/index'
import { response404 } from 'src/config'

export const getPlatformCountriesThunk = createAsyncThunk('bda/getPlatformCountries', async (params) => {

  if (GroupNameData[params.geoCode])
    return await GroupNameData[params.geoCode].getPlatformCountries(params)
  return response404
})
