import React from 'react'
import { FormattedMessage } from 'react-intl'
import messages from './messages'
import { routes } from 'src/config'

const userProfileTxt = <FormattedMessage {...messages.userProfile}/>
const signOutTxt = <FormattedMessage {...messages.signOut}/>
const engagementSettingTxt = <FormattedMessage {...messages.engagementSetting}/>
const altUser= {...messages.altUser}

const dataSource = [
  { text: userProfileTxt, href: routes.setting.user },
  { text: signOutTxt, href: '#', signoutItem: true }
]

const dataSourceWithEngagement = [
  { text: engagementSettingTxt, href: routes.portfolio.engagementSettings },
  { text: userProfileTxt, href: routes.setting.user },
  { text: signOutTxt, href: '#', signoutItem: true }
]

export {
  dataSource, dataSourceWithEngagement, altUser
}