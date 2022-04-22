import { defineMessages } from 'react-intl'

export const scope = 'SignoutModal'
export default defineMessages({
  header: {
    id: `${scope}.Header`,
    defaultMessage: 'Are you sure?',
  },
  content: {
    id: `${scope}.Content`,
    defaultMessage: 'You may have unsaved work within your engagement. Any unsaved work will be lost. Please ensure to save any changes before signing out.',
  },
  cancelBtn: {
    id: `${scope}.CancelBtn`,
    defaultMessage: 'Cancel',
  },
  signoutBtn: {
    id: `${scope}.SignoutBtn`,
    defaultMessage: 'Sign out',
  }
})