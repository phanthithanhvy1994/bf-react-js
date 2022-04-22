import { opm, graph, engManagement } from 'src/config/apiUrl/index'

export const getGlobalEmployeesByKeyword = async (payload) => {
  return await opm.getGlobalEmployeesByKeyword(payload)
}

export const getAADInfoByEmail = async (payload) => {
  return await graph.getAADInfoByEmail(payload)
}

export const getAllRoleEngagement = async (params) => {
  if (engManagement[params.geoCode])
    return await engManagement[params.geoCode].getAllRoleEngagement(params)
  return reponse404
}

export const createUpdateTeamMember = async (params) => {
  if (engManagement[params.geoCode])
    return await engManagement[params.geoCode].createUpdateTeamMember(params)
  return reponse404
}
