import React, { useState, useEffect, useReducer } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useForm, FormProvider } from 'react-hook-form'
import { useIntl } from 'react-intl'

import { RequestModal } from 'src/containers/Common/Components'
import { openModal, closeModal } from 'src/containers/Common/actions'
import { REQUEST_MODEL, lockTypes } from 'src/config/constants'
import { resendAuthorizationRequest } from '../services'
import { showLoading, hideLoading } from 'src/containers/Common/actions'

import { MODE } from '../constants'
import { ViewResendBDARequestMes, steps, actionType, limitTimeEditingBDA } from './constants'
import ViewEditBDARequest from './viewEditBDARequest'
import buildContent from './contentTabs'
import { Authorization } from '../constants'
import { stateResendRequestReducers, getAuthorizationRequest } from './services'
import messages from './messages'
import { unlockObject, handleLockingObject } from '../../GroupNameDataManagement/DataExtractionList/services'
import AddFinancialInstitution from '../AddFinancialInstitution'

const ViewResendBDARequest = (props) => {
  const intl = useIntl()
  const dispatch = useDispatch()
  const [isDoneInit, setIsDoneInit] = useState(false)
  const [disableSend, setDisableSend] = useState(true)
  const { engagementId, geoCode, containerCode } = useParams()
  const { mode, onClose, BDAData, getBDAList } = props
  const methods = useForm({
    mode: 'all',
    defaultValues: {
      listRequestAuthorized: [],
      listRequestPendingAuthorize: [],
      listFinancialInstitution: []
    }
  })
  const { watch, formState, getValues } = methods
  const { isDirty, isValid } = formState
  const [stateRequest, setStateRequest] = useReducer(stateResendRequestReducers, {
    currentStep: steps.institutions,
    currentData: {}
  })

  useEffect(async () => {
    initData()
  }, [BDAData])

  useEffect(() => {
    handleDisableSendBtn()
  }, [watch])

  useEffect(() => {
    if (mode === MODE.EDIT) {
       const timer = setTimeout(() => {
        dispatch(openModal({
          className: 'warning-modal',
          haveCloseIcon: true,
          autoTurnOff: false,
          body: {
            content: intl.formatMessage(messages.warningLimitTimeEditingBDAAuthorization)
          },
          onClose: () => {
            onClose()
          }
        }))
        handleUnlockBDAAuthorization()
       }, limitTimeEditingBDA)
      
      return () => {
        clearTimeout(timer)
      }
    }
  }, [])

  const initData = async () => {
    const data = await getAuthorizationRequestData()

    if (!_.isEmpty(data)) {
      //Lock BDA Authorization Request
      if (mode === MODE.EDIT) {
        await lockBdaRequest()
      }

      const institutionInformations = _.orderBy(_.get(data,'institutionInformations', []), [institution => institution.name.toLowerCase()])
      const listRequestAuthorized = institutionInformations.filter(institution => institution.isAuthorize)
      const listRequestPendingAuthorize = institutionInformations.filter(institution => !institution.isAuthorize)

      const initData = {
        ...data.clientInformation,
        listRequestAuthorized: listRequestAuthorized?.map(authorized => {
          const authorizedName = _.get(authorized, 'name', '')
          const countryCode = `(${_.get(authorized, 'countryCode', '')})`
          const countryCodeSuffix = authorizedName.indexOf(countryCode, authorizedName.length - countryCode.length)
          const suffix = countryCodeSuffix === -1 ? ` ${countryCode}` : ''
          const name = `${authorizedName}${suffix}`
          return {
            authorizeCheck: {
              label: name,
              value: authorized.id
            }
          }
        }) || [],
        listRequestPendingAuthorize: listRequestPendingAuthorize?.map(authorize => {
          const authorizeName = _.get(authorize, 'name', '')
          const countryCode = `(${_.get(authorize, 'countryCode', '')})`
          const countryCodeSuffix = authorizeName.indexOf(countryCode, authorizeName.length - countryCode.length)
          const suffix = countryCodeSuffix === -1 ? ` ${countryCode}` : ''
          const name = `${authorizeName}${suffix}`
          return {
            authorizeCheck: {
              label: name,
              value: authorize.id
            }
          }
        }) || []
      }
      setStateRequest({ type: actionType.SET_CURRENT_DATA, payload: initData })
      setIsDoneInit(true)
    }
  }

  const getAuthorizationRequestData = async () => {
    const model = REQUEST_MODEL
    model.uri = { engagementId, containerCode }
    model.geoCode = geoCode
    model.query = { engagementInvitationClientId: BDAData.id }
    const res = await getAuthorizationRequest(model)
    const { result: { data } } = res

    return data
  }

  const lockBdaRequest = async () => {
    const payload = {
      uri: { containerCode },
      geoCode,
      payload: {
        lockType: lockTypes.bdaAuthorization,
        objectId: BDAData.id
      }
    }

    await handleLockingObject(payload)
  }

  const handleUnlockBDAAuthorization = async () => {
    const payload = {
      uri: { containerCode },
      geoCode,
      payload: {
        lockType: lockTypes.bdaAuthorization,
        objectId: BDAData.id
      },
      keepalive: true
    }

    await unlockObject(payload)
  }

  const handleDisableSendBtn = () => {
    const { listRequestAuthorized, listRequestPendingAuthorize, listFinancialInstitution } = getValues()
    const hasSelectedAuthorized = listRequestAuthorized?.some(authorized => authorized.authorizeCheck.checked)
    const hasSelectedPendingAuthorize = listRequestPendingAuthorize?.some(authorize => authorize.authorizeCheck.checked)
    const hasSelectedListFInstitution = listFinancialInstitution?.some(institution => institution.checkNewInstitution.checked && institution.institution.length > 0)
    const isDisableSend = !(hasSelectedAuthorized || hasSelectedPendingAuthorize || hasSelectedListFInstitution && isValid)

    setDisableSend(isDisableSend)
  }

  const onChangeTab = (index, data) => {
    setStateRequest({ type: actionType.SET_CURRENT_STEP, payload: index })
    setStateRequest({ type: actionType.SET_CURRENT_DATA, payload: data })
  }

  const handleClosePanel = async () => {
    if (mode === MODE.EDIT && isDirty) {
      return dispatch(openModal({
        className: 'leave-modal',
        header: {
          content: intl.formatMessage(ViewResendBDARequestMes.leaveModalHeader)
        },
        body: {
          content: intl.formatMessage(ViewResendBDARequestMes.leaveModalContent),
        },
        leftBtn: {
          listBtn: [{
            className: 'tertiary-btn',
            label: intl.formatMessage(ViewResendBDARequestMes.cancelBDABtn),
            onClick: async () => {
              await handleUnlockBDAAuthorization()
              dispatch(closeModal())
            }
          }]
        },
        rightBtn: {
          listBtn: [{
            className: 'primary-btn',
            label: intl.formatMessage(ViewResendBDARequestMes.yesBtn),
            onClick: async () => {
              await handleUnlockBDAAuthorization()
              dispatch(closeModal())
              onClose()
            }
          }]
        }
      }))
    }
    if (mode === MODE.EDIT)
      await handleUnlockBDAAuthorization()
    return onClose()
  }

  const showSuccesSentPanel = () => {
    return dispatch(openModal({
      className: 'sent-modal',
      haveCloseIcon: true,
      autoTurnOff: true,
      body: {
        content: intl.formatMessage(Authorization.sendSuccess)
      }
    }))
  }

  const handleResend = async (data) => {
    dispatch(showLoading())
    const platformCountryInstitutions = []
    const updatePlatformCountryInstitutions = (institutions) => {
      institutions?.forEach(institution => {
        platformCountryInstitutions.push({
          id: institution.authorizeCheck.value,
          isSendMail: institution.authorizeCheck.checked
        })
      })
    }

    updatePlatformCountryInstitutions((data?.listRequestAuthorized || [])?.concat((data?.listRequestPendingAuthorize || [])))

    if (data?.listFinancialInstitution) {
      data?.listFinancialInstitution.forEach(authorize => {
        if (authorize.checkNewInstitution.checked && authorize.institution.length > 0) {
          authorize.institution.forEach(institution => {
            platformCountryInstitutions.push({
              id: institution.value,
              isSendMail: authorize.checkNewInstitution.checked
            })
          })
        }
      })
    }
    const model = REQUEST_MODEL
    model.uri = { engagementId, containerCode }
    model.geoCode = geoCode
    model.payload = {
      id: BDAData.id,
      resendAll: false,
      platformCountryInstitutions
    }

    const res = await resendAuthorizationRequest(model)
    if (res?.result?.statusCode === 200) {
      showSuccesSentPanel()
      onClose()

      const modelList = REQUEST_MODEL
      modelList.uri = { engagementId }
      await getBDAList(modelList)
    }
    await handleUnlockBDAAuthorization()
    dispatch(hideLoading())
  }

  const renderResendFinancialInstitutions = () => (
    <div className='financial-institutions'>
      <ViewEditBDARequest {...props} currentData={stateRequest.currentData} />
      {mode === MODE.EDIT && <AddFinancialInstitution />}
    </div>
  )

  const contentTabs = buildContent({ ViewResendBDARequestMes, renderResendFinancialInstitutions, handleClosePanel, disableSend, mode, handleResend })

  return isDoneInit && <FormProvider {...methods} >
    <RequestModal
      contentTabs={contentTabs}
      onClose={handleClosePanel}
      currentIndex={stateRequest.currentStep}
      onChangeTab={onChangeTab}
      currentData={stateRequest.currentData}
    />
  </FormProvider>
}

export default ViewResendBDARequest
