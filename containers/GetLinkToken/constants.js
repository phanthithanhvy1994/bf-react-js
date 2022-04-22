import React from 'react'
import { FormattedMessage } from 'react-intl'

import messages from './messages'

const warningMessage = {
  linkExpired: <FormattedMessage {...messages.linkExpired}/>,
  requestDeleted: <FormattedMessage {...messages.requestDeleted}/>,
  engagementDeleted: <FormattedMessage {...messages.engagementDeleted}/>,
  unableConnectDirectId: <FormattedMessage {...messages.unableConnectDirectId}/>,
  requestAuthorized: <FormattedMessage {...messages.requestAuthorized}/>,
  successfullyAuthorized: <FormattedMessage {...messages.successfullyAuthorized}/>,
  unSuccessfullyAuthorized: <FormattedMessage {...messages.unSuccessfullyAuthorized}/>,
  authorizeHasNotBeenAssigned: <FormattedMessage {...messages.authorizeHasNotBeenAssigned}/>,
  selectAuthorizeAccess: <FormattedMessage {...messages.selectAuthorizeAccess}/>,
}

const buttonClose = <FormattedMessage {...messages.buttonClose}/>

const MsgKey = {
  linkExpire: 'Invite.LinkExpire',
  requestDeleted: 'Invite.RequestDeleted',
  engagementDeleted: 'Invite.EngagementDeleted',
  requestAuthorized: 'Invite.RequestAuthorized',
  unableConnectDirectId: 'Invite.UnableConnectDirectId',
  authorizeHasNotBeenAssigned: 'Invite.InstitutionNotAssigned'
}

const timeoutClose = 5000

const GroupNameDataPlatform = {
  directId: '1'
}

export {
  warningMessage,
  buttonClose,
  MsgKey,
  timeoutClose,
  GroupNameDataPlatform
}
