import React, { useState, useContext, useEffect } from 'react'
import { useForm, FormProvider, Controller } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Prompt } from 'react-router-dom'
import { unwrapResult } from '@reduxjs/toolkit'

import { Form, Header, Dropdown, Button } from 'src/components'
import AppContext from 'src/context'
import { typePrompt } from 'src/containers/Common/Components/CustomPromptConfirm/constants'

import { saveUserProfileWithThunk } from './services'
import { settingsSelector } from './Redux'
import { getCultureInfo } from 'src/containers/Setting/Redux'

import { REQUEST_MODEL } from 'src/config/constants'
import { showPromptUrls, userSettingsMessages, exampleString, languageOptions } from './constants'
import { geoSupports } from 'src/config'

const languageOptionsRemap = languageOptions.map((item) => {
  return {
    value: item.key,
    text: item.value
  }
})

const UserSettingForm = () => {
  const dispatch = useDispatch()
  const settingsInfo = useSelector(settingsSelector)
  
  const localize = window.localize

  const formMethods = useForm({
    mode: 'onTouched',
    defaultValues: {
      language: localize.defaultLanguage,
      locale: localize.getLocale()
    }
  })
  const { control, formState, handleSubmit, reset, setValue } = formMethods

  const date = new Date()
  const [shortDate, setShortDate] = useState(null)
  const [currency, setCurrency] = useState(null)

  const [currentLocale, setCurrentLocale] = useState(localize.getLocale())
  const [currentLanguage, setCurrentLanguage] = useState(localize.getLanguage())

  const { setSubmitCB } = useContext(AppContext)

  useEffect(() => {
    setValue('locale', currentLocale)
    _.forEach(geoSupports, function (geoCode) {
      updateDateAndCurrencyByLocale(currentLocale, geoCode)
    })
  }, [currentLocale])

  const updateDateAndCurrencyByLocale = async (locale, geoCode) => {
    const model = REQUEST_MODEL
    model.query = { locale: locale }
    model.geoCode = geoCode
    const { result } = unwrapResult(await dispatch(getCultureInfo(model)))
    window.localize.addCultureInfo(_.get(result, 'data', null))
    const shortDate = localize.formatInputDate(date, locale)
    setShortDate(shortDate)
    const currency = localize.toLocalNumberString(exampleString.number, locale)
    setCurrency(currency)
  }

  const handleChange = (props, data) => {
    setCurrentLocale(data)
    props.onChange(data)
  }

  const onSubmit = (data) => {
    const model = REQUEST_MODEL
    model.payload = data
    localStorage.setItem('language', model.payload.language)
    localStorage.setItem('locale', model.payload.locale)
    //save changes
    _.forEach(geoSupports, function (geoCode) {
      model.geoCode = geoCode
      saveUserProfileWithThunk(dispatch, model)
    })
    
    reset(data)
  }

  const setConfigRedirect = (path) => {
    const existUrl = showPromptUrls.find(url => url == path)
    if (existUrl) return true
    return false
  }
  
  const renderMessage = (path) => {
    setSubmitCB(prevState => handleSubmit(onSubmit))
    let typeData = typePrompt.confirm
    const warningData = {
      typeData,
      config: setConfigRedirect(path)
    }
    return JSON.stringify(warningData)
  }

  return (
    <FormProvider {...formMethods} >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Prompt
          when={formState.isDirty}
          message={location => renderMessage(location.pathname)} />
        <div className='primary-card user-settings__preferences'>
          <div className='primary-card__header'>
            <Header as='h3'>{userSettingsMessages.preferences}</Header>
          </div>
          <div className='primary-card__content'>
            <div className='content-wrapper default-dropdown'>
              <Header as='h4'>{userSettingsMessages.language}</Header>
              <Controller
                name='language'
                control={control}
                render={({ ref, ...props }) =>
                  <Dropdown
                    onChange={(e, { value }) => props.onChange(value)}
                    value={currentLanguage}
                    search
                    selection
                    options={languageOptionsRemap}
                    disabled
                    upward={false}
                    className='default-dropdown'
                    icon={<i className='arrow-down' />}
                  />
                }
              />
              <Header as='h4'>{userSettingsMessages.locale}</Header>
              <Controller
                name='locale'
                control={control}
                render={({ ref, ...props }) =>
                  <Dropdown
                    onChange={(e, { value }) => handleChange(props, value)}
                    value={currentLocale}
                    search
                    selection
                    options={settingsInfo.localesSupport.map((item) => {
                      return {
                        value: item.key,
                        text: item.value
                      }
                    })}
                    upward={false}
                    className='default-dropdown'
                    icon={<i className='arrow-down' />}
                  />
                }
              />
              <Header as='h4'>{userSettingsMessages.dnformatting}:</Header>
              <Header as='h5'>{shortDate}</Header>
              <Header as='h5'>{currency}</Header>
              <Button className='primary-btn' type="submit"
                  disabled={!formState.isDirty}
                >{userSettingsMessages.saveChanges}</Button>
            </div>
          </div>
        </div>
      </Form>
    </FormProvider>
  )
}

export default UserSettingForm