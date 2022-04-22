import React from 'react'
import { Modal, Button } from 'semantic-ui-react'
import PropTypes from 'prop-types'

import { Image, Typography } from 'src/components'
import CloseIcon from 'src/assets/icons/svgs/IconCross.svg'
import './styles.scss'

const DialogueModal = (props) => {
  const { open, closeIcon, modalClassName, header, headerIcon, content, cancelBtn, confirmBtn, onModalClose, onClose, onConfirm } = props

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
      className={`dialogue-modal ${modalClassName ? modalClassName : ''}`}
      onClose={handleModalClose}
    >
      {closeIcon && <Image className='modal-close-btn' src={CloseIcon} onClick={handleModalClose} />}
      <Modal.Header>
        {headerIcon && <Image src={headerIcon} />}
        <Typography as='subheading2'>{header}</Typography>
      </Modal.Header>
      <Modal.Content>
        <Typography as='bodycopyregular'>{content}</Typography>
      </Modal.Content>
      <Modal.Actions>
        {cancelBtn && <Button className='btn--closed' onClick={handleClose}>{cancelBtn}</Button>}
        {confirmBtn && <Button className='btn--confirmed' onClick={handleConfirm}>{confirmBtn}</Button>}
      </Modal.Actions>
    </Modal>
  )
}

DialogueModal.propTypes = {
  open: PropTypes.bool,
  header: PropTypes.string,
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  cancelBtn: PropTypes.string,
  confirmBtn: PropTypes.string,
  onClose: PropTypes.func,
  onConfirm: PropTypes.func,
  onModalClose: PropTypes.func
}

export default DialogueModal