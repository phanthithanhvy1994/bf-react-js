import React, { useReducer } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm, FormProvider } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { useIntl } from 'react-intl'

import { RequestModal } from 'src/containers/Common/Components'
import { openErrorModal, openModal, closeModal } from 'src/containers/common/actions'
import { currentEngagementSelector } from 'src/containers/Portfolio/Redux'
import { showLoading, hideLoading } from 'src/containers/Common/actions'

import { validationForm } from './validationForm'
import { stateCreateRequestReducers, sendAuthorizationRequest } from './services'
import { steps, actionType, requestMessages } from './constants'
import buildContent from './contentTabs'
import messages from './messages'

const CreateRequestModal = (props) => {
  const intl = useIntl()
  const { onClose, listOfBDAs } = props
  const dispatch = useDispatch()
  const { geoCode, containerCode } = useParams()
  const [stateRequest, setStateRequest] = useReducer(stateCreateRequestReducers, {
    currentStep: steps.default,
    currentData: {}
  })

  const methods = useForm({
    mode: 'all',
  })
  const { formState } = methods
  const { isDirty } = formState

  const handleClosePanel = () => {
    if (!isDirty) return onClose()
    return dispatch(openModal({
      className: 'leave-modal',
      header: {
        content: intl.formatMessage(requestMessages.headerConfirm)
      },
      body: {
        content: intl.formatMessage(requestMessages.contentConfirm)
      },
      leftBtn: {
        listBtn: [{
          className: 'tertiary-btn',
          label: intl.formatMessage(requestMessages.cancelBDABtn),
          onClick: async () => {
            dispatch(closeModal())
          }
        }]
      },
      rightBtn: {
        listBtn: [{
          className: 'primary-btn',
          label: intl.formatMessage(requestMessages.yesBtn),
          onClick: () => {
            dispatch(closeModal())
            onClose()
          }
        }]
      }
    }))
  }

  const showInvalidEmailPanel = () => {
    return dispatch(openModal({
      className: 'invalid-email-modal',
      header: {
        content: intl.formatMessage(requestMessages.warningEmailHeader)
      },
      body: {
        content: intl.formatMessage(requestMessages.warningEmailContent)
      },
      leftBtn: {
        listBtn: [{
          className: 'secondary-btn',
          label: intl.formatMessage(requestMessages.closeBtn),
          onClick: async () => {
            dispatch(closeModal())
          }
        }]
      }
    }))
  }

  const showSuccesSentPanel = () => {
    return dispatch(openModal({
      className: 'sent-modal',
      haveCloseIcon: true,
      autoTurnOff: true,
      body: {
        content: intl.formatMessage(requestMessages.sentSuccess)
      }
    }))
  }

  const showConfirmBeforeSend = (data) => {
    const { email } = stateRequest.currentData
    const isExistEmail = listOfBDAs.map(item => item.clientEmail).includes(email)
    if (isExistEmail) {
      showInvalidEmailPanel()
    }
    else {
      return dispatch(openModal({
        className: 'confirm-before-send-modal',
        body: {
          content: intl.formatMessage(messages.confirmBeforeSend, {
            email: (
              <span className='email'>{email}</span>
            )
          })
        },
        leftBtn: {
          listBtn: [{
            className: 'secondary-btn',
            label: intl.formatMessage(requestMessages.cancelBDABtn),
            onClick: () => {
              dispatch(closeModal())
            }
          }]
        },
        rightBtn: {
          listBtn: [{
            className: 'primary-btn',
            label: intl.formatMessage(requestMessages.yesBtn),
            onClick: () => {
              dispatch(closeModal())
              sendRequest(data)
            }
          }]
        }
      }))
    }
  }

  const onChangeTab = (index, data) => {
    setStateRequest({ type: actionType.SET_CURRENT_STEP, payload: index })
    setStateRequest({ type: actionType.SET_CURRENT_DATA, payload: data })
  }

  const sendRequest = async (data) => {
    dispatch(showLoading())
    const { firstName, lastName, email } = stateRequest.currentData
    const { listFinancialInstitution } = data
    let institutions = []
    _.forEach(_.map(listFinancialInstitution, 'institution') || [], (v) => {
      institutions = _.concat(institutions, _.map(v, 'value') || [])
    })

    const sendModel = {}
    sendModel.uri = { engagementId: currentEngagement.id, containerCode }
    sendModel.geoCode = geoCode
    sendModel.payload = {
      clientInformations: {
        firstName: firstName,
        lastName: lastName,
        email: email
      },
      platformCountryInstitutions: institutions
    }
    const res = await sendAuthorizationRequest(sendModel)
    const statusCode = _.get(res, 'result.statusCode')
    if (statusCode === 403){
      dispatch(openErrorModal({content: requestMessages.sendErrorByEngagementDeleted }))
      onClose()
    } else if (statusCode != 200) {
      dispatch(openErrorModal({ content: requestMessages.somethingWentWrong }))
      onClose()
    } else if (!_.get(res, 'result.data.isValidEmail')) {
      showInvalidEmailPanel()
    } else {
      showSuccesSentPanel()
      onClose(true)
    }
    dispatch(hideLoading())
  }

  const currentEngagement = useSelector(currentEngagementSelector)

  const contentTabs = buildContent({ onChangeTab, handleClosePanel, showConfirmBeforeSend, steps, validationForm, messages, requestMessages })

  return <FormProvider {...methods} >
    <RequestModal
      contentTabs={contentTabs}
      onClose={handleClosePanel}
      currentIndex={stateRequest.currentStep}
      onChangeTab={onChangeTab}
      currentData={stateRequest.currentData}
    />
  </FormProvider>
}

export default CreateRequestModal
