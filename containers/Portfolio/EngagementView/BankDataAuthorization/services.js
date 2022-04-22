import { GroupNameData } from 'src/config/apiUrl/index'
import { response404 } from 'src/config'

export const deleteAuthorizationRequest = async (payload) => {
  if (GroupNameData[payload.geoCode])
    return await GroupNameData[payload.geoCode].deleteAuthorizationRequest(payload)
  return response404
}

export const getListBDA = async (params) => {
  if (GroupNameData[params.geoCode])
    return await GroupNameData[params.geoCode].getListBDA(params)
  return response404
}

export const resendAuthorizationRequest = async (payload) => {
  if (GroupNameData[payload.geoCode])
    return await GroupNameData[payload.geoCode].resendAuthorizationRequest(payload)
  return response404
}

export const getLimitResend = async (payload) => {
  if (GroupNameData[payload.geoCode])
    return await GroupNameData[payload.geoCode].getLimitResend(payload)
  return response404
}
