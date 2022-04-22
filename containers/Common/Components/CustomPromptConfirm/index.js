import React from 'react'
import { useIntl } from 'react-intl'

import { CustomPromptModal } from 'src/components'

import { typePrompt, confirmPrompt, warningPrompt } from './constants'
import './styles.scss'

const CustomPromptConfirm = (props) => {
  const intl = useIntl()
  const { open, setOpen, confirmCallback, submitCB, type } = props
  let data = null
  switch (type) {
    case typePrompt.warning:
      data = warningPrompt
      break
    default:
      data = confirmPrompt
      break
  }
  const { header, content, cancel, dontSave, save } = data

  const allowTransition = async () => {
    if (typeof submitCB === 'function')
      await submitCB()
    setOpen(false)
    confirmCallback(true)
  }

  const dontSaveTransition = () => {
    setOpen(false)
    confirmCallback(true)
  }

  const blockTransition = () => {
    setOpen(false)
    confirmCallback(false)
  }

  return (
    <CustomPromptModal open={open}
      header={intl.formatMessage(header)}
      content={intl.formatMessage(content)}
      cancel={intl.formatMessage(cancel)}
      dontSave={intl.formatMessage(dontSave)}
      save={intl.formatMessage(save)}
      onCancel={blockTransition}
      onDontSave={dontSaveTransition}
      onSave={allowTransition}
      typePrompt={typePrompt}
      type={type}
    />
  )
}

export default CustomPromptConfirm