import { GroupNameData } from 'src/config/apiUrl/index'
import { response404 } from 'src/config'

export const getInstitutions = async (payload) => {
  if (GroupNameData[payload.geoCode])
    return await GroupNameData[payload.geoCode].getInstitutions(payload)
  return response404
}
