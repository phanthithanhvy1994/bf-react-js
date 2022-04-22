import React from 'react'
import { Modal, Button } from 'semantic-ui-react'
import PropTypes from 'prop-types'

import { Image } from 'src/components'
import CloseIcon from 'src/assets/icons/svgs/close_black.svg'
import './styles.scss'

const ConfirmModal = (props) => {
  const { open, closeIcon, closeOnDimmerClick, modalClassName, header, content, cancelBtn, confirmBtn, onModalClose, onClose, onConfirm } = props

  const handleClose = () => {
    onClose()
  }

  const handleModalClose = () => {
    onModalClose()
  }

  const handleConfirm = () => {
    onConfirm()
  }

  return (
    <Modal
      open={open}
      closeIcon={false}
      closeOnDimmerClick={closeOnDimmerClick}
      className={`tiny confirm-modal ${modalClassName ? modalClassName : ''}`}
      onClose={handleModalClose}
    >
      {closeIcon && <Image className='modal-close-btn' src={ closeIcon === true ? CloseIcon : closeIcon } onClick={handleModalClose}/>}
      {header && <Modal.Header>{header}</Modal.Header>}
      <Modal.Content>{content}</Modal.Content>
      <Modal.Actions>
        {cancelBtn && <Button className='btn--closed' onClick={handleClose}>{cancelBtn}</Button>}
        {confirmBtn && <Button className='btn--confirmed' onClick={handleConfirm}>{confirmBtn}</Button>}
      </Modal.Actions>
    </Modal>
  )
}

ConfirmModal.propTypes = {
  open: PropTypes.bool,
  header: PropTypes.string,
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  cancelBtn: PropTypes.string,
  confirmBtn: PropTypes.string,
  onClose: PropTypes.func,
  onConfirm: PropTypes.func,
  onModalClose: PropTypes.func
}

export default ConfirmModal