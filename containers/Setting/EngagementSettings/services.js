import { createAction } from '@reduxjs/toolkit'

import { engManagement } from 'src/config/apiUrl/index'
import { response404 } from 'src/config'

export const updateListEngagements = createAction(
  'engagement/updateListEngagements',
)

export const updateEngagementById = createAction(
  'engagement/updateEngagementById',
)

export const getEngagementCountries = async (params) => {
  if (engManagement[params.geoCode])
    return await engManagement[params.geoCode].getEngagementCountries(params)
  return response404
}

export const updateEngagementSetting = async (params) => {
  if (engManagement[params.geoCode])
    return await engManagement[params.geoCode].updateEngagementSetting(params)
  return response404
}

export const updateEnableMatching = async (params) => {
  if (engManagement[params.geoCode])
    return await engManagement[params.geoCode].updateEnableMatching(params)
  return response404
}