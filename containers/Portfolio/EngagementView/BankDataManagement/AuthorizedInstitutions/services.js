import { GroupNameData } from 'src/config/apiUrl/index'
import { response404 } from 'src/config'

export const reAuthenticate = async (payload) => {
  if (GroupNameData[payload.geoCode])
    return await GroupNameData[payload.geoCode].reAuthenticate(payload)
  return response404
}