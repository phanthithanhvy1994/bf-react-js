import React from 'react'

import activeIcon from 'src/assets/icons/svgs/financial_institutions_active_icon.svg'
import authorizedIcon from 'src/assets/icons/svgs/financial_institutions_authorized_icon.svg'
import pendingIcon from 'src/assets/icons/svgs/financial_institutions_pending_icon.svg'
import { Header, Image } from 'src/components'

import { MODE } from '../constants'
import { ViewResendBDARequestMes } from './constants'
import CheckBoxFieldsArray from './CheckBoxFieldsArray'

const ViewEditBDARequest = (props) => {
  const { currentData, mode, BDAData } = props
  const listRequestAuthorized = _.get(currentData, 'listRequestAuthorized', [])
  const listRequestPendingAuthorize = _.get(currentData, 'listRequestPendingAuthorize', [])

  return (
    <>
      <div className='financial-institutions__link-status'>
        <Image src={activeIcon} centered />
        <label>{BDAData.linkStatus} {ViewResendBDARequestMes.linkStatus}</label>
      </div>
      <div className='financial-institutions__title'>
        <Header as='h3'>{ViewResendBDARequestMes.selectedFinancialInstitutions}</Header>
      </div>
      <div className='financial-institutions__authorized'>
        <div className='financial-institutions__authorized--title'>
          <Image src={authorizedIcon} centered />
          <label>{ViewResendBDARequestMes.authorized}</label>
        </div>
        <div className='financial-institutions__authorized--list'>
          {mode === MODE.VIEW && listRequestAuthorized.map((authorize, idx) => <label key={idx} >{authorize.authorizeCheck.label}</label>) || ''}
          {mode === MODE.EDIT && <CheckBoxFieldsArray {...{ name: 'listRequestAuthorized' }} />}
        </div>
      </div>
      <div className='financial-institutions__pending-authorization'>
        <div className='financial-institutions__pending-authorization--title'>
          <Image src={pendingIcon} centered />
          <label>{ViewResendBDARequestMes.pendingAuthorization}</label>
        </div>
        <div className='financial-institutions__pending-authorization--list'>
          {mode === MODE.VIEW && listRequestPendingAuthorize.map((authorize, idx) => <label key={idx} >{authorize.authorizeCheck.label}</label>) || ''}
          {mode === MODE.EDIT && <CheckBoxFieldsArray {...{ name: 'listRequestPendingAuthorize' }} />}
        </div>
      </div>
    </>
  )
}

export default ViewEditBDARequest