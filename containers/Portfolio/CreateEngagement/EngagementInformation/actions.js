import { engManagement } from 'src/config/apiUrl/index'
import { geoFromOpm, response404 } from 'src/config'

export const createEngagement = async (payload) => {
  if (engManagement[geoFromOpm()])
    return await engManagement[geoFromOpm()].createEngagement(payload)
  return response404
}
