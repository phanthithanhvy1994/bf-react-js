import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useMsal } from '@azure/msal-react'
import { useIntl } from 'react-intl'

import { LOGGED_OUT_EVENT } from 'src/config/constants'

import { ConfirmModal } from 'src/components'
import { closeSignoutModal } from 'src/containers/Common/actions'
import { signoutModalSelector } from 'src/containers/Common/selectors'

import messages from './messages'
import './styles.scss'

const SignoutModal = () => {
  const intl = useIntl()
  const signoutModal = useSelector(signoutModalSelector)
  const { open } = signoutModal
  const dispatch = useDispatch()
  const { instance } = useMsal()

  const handleLogout = () => {
    localStorage.setItem(LOGGED_OUT_EVENT, 'logout' + Date.now())
    instance.logout()
  }

  return (
    <ConfirmModal open={open}
      onClose={() => dispatch(closeSignoutModal({ open: false }))}
      onConfirm={handleLogout}
      header={intl.formatMessage(messages.header)}
      content={intl.formatMessage(messages.content)}
      cancelBtn={intl.formatMessage(messages.cancelBtn)}
      confirmBtn={intl.formatMessage(messages.signoutBtn)}
    />
  )
}

export default SignoutModal