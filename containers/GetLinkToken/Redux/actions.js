import { GroupNameData } from 'src/config/apiUrl/index'
import { response404 } from 'src/config'

export const generateLinkToken = async (params) => {
  if (GroupNameData[params.geoCode]) 
    return await GroupNameData[params.geoCode].generateLinkToken(params)
  return response404
}

export const verifyLinkConnect = async (params) => {
  if (GroupNameData[params.geoCode]) 
    return await GroupNameData[params.geoCode].verifyLinkConnect(params)
  return response404
}

export const saveConsent = async (params) => {
  if (GroupNameData[params.geoCode])
    return await GroupNameData[params.geoCode].saveConsent(params)
  return response404
}