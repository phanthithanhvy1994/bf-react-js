import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Toastify } from 'src/components'

import { resetToastAction } from '../actions'
import { toastInfoSelector } from '../selectors'
import ContentToast from './content'
import './styles.scss'

const Toast = () => {
  const dispatch = useDispatch()
  const { isToast, message, ...extantToastProps } = useSelector(toastInfoSelector)
  const content = <ContentToast message={message} />
  const onClose = () => dispatch(resetToastAction({ isToast: !isToast }))

  return isToast && (
    <Toastify {...extantToastProps}
      autoClose={extantToastProps.autoCloseTime}
      content={content}
      onClose={onClose}
      isClearWaitingQueue={true}
    />
  )
}

export default Toast