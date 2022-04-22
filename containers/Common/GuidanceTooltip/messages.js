import { defineMessages } from 'react-intl'

export const scope = 'GuidanceTooltip'
export default defineMessages({
  title: {
    id: `${scope}.Title`,
    defaultMessage: 'To search, use one of the following formats:'
  },
  email: {
    id: `${scope}.Email`,
    defaultMessage: 'Email'
  },
  lastAndFirstName: {
    id: `${scope}.LastAndFirstName`,
    defaultMessage: 'Last name, first name'
  },
  lastName: {
    id: `${scope}.LastName`,
    defaultMessage: 'Last name'
  },
  firstName: {
    id: `${scope}.FirstName`,
    defaultMessage: 'First name'
  }
})