import React from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useIntl } from 'react-intl'

import { containersSelector } from 'src/containers/Setting/UserProfile/Redux'
import { Form, Button, Modal, DropdownInput, ErrorModal } from 'src/components'

import { creationPrompt, languageOptions } from './constants'
import { validationForm } from './validationForm'
import './styles.scss'

const BeginModal = (props) => {
  const intl = useIntl()
  const { onClose, onBegin, currentData } = props
  const { selectLabel, languageLabel, errorContent, errorHeader, buttonClose, buttonBegin, buttonCancel, languagePopup } = creationPrompt
  const containers = useSelector(containersSelector)

  const containerOptions = _.map(_.sortBy(_.uniqBy(containers, 'containerCode'), ['containerCode']), (item, i) => {
    return {
      value: item.containerCode,
      text: item.containerName + (i === 0 ? ' (default)' : ''),
      key: i
    }
  })

  const model = {
    container: _.get(currentData, 'container') || (containerOptions.length && containerOptions[0].value) || '',
    language: _.get(currentData, 'language') || (languageOptions.length && languageOptions[0].value) || ''
  }

  const methods = useForm({
    mode: 'all',
    defaultValues: model
  })

  const onSubmit = (data) => {
    onBegin(data)
  }

  const renderModalSuccess = () => {
    return <Modal className='begin-modal' open={true} onClose={() => onClose()} >
      <div className='ec-content-wrapper'>
        <div className='ec-content'>
          <FormProvider {...methods} >
            <Form onSubmit={methods.handleSubmit(onSubmit)}>
              <div className='input-group form-group default-dropdown ec-input'>
                <div className='ec-title'><label>{selectLabel}</label></div>
                <DropdownInput name='container' options={containerOptions} validationForm={validationForm.container} disabled={containerOptions.length <= 1} />
              </div>
              <div className='input-group form-group default-dropdown ec-input'>
                <div className='ec-title'><label className='label--zambezi'>{languageLabel}</label></div>
                <DropdownInput name='language' popupContent={languagePopup} options={languageOptions} validationForm={validationForm.language} disabled={true} />
              </div>
              <Button.Group >
                <div className='button-group-side'>
                  <Button className='secondary-btn btn--cancel' onClick={() => onClose()}>{buttonCancel}</Button>
                </div>
                <div className='button-group-side'>
                  <Button className='primary-btn btn--begin' type='submit' disabled={!methods.formState.isValid} >{buttonBegin}</Button>
                </div>
              </Button.Group>
            </Form>
          </FormProvider>
        </div>
      </div>
    </Modal>
  }

  const renderModalError = () => {
    return <ErrorModal label={intl.formatMessage(errorHeader)}
      content={intl.formatMessage(errorContent)}
      button={intl.formatMessage(buttonClose)}
      onClick={onClose}
      onClose={onClose} />
  }

  return (
    <React.Fragment>
      {containerOptions.length > 0 ? renderModalSuccess() : renderModalError()}
    </React.Fragment>
  )
}

export default BeginModal