import React, { useEffect, useState, useContext } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useParams, Prompt } from 'react-router-dom'
import { useIntl } from 'react-intl'
import AppContext from 'src/context'
import { configToastify, routes } from 'src/config'
import { showToastMessage } from 'src/containers/Common/actions'
import { Header, Form, Button, DropdownInput, DatePicker, LimitCounter, Checkbox} from 'src/components'
import { updateEngagementById, updateCurrentEngagement } from 'src/containers/Portfolio/Redux'
import { REQUEST_MODEL } from 'src/config/constants'
import { typePrompt } from 'src/containers/Common/Components/CustomPromptConfirm/constants'
import { engagementSettingsMessages, countries, showPromptUrls } from './constants'
import { validationForm } from './validationForm'
import { openErrorModal, openModal, closeModal } from 'src/containers/Common/actions'
import { getEngagementCountries, updateEngagementSetting, updateEnableMatching } from './services'

const engagementSettingsModel = {
  engagementName: '',
  periodEndDate: null,
  country: '',
  entityName: '',
  entityChargeCode: '',
}

const SettingForm = (props) => {
  const intl = useIntl()
  const dispatch = useDispatch()
  const { geoCode, containerCode, engagementId } = useParams()
  const [engagementCountries, setEngagementCountries] = useState([])
  const [isOnMatching, setIsOnMatching] = useState(localStorage.getItem(`isOnMatching-${engagementId}`) === 'true')
  const { engagementSetting, isEngagementOwner } = props
  const countryOptions = engagementCountries?.map(country => {
    return {
      text: country.name,
      value: country.id
    }
  }) || []
  const formMethods = useForm({
    mode: 'all',
    defaultValues: engagementSettingsModel
  })
  const { formState, handleSubmit, reset } = formMethods
  const { setSubmitCB } = useContext(AppContext)
  const { isDirty, isValid } = formState

  const tooltipElement = document.querySelector('.settings-form__title span')
  useEffect(() => {
    if (tooltipElement) {
      tooltipElement.addEventListener('contextmenu', (e) => e.preventDefault())
      return () => {
        tooltipElement.removeEventListener('contextmenu', (e) => e.preventDefault())
      }
    }
  }, [tooltipElement])

  useEffect(async () => {
    const getEngagementCountriesModel = REQUEST_MODEL
    getEngagementCountriesModel.uri = { containerCode, engagementId }
    getEngagementCountriesModel.geoCode = geoCode
    const countriesResult = await getEngagementCountries(getEngagementCountriesModel)
    const { result: { data } } = countriesResult

    if (!_.isEmpty(data)) {
      setEngagementCountries(data)
    } 
  }, [])

  useEffect(() => {
    if (!_.isEmpty(engagementSetting) && !_.isEmpty(engagementCountries)) {
      const values = {
        engagementName: engagementSetting?.name,
        periodEndDate: new Date(engagementSetting?.periodEndDate),
        country: engagementCountries?.find(country => country.id === engagementSetting?.countryId)?.id,
        entityName: engagementSetting?.entity?.name,
        entityChargeCode: engagementSetting?.chargeCode
      }

      reset(values)
    }
  }, [engagementSetting, engagementCountries.length])

  const getCountryCode = (idCountry) => {
    const countrySelected = engagementCountries.find(country => country.id === idCountry)

    return countries.find(country => country.id === countrySelected?.inkId)?.code
  }

  const onSubmit = async (formData) => {
    let { engagementName, periodEndDate, country, entityName, entityChargeCode } = formData
    periodEndDate = window.localize.toFullUtcDateString(periodEndDate)

    const payload = {
      engagement: {
        attributes: {
          name: engagementName,
          countryId: country,
          countryCode: getCountryCode(country),
          entity: entityName,
          chargeCode: entityChargeCode,
          periodEndDate,
          containerCode,
          geoCode
        }
      }
    }

    const model = REQUEST_MODEL
    model.uri = { engagementId, containerCode }
    model.payload = payload
    model.geoCode = geoCode
    const { result: { statusCode, data } } = await updateEngagementSetting(model)
    
    if (statusCode === 200) {
      configToastify.message = engagementSettingsMessages.saved
      dispatch(showToastMessage(configToastify))
      dispatch(updateEngagementById(data))

      const values = {
        engagementName,
        periodEndDate: new Date(periodEndDate),
        country,
        entityName,
        entityChargeCode
      }
      
      const currentEng = {
        ...engagementSetting,
        name:  engagementName,
        periodEndDate: new Date(periodEndDate),
        countryId: country,
        entity: { name: entityName },
        chargeCode: entityChargeCode
      }

      dispatch(updateCurrentEngagement(currentEng))

      reset(values)
    }
    else if (statusCode === 403){
      dispatch(openErrorModal({content: engagementSettingsMessages.sendErrorByEngagementDeleted}))
    }
    else {
      dispatch(openErrorModal({content: engagementSettingsMessages.contentErrorModal}))
    }
  }

  const iterateMenuHierarchy = (hierarchy, allowUrls) => {
    for (let key in hierarchy) {
      if (hierarchy.hasOwnProperty(key)) {
        if (_.isObject(hierarchy[key])) {
          iterateMenuHierarchy(hierarchy[key], allowUrls)
        } else {
          allowUrls.push(hierarchy[key].replace(':engagementId', engagementId)
                                            .replace(':geoCode', geoCode)
                                            .replace(':containerCode', containerCode))
        }
      }
    }
  }

  const getAllowUrlsEngagementView = () => {
    const allowUrls = []
    const { engagementView } = routes.portfolio
    iterateMenuHierarchy(engagementView, allowUrls)
    return allowUrls
  }

  const setConfigRedirect = (path) => {
    const allowUrlsEGM = getAllowUrlsEngagementView()
    let promptUrls = [...showPromptUrls,...allowUrlsEGM]
    const existUrl = promptUrls.find(url => url == path)
    if (existUrl) return true
    return false
  }
  
  const renderMessage = (path) => {
    setSubmitCB(prevState => handleSubmit(onSubmit))
    let typeData = typePrompt.confirm
    if(isValid === false){
      typeData = typePrompt.warning
    }
    const warningData = {
      typeData,
      config: setConfigRedirect(path)
    }
    return JSON.stringify(warningData)
  }

  const handleShowTurnOnMatchingIButton = (e) => {
    if (e.nativeEvent.which === 3 && e.nativeEvent.detail === 5) {
      localStorage.setItem(`isOnMatching-${engagementId}`, true)
      setIsOnMatching(true)
    }
  }

  const handleChange = async (e, { checked }) => {
    const isEnableMatching = !!checked
    const payload = {
      isEnableMatching
    }
    const model = REQUEST_MODEL
    model.uri = { engagementId, containerCode }
    model.payload = payload
    model.geoCode = geoCode
    const currentEng = {
      ...engagementSetting,
      isEnableMatching
    }
    if (isEnableMatching) {
      const res = await updateEnableMatching(model)
      if (_.get(res, 'result.statusCode') !== 200) location.reload()
      dispatch(updateCurrentEngagement(currentEng))
    } else {
      dispatch(openModal({
        className: 'matching-warning-modal',
        header: {
          content: intl.formatMessage(engagementSettingsMessages.matchingHeaderWarning)
        },
        body: {
          content: intl.formatMessage(engagementSettingsMessages.matchingContentWarning)
        },
        leftBtn: {
          listBtn: [{
            className: 'secondary-btn',
            label: intl.formatMessage(engagementSettingsMessages.cancel),
            onClick: () => {
              e.stopPropagation()
              dispatch(closeModal())
            }
          }]
        },
        rightBtn: {
          listBtn: [{
            className: 'primary-btn',
            label: intl.formatMessage(engagementSettingsMessages.yes),
            onClick: () => {
              handleTurnOffMatching(model, currentEng)
            }
          }]
        }
      }))
    }
  }

  const handleTurnOffMatching = async (model, currentEng) => {
    const res = await updateEnableMatching(model)
    if (_.get(res, 'result.statusCode') !== 200) location.reload()
    localStorage.setItem(`isOnMatching-${engagementId}`, false)
    setIsOnMatching(false)
    dispatch(updateCurrentEngagement(currentEng))
    dispatch(closeModal())
  }

  return (
    <div className='primary-card settings-form__wrapper'>
      <FormProvider {...formMethods} >
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Prompt
            when={formState.isDirty}
            message={location => renderMessage(location.pathname)} />
          <div className='primary-card__header settings-form__header'>
            <Header as='h3'>{engagementSettingsMessages.engagementSettings}</Header>
            <Header as='h4'>{engagementSettingsMessages.settingFormGuideText}</Header>
          </div>
          <div className='primary-card__content settings-form__content'>
            <div className='content-wrapper'>
              {
                isEngagementOwner && isOnMatching && (
                  <div className='enable-matching-feature-box'>
                    <label>{engagementSettingsMessages.matchingFeature}</label>
                    <Checkbox toggle onChange={(e, data) => handleChange(e, data)} checked={engagementSetting.isEnableMatching} />
                  </div>
                )
              }
              <Header as='h4' className='settings-form__title'><span onMouseUp={handleShowTurnOnMatchingIButton}>{engagementSettingsMessages.engagementDetails}</span></Header>
              <div className='settings-form__input'>
                <label>{engagementSettingsMessages.engagementName}</label>
                <LimitCounter name='engagementName' validationForm={validationForm.engagementName} />
              </div>
              <div className='settings-form__input settings-form--input-width-70'>
                <label>{engagementSettingsMessages.periodEndDate}</label>
                <DatePicker name='periodEndDate' validationForm={validationForm.periodEndDate} />
              </div>
              <div className='settings-form__input default-dropdown settings-form--input-width-70'>
                <label>{engagementSettingsMessages.country}</label>
                <DropdownInput name='country' options={countryOptions} validationForm={validationForm.country} />
              </div>
              <Header as='h4' className='settings-form__title'>{engagementSettingsMessages.entityDetails}</Header>
              <div className='settings-form__input'>
                <label>{engagementSettingsMessages.entityName}</label>
                <LimitCounter name='entityName' validationForm={validationForm.entityName} />
              </div>
              <div className='settings-form__input'>
                <label>{engagementSettingsMessages.entityChargeCode}</label>
                <LimitCounter name='entityChargeCode' validationForm={validationForm.entityChargeCode} />
              </div>
              <Button className='primary-btn' type='submit' disabled={!formState.isValid || !formState.isDirty}>{engagementSettingsMessages.saveChanges}</Button>
            </div>
          </div>
        </Form>
      </FormProvider>
    </div>
  )
}

export default SettingForm