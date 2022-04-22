import { matching } from 'src/config/apiUrl/index'
import { response404 } from 'src/config'

export const postStartMatchingProcess = async (params) => {
  if (matching[params.geoCode]) {
    return await matching[params.geoCode].postStartMatchingProcess(params)
  }
  return response404
}