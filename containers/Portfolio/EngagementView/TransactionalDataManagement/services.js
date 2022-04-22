import { glData } from 'src/config/apiUrl/index'
import { response404 } from 'src/config'

export const cancelUploadTransactionDataFileRequest = async (params) => {
  if (params && params.geoCode && glData[params.geoCode]) {
    const results = await glData[params.geoCode].cancelUploadTransactionDataFileRequest(params)
    return results
  }
  return response404
}

export const getTransactionalDataDetails = async (params) => {
  if (params && params.geoCode && glData[params.geoCode])
    return await glData[params.geoCode].getTransactionalDataDetails(params)
  return response404
}

export const getTransactionalDataFileTemplate = async (params) => {
  if (params && params.geoCode && glData[params.geoCode])
    return await glData[params.geoCode].getTransactionalDataFileTemplate(params)
  return response404
}

export const getTransactionalDataFileError = async (params) => {
  if (params && params.geoCode && glData[params.geoCode])
    return await glData[params.geoCode].getTransactionalDataFileError(params)
  return response404
}

export const disablePreviousUploadedTransactionalData = async (params) => {
  if (params && params.geoCode && glData[params.geoCode])
    return await glData[params.geoCode].disablePreviousUploadedTransactionalData(params)
  return response404
}

export const checkMatchingRunning = async (params) => {
  if (params && params.geoCode && glData[params.geoCode])
    return await glData[params.geoCode].checkMatchingRunning(params)
  return response404
}