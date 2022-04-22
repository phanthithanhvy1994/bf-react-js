import { createAsyncThunk } from '@reduxjs/toolkit'

import { engManagement } from 'src/config/apiUrl/index'
import { geoFromOpm, response404 } from 'src/config'

export const getEntitiesThunk = createAsyncThunk('engagementInfo/getEntities', async (params) => {
  if (engManagement[geoFromOpm()])
    return await engManagement[geoFromOpm()].getEntities(params)
  return response404
})
