import React from 'react'
import { FormattedMessage } from 'react-intl'
import messages from './messages'

const authorizedInstitutionsMessages = {
  authorizedInstitutions: (
    <FormattedMessage {...messages.authorizedInstitutions} />
  ),
  viewDetails: <FormattedMessage {...messages.viewDetails} />,
  save: <FormattedMessage {...messages.save} />,
  emptyInstitution: <FormattedMessage {...messages.emptyInstitution} />,
  noTimeZoneFound: <FormattedMessage {...messages.noTimeZoneFound} />,
  selectLocalTimeZone: messages.selectLocalTimeZone,
  country: messages.country,
  saved: <FormattedMessage {...messages.saved} />,
  contentErrorModal: <FormattedMessage {...messages.contentErrorModal} />,
  within24HourErrorContent: (
    <FormattedMessage {...messages.within24HourErrorContent} />
  ),
  within24HourErrorHeader: (
    <FormattedMessage {...messages.within24HourErrorHeader} />
  ),
  invalidAccessTokenInstitution: <FormattedMessage {...messages.invalidAccessTokenInstitution} />,
  reAuthenticate: <FormattedMessage {...messages.reAuthenticate} />,
  btnClose: messages.btnClose,
  btnCancel: messages.btnCancel,
  btnYes: messages.btnYes,
  consentExpires: <FormattedMessage {...messages.consentExpires} />,
  noFutherReAuthenticate: <FormattedMessage {...messages.noFutherReAuthenticate} />,
  lastDateReAuthenticate: messages.lastDateReAuthenticate,
  expired: <FormattedMessage {...messages.expired} />
}

const messageTeamMember = {
  header: messages.canNotReAuthenticate,
  body: messages.connectWidthEngagementOwner
}

const messageReAuthenticate = {
  header: messages.messageReAuthenticateHeader,
  body: messages.messageReAuthenticateBody
}

const consentStatus = {
  valid: 'Valid',
  inValid: 'InValid',
  expired: 'Expired'
}

const statusGuidance = {
  neverReAuthen: -1,
  notReAuthen: 0,
  canReAuthen: 1
}

const truncateSize = 39

export {
  authorizedInstitutionsMessages,
  truncateSize,
  messageTeamMember,
  consentStatus,
  statusGuidance,
  messageReAuthenticate
}