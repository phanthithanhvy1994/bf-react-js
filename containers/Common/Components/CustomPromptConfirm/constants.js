import messages from './messages'

const confirmPrompt = {
  header: messages.headerConfirm,
  content: messages.contentConfirm,
  cancel: messages.cancelConfirmBtn,
  save: messages.saveConfirmBtn,
  dontSave: messages.dontSaveConfirmBtn
}

const warningPrompt = {
  header: messages.headerConfirm,
  content: messages.contentWarning,
  cancel: messages.cancelConfirmBtn,
  save: messages.saveConfirmBtn,
  dontSave: messages.dontSaveConfirmBtn
}

const typePrompt = {
  confirm: 'confirm',
  warning: 'warning'
}

export {
  typePrompt, confirmPrompt, warningPrompt
}