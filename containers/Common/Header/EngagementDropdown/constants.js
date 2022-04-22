import React from 'react'
import { FormattedMessage } from 'react-intl'

import { routes } from 'src/config'

import messages from './messages'

const dataSource = [
  { name: <FormattedMessage {...messages.backToAllEngagements} />, href: routes.index, key: 'backToAllEngagements' },
  { name: <FormattedMessage {...messages.mostRecentRelatedEngagements} />, disabled: true, class: 'sub-header' }
]

export {
  dataSource
}
