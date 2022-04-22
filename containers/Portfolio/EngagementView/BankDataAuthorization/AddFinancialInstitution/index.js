import React, { useState, useEffect } from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useIntl } from 'react-intl'

import { Image } from 'src/components'
import addIcon from 'src/assets/icons/svgs/add_icon.svg'
import { platformCountriesSelector } from 'src/containers/Portfolio/EngagementView/GroupNameDataAuthorization/Redux'
import { DropdownInput, CheckboxControl, MultipleSelectSearch} from 'src/components'
import { REQUEST_MODEL } from 'src/config/constants'
import { appSettings } from 'src/config'

import { AddFinancialInstitutionMes, OPTIONS_LIMIT } from './constants'
import messages from './messages'
import { getInstitutions } from './services'
import { validationForm } from './validationForm'
import { MODE } from '../constants'

const AddFinancialInstitution = (props) => {
  const { mode } = props
  const { engagementId, geoCode, containerCode } = useParams()
  const { control, getValues, watch, setValue } = useFormContext()
  const { formatMessage } = useIntl()
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'listFinancialInstitution'
  })
  const [disableAdd, setDisableAdd] = useState(false)
  const { listFinancialInstitution, listRequestPendingAuthorize, listRequestAuthorized } = getValues()
  const listIdsInstitutionCreated = (listRequestPendingAuthorize || []).concat(listRequestAuthorized || [])?.map(institution => institution.authorizeCheck.value) || []
  const platformCountries = useSelector(platformCountriesSelector)
  const countryOptions = _.map(_.sortBy(platformCountries, ['name']), (v) => {
    const isDisabledCountry = listFinancialInstitution?.some(item => item.country === v.id && !_.isEmpty(item.institution))
    return {
      value: v.id,
      text: v.name,
      key: v.id,
      disabled: isDisabledCountry
    }
  })

  const appendFinancialObj =  mode === MODE.CREATE ? { country: '', institution: [] } : { country: '', institution: [], checkNewInstitution: false }

  useEffect(() => {
    const { listFinancialInstitution } = watch()

    if (_.isEmpty(listFinancialInstitution)) return

    const countryOptionsActive = countryOptions.filter(country => !country.disabled)

    if (listFinancialInstitution[listFinancialInstitution.length - 1]?.country &&
      listFinancialInstitution[listFinancialInstitution.length - 1]?.institution.length > 0 &&
      !_.isEmpty(countryOptionsActive)) {
      setDisableAdd(false)
    } else {
      setDisableAdd(true)
    }
  }, [watch])

  useEffect(() => {
    if (!fields.length && mode === MODE.CREATE) {
      append(appendFinancialObj)
    }
  }, [fields])

  const handleSearchChange = async (value, index) => {
    const { listFinancialInstitution } = getValues()
    const platformCountryId = listFinancialInstitution[index].country

    if (!platformCountryId) return []

    const query = {
      platformCountryId,
      name: value,
      count: appSettings.limitSearchInstitution
    }
    const model = REQUEST_MODEL
    model.query = query
    model.uri = { engagementId, containerCode }
    model.geoCode = geoCode
    const res = await getInstitutions(model)
    const { result: { data } } = res
    if (data?.length < 1) return []

    const institutions = _.map(data, (institution) => {
      const isDisable = listIdsInstitutionCreated?.includes(institution.id)
      return {
        value: institution.id,
        title: institution.name,
        key: institution.id,
        disabled: isDisable
      }
    })

    return institutions
  }

  const handleCountryChange = (index) => {
    setValue(`listFinancialInstitution[${index}].institution`, [])
  }

  return (
    <>
      {fields.map((field, index) => (
        <div key={field.id} className='financial-institutions__another-institution'>
          {mode !== MODE.CREATE && <div className='financial-institutions__another-institution--control-checkbox'>
            <CheckboxControl
              label={formatMessage(messages.newFinancialInstitution)}
              name={`listFinancialInstitution[${index}].checkNewInstitution`}
              checked={field?.checkNewInstitution?.checked}
            />
          </div>}
          {mode === MODE.CREATE && <h4 className='financial-institutions-title'>{formatMessage(messages.selectFinancial)}</h4>}
          <div className='default-dropdown financial-institutions__another-institution--control'>
            <label>{AddFinancialInstitutionMes.country}</label>
            <DropdownInput
              name={`listFinancialInstitution[${index}].country`}
              options={countryOptions}
              disabled={fields.length > index + 1}
              onChange={() => handleCountryChange(index)}
              defaultValue={field.country}
              validationForm={validationForm.country}
            />
          </div>
          <div className='default-dropdown financial-institutions__another-institution--control'>
            <label>{AddFinancialInstitutionMes.financialInstitution}</label>
            <MultipleSelectSearch
              name={`listFinancialInstitution[${index}].institution`}
              handleSearchChange={(value) => handleSearchChange(value, index)}
              resetResultDependField={watch(`listFinancialInstitution[${index}].country`)}
              defaultValue={field.institution}
              validationForm={validationForm.institution}
              optionsLimit={OPTIONS_LIMIT}
              removePreviousCountry={() => remove(index)}
            />
          </div>
        </div>
      ))}
      <div className='financial-institutions__add-institutions-btn' onClick={() => disableAdd ? null : append(appendFinancialObj)}>
        <Image src={addIcon} />
        {mode !== MODE.CREATE && AddFinancialInstitutionMes.addAnotherFinancialInstitution}
        {mode === MODE.CREATE && AddFinancialInstitutionMes.addAnotherCountry}
      </div>
    </>)
}


export default AddFinancialInstitution
