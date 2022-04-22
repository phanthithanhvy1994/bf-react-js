import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import { useForm, FormProvider } from 'react-hook-form'
import { FormattedMessage } from 'react-intl'
import { Grid } from 'semantic-ui-react'

import { Button, Form, Image, AdditionsDropdown, DropdownInput, DatePicker, LimitCounter } from 'src/components'
import { updateListEngagements } from 'src/containers/Portfolio/Redux'
import { openErrorModal } from 'src/containers/common/actions'
import { showLoading, hideLoading } from 'src/containers/Common/actions'
import CloseIcon from 'src/assets/icons/svgs/close.svg'
import { containersSelector } from 'src/containers/Setting/UserProfile/Redux'

import messages from './messages'
import { validationForm } from './validationForm'
import { getEntitiesThunk } from './Redux/thunks'
import { engagementTypes, engagementTypeSrc, countries, countrySrc, languages } from './constants'
import { createEngagement } from './actions'
import { REQUEST_MODEL } from 'src/config/constants'
import { geoFromOpm } from 'src/config'
import './styles.scss'

const EngagementInformation = (props) => {
  const { onBack, currentData, onClose } = props
  const engagementCreationModel = {
    engagementName: _.get(currentData, 'engagementName', ''),
    engagementType: _.get(currentData, 'engagementType', ''),
    periodEndDate: _.get(currentData, 'periodEndDate', ''),
    country: _.get(currentData, 'country', ''),
    entityName: _.get(currentData, 'entityName', ''),
    entityChargeCode: _.get(currentData, 'entityChargeCode', ''),
  }

  const dispatch = useDispatch()
  const [entityNames, setEntityNames] = useState([])
  const [isSubmit, setIsSubmit] = useState(false)
  const containers = useSelector(containersSelector)

  const methods = useForm({
    mode: 'all',
    defaultValues: engagementCreationModel
  })

  const { trigger } = methods
  const { formState: { isValid } } = methods

  useEffect(() => {
    if(!_.isEmpty(currentData))
    {
      _.forEach(engagementCreationModel, function(value, key) {
        if(!_.isEmpty(value)) {
          trigger(key)
        }
      })
    }
  }, [currentData])

  const getInfo = async () => {
    const container = _.get(currentData, 'container', '')
    if (container) {
      const model = REQUEST_MODEL
      model.uri = { containerCode: container }
      const actionResult = await dispatch(getEntitiesThunk(model))
      const { result } = unwrapResult(actionResult)
      const sortedOptions = (_.get(result, 'data.entities', [])).sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
      const options = _.map(sortedOptions, (item) => {
        return {
          key: item.id,
          value: item.name,
          text: item.name
        }
      })
      const currentValue = _.get(currentData, 'entityName', '')
      if (currentValue) {
        options.unshift({ text: currentValue, value: currentValue, key: currentValue })
      }
      setEntityNames(options)
    }
  }

  const getCountryCode = (idCountry) => {
    const index = _.findIndex(countries, function(o) { return o.id === idCountry })
    return countries[index].code
  }

  const getContainerId = (containerCode) => {
    const container = _.find(containers, ['containerCode', containerCode])
    return container?.containerId || ''
  }

  useEffect(async () => {
    await getInfo()
  }, [currentData])

  const onSubmit = async (data) => {
    dispatch(showLoading())
    if (isSubmit) {
      return
    }
    setIsSubmit(true)

    let { engagementName, engagementType, periodEndDate, country, entityName, entityChargeCode } = data
    periodEndDate = window.localize.toFullUtcDateString(periodEndDate)
    const container = _.get(currentData, 'container', '')
    const language = _.get(currentData, 'language', '')
    const containerId = getContainerId(container)
    const payload = {
      engagement: {
        attributes: {
          container,
          containerId,
          language,
          name: engagementName,
          engagementType,
          periodEndDate,
          country,
          countryCode: getCountryCode(country),
          entity: entityName,
          chargeCode: entityChargeCode,
          geoCode: geoFromOpm()
        },
        countries,
        engagementTypes,
        languages
      }
    }

    const model = REQUEST_MODEL
    model.payload = payload
    model.uri = { containerCode: container }
    const res = await createEngagement(model)
    if (_.get(res, 'result.statusCode') != 200) {
      dispatch(openErrorModal({ content: <FormattedMessage {...messages.contentErrorModal} /> }))
    }
    else {
      dispatch(updateListEngagements(res))
    }
    dispatch(hideLoading())
    handleClose()
  }

  const handleBack = () => {
    onBack(methods.getValues())
  }

  const handleClose = () => {
    methods.reset()
    onClose()
  }

  return (
    <div className='primary-card engagement-creation-wrapper'>
      <div className='primary-card__header ec-header--sticky'>
        <FormattedMessage {...messages.createAnEngagement} />
        <Image className='close-btn' src={CloseIcon} onClick={handleClose}/>
      </div>
      <div className='primary-card__content ec-content-wrapper'>
        <div className='ec-content'>
          <FormProvider {...methods} >
            <Form onSubmit={methods.handleSubmit(onSubmit)}>
              <div className='ec-title'><FormattedMessage {...messages.tellAboutEngagement} /></div>
              <div className="input-group form-group ec-input">
                <label><FormattedMessage {...messages.engagementName} /></label>
                <LimitCounter name='engagementName' validationForm={validationForm.engagementName} />
              </div>
              <div className="input-group form-group default-dropdown ec-input">
                <label><FormattedMessage {...messages.engagementType} /></label>
                <DropdownInput name='engagementType' options={engagementTypeSrc} validationForm={validationForm.engagementType} classes='ec-input' />
              </div>
              <div className="input-group form-group ec-input">
                <label><FormattedMessage {...messages.periodEndDate} /></label>
                <DatePicker name='periodEndDate' validationForm={validationForm.periodEndDate} classes='ec-input' />
              </div>
              <div className="input-group form-group default-dropdown ec-input">
                <label><FormattedMessage {...messages.country} /></label>
                <DropdownInput name='country' options={countrySrc} validationForm={validationForm.country} />
              </div>
              <div className='ec-title ec-title--zambezi'><FormattedMessage {...messages.tellAboutEntity} /></div>
              <div className="input-group form-group default-dropdown ec-input">
                <label><FormattedMessage {...messages.entityName} /></label>
                <AdditionsDropdown name='entityName' options={entityNames} validationForm={validationForm.entityName} classes='ec-input' />
              </div>
              <div className="input-group form-group ec-input">
                <label><FormattedMessage {...messages.entityChargeCode} /></label>
                <LimitCounter name='entityChargeCode' validationForm={validationForm.entityChargeCode} />
              </div>
              <div className="form-group">
                <Grid columns={2}>
                  <Grid.Row>
                    <Grid.Column>
                      <Button className='secondary-btn btn-back' type="button" onClick={() => handleBack()}><FormattedMessage {...messages.btnBack} /></Button>
                    </Grid.Column>
                    <Grid.Column textAlign='right'>
                      <Button className='primary-btn btn-login' type="submit" disabled={!isValid}><FormattedMessage {...messages.btnFinish} /></Button>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </div>
            </Form>
          </FormProvider>
        </div>
      </div>
    </div>
  )
}

export default EngagementInformation