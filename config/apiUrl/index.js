import EngManagementApi from './engManagement'
import OpmApi from './opm'
import GraphApi from './graph'
import GroupNameDataApi from './GroupNameData'
import GLDataApi from './glData'
import FilesAPI from './Files'
import MatchingApi from './matching'
import { geoSupports } from 'src/config'

const funcCallAPI = (params) => {
  let result = {}
  _.forEach(geoSupports, function (key) {
    result[key] =  new params(key)
  })
  return result
}

const opm = new OpmApi()
const graph = GraphApi()
const engManagement = funcCallAPI(EngManagementApi)
const GroupNameData = funcCallAPI(GroupNameDataApi)
const glData = funcCallAPI(GLDataApi)
const files = funcCallAPI(FilesAPI)
const matching = funcCallAPI(MatchingApi)

export {
  engManagement,
  opm,
  GroupNameData,
  graph,
  glData,
  files,
  matching
}
