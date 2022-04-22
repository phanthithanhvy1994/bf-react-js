import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { FormattedMessage } from 'react-intl'

import { closeErrorModal } from 'src/containers/common/actions'
import { errorModalSelector } from 'src/containers/common/selectors'

import { Button, Modal } from 'src/components'
import messages from './messages'
import './styles.scss'

const ErrorModal = () => {
  const dispatch = useDispatch()
  const errorModal = useSelector(errorModalSelector)
  const { open, content, className } = errorModal
  const customHeader = _.get(errorModal, 'header', null)
  const headerContent = !_.isEmpty(customHeader) ? (
    customHeader
  ) : (
    <FormattedMessage {...messages.header} />
  )

  const handleClose = () => {
    dispatch(closeErrorModal())
  }

  return (
    <Modal className={`tiny error-modal ${className ? className : ''}`} open={open}>
      <Modal.Header>{headerContent}</Modal.Header>
      <Modal.Content>{content ? content : ''}</Modal.Content>
      <Modal.Actions>
        <Button className='closeBtn' floated='left' onClick={handleClose}>
          <FormattedMessage {...messages.closeBtn} />
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default ErrorModal