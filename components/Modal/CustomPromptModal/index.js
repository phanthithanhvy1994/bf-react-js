import React from 'react'
import { Modal, Button } from 'semantic-ui-react'
import PropTypes from 'prop-types'

import './styles.scss'

const CustomPromptModal = (props) => {
  const { open, header, content, cancel, dontSave, type, typePrompt, save, onCancel, onDontSave, onSave } = props

  const handleCancel = () => {
    onCancel()
  }

  const handleDontSave = () => {
    onDontSave()
  }

  const handleSave = () => {
    onSave()
  }

  return (
    <Modal className='tiny warning-prompt' open={open}>
      <Modal.Header>{header}</Modal.Header>
      <Modal.Content>{content}</Modal.Content>
      <Modal.Actions>
        <Button className='cancelBtn' floated='left' onClick={handleCancel}>{cancel}</Button>
        <Button className='dontSaveBtn' onClick={handleDontSave}>{dontSave}</Button>
        {type == typePrompt.confirm && (
          <Button
            autoFocus 
            className='saveBtn'
            onClick={handleSave}>{save}
          </Button>
        )}
        {type == typePrompt.warning && <Button className='saveBtn' onClick={handleSave} disabled>{save}</Button>}
      </Modal.Actions>
    </Modal>
  )
}

CustomPromptModal.propTypes = {
  open: PropTypes.bool,
  header: PropTypes.string,
  content: PropTypes.string,
  cancel: PropTypes.string,
  dontSave: PropTypes.string,
  type: PropTypes.string,
  typePrompt: PropTypes.shape({
    confirm: PropTypes.string,
    warning: PropTypes.string
  }),
  onCancel: PropTypes.func,
  onDontSave: PropTypes.func,
  onSave: PropTypes.func
}

export default CustomPromptModal