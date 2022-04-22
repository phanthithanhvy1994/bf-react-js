import { engManagement, GroupNameData } from 'src/config/apiUrl/index'
import { reponse404 } from 'src/config'

export const getIsAuthorizedTimezoneSelected = async (payload) => {
  if (GroupNameData[payload.geoCode])
    return await GroupNameData[payload.geoCode].getIsAuthorizedTimezoneSelected(payload)
  return reponse404
}

export const handleLockingObject = async (payload) => {
    if (engManagement[payload.geoCode])
      return await engManagement[payload.geoCode].handleLockingObject(payload)
    return reponse404
  }

export const unlockObject = async (payload) => {
  if (engManagement[payload.geoCode])
    return await engManagement[payload.geoCode].unlockObject(payload)
  return reponse404
}
