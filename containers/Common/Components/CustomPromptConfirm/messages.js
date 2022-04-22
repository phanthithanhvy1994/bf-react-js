import { defineMessages } from 'react-intl'

export const scope = 'CustomPromptConfirm'
export default defineMessages({
  headerConfirm: {
    id: `${scope}.HeaderConfirm`,
    defaultMessage: 'Are you sure you want to leave?',
  },
  contentConfirm: {
    id: `${scope}.ContentConfirm`,
    defaultMessage: `If you don't save before you leave, any changes you may have made will be lost.`,
  },
  cancelConfirmBtn: {
    id: `${scope}.CancelConfirmBtn`,
    defaultMessage: 'Cancel',
  },
  saveConfirmBtn: {
    id: `${scope}.SaveConfirmBtn`,
    defaultMessage: 'Save',
  },
  dontSaveConfirmBtn: {
    id: `${scope}.DontSaveConfirmBtn`,
    defaultMessage: `Don't save`,
  },
  contentWarning: {
    id: `${scope}.ContentWarning`,
    defaultMessage: `You cannot save your changes because you have not filled all of the required fields.`,
  }
})