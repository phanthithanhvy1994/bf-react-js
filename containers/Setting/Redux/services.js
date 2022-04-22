import { unwrapResult } from '@reduxjs/toolkit'
import { opm } from 'src/config/apiUrl'
import { REQUEST_MODEL } from 'src/config/constants'
import { getOPMContainerMapping, checkOrCreateNewUser } from 'src/containers/Setting/Redux'
import { geoSupports } from 'src/config'

export const checkOrCreateNewUserServices = async (dispatch, upn) => {

  const { resultGetGlobalEmployee, result } = await callGetOPMContainerMapping(dispatch, upn)
  if (resultGetGlobalEmployee && resultGetGlobalEmployee.length > 0 && result && result.length > 0) {
    const userFromOPM = resultGetGlobalEmployee[0]
    const payload = {
      isUpdateLanguageAndLocale: _.isNil(localStorage.getItem('language')) || _.isNil(localStorage.getItem('locale')),
      locale: window.localize.getBrowserLocale() || window.localize.defaultLocale,
      language: window.localize.defaultLanguage,
      email: upn,
      opmInfo: {
        firstName: userFromOPM.firstName,
        lastName: userFromOPM.lastName,
        jobTitle: userFromOPM.jobTitle,
        countryCode: userFromOPM.countryCode,
        countryDesc: userFromOPM.countryDesc,
        officeCode: userFromOPM.officeCode,
        officeDesc: userFromOPM.officeDesc,
        organizationCode: userFromOPM.organizationCode,
        organizationDesc: userFromOPM.organizationDesc,
        workphone: userFromOPM.workPhone
      }
    }

    const model = REQUEST_MODEL
    model.payload = payload
    _.forEach(geoSupports, function (geoCode) {
      model.geoCode = geoCode
      dispatch(checkOrCreateNewUser(model))
    })
  }
}

export const callGetOPMContainerMapping = async (dispatch, upn) => {
  const accessToken = await opm.getAccessToken()
  if (accessToken) {
    const { result } = await opm.getGlobalEmployeeByEmailIds([upn], accessToken)
    const resultGetGlobalEmployee = _.clone(result)

    if (resultGetGlobalEmployee && resultGetGlobalEmployee.length > 0) {
      const { result } = unwrapResult(await dispatch(getOPMContainerMapping({ globalPersonUid: resultGetGlobalEmployee[0].globalPersonUid, accessToken })));
      return { resultGetGlobalEmployee, result }
    }
  }
}
