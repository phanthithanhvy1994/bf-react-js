import React from 'react'
import { FormattedMessage } from 'react-intl'

import { supportService, globalFiles, baseUrl } from 'src/config'

import messages from './messages'

const dataSource = [
  { name: <FormattedMessage {...messages.help} />, href: baseUrl + '/' + globalFiles.guidance, key: 'help' },
  { name: <FormattedMessage {...messages.support} />, href: supportService, key: 'support' }
]

export {
  dataSource
}
