import { engManagement } from 'src/config/apiUrl/index'
import { response404 } from 'src/config'

export const getTeamMgmtListService = async (params) => {
  if (engManagement[params.geoCode]) {
    const result = await engManagement[params.geoCode].getListTeamManagement(params)
    return result
  }
  return response404
}
