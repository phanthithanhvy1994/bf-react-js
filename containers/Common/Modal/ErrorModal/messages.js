import { defineMessages } from 'react-intl'

export const scope = 'ErrorModal'
export default defineMessages({
  header: {
    id: `${scope}.Header`,
    defaultMessage: 'Looks like there was an error',
  },
  closeBtn: {
    id: `${scope}.CloseBtn`,
    defaultMessage: 'Close',
  },
})