import React from 'react'
import { Modal, Button } from 'semantic-ui-react'
import PropTypes from 'prop-types'

import './styles.scss'

const ErrorModal = (props) => {
  const { header, content, button, onClose, onClick } = props

  const handleClose = () => {
    onClose()
  }

  const handleClick = () => {
    onClick()
  }

  return (
    <Modal className='error' open={true} onClose={handleClose} >
      <label>{header}</label>
      <div className='content'>{content}</div>
      <Button className='btn--close' onClick={handleClick}>{button}</Button>
    </Modal>
  )
}

ErrorModal.propTypes = {
  header: PropTypes.string,
  content: PropTypes.string,
  button: PropTypes.string,
  onClose: PropTypes.func,
  onClick: PropTypes.func
}

export default ErrorModal