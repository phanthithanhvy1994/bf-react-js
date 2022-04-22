import GLData from './glData'
import { CONFIG_TYPE, ACTION_GLDATA } from './constants'

class FilesAPI extends GLData {
  constructor(geoCode) {
    super(geoCode, CONFIG_TYPE.File)
  }

  async uploadTransactionDataFileRequest(payload) {
    const accessToken = await this.getAccessToken()
    return await this.adapter.uploadFileWithToken(
      `${ACTION_GLDATA.uploadTransactionDataFilePart}`,
      payload,
      accessToken
    )
  }
}

export default FilesAPI
