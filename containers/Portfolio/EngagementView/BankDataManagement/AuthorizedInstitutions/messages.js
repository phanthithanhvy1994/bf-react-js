import { defineMessages } from 'react-intl'

export const scope = 'AuthorizedInstitutions'
export default defineMessages({
  authorizedInstitutions: {
    id: `${scope}.AuthorizedInstitutions`,
    defaultMessage: 'Authorized Institutions'
  },
  viewDetails: {
    id: `${scope}.ViewDetails`,
    defaultMessage: 'View details'
  },
  save: {
    id: `${scope}.Save`,
    defaultMessage: 'Save'
  },
  emptyInstitution: {
    id: `${scope}.EmptyInstitution`,
    defaultMessage: 'No financial institutions have been authorized yet.'
  },
  selectLocalTimeZone: {
    id: `${scope}.SelectLocalTimeZone`,
    defaultMessage: 'Select local time zone'
  },
  country: {
    id: `${scope}.Country`,
    defaultMessage: 'Country'
  },
  noTimeZoneFound: {
    id: `${scope}.NoTimeZoneFound`,
    defaultMessage: 'No result found.'
  },
  saved: {
    id: `${scope}.Saved`,
    defaultMessage: 'Saved'
  },
  contentErrorModal: {
    id: `${scope}.ContentErrorModal`,
    defaultMessage:
      'The engagement has failed during update engagement. Please try to update again.'
  },
  within24HourErrorContent: {
    id: `${scope}.Within24HourErrorContent`,
    defaultMessage:
      'You cannot edit the local time zone of a financial institution within 24 hours before a scheduled data extraction task.'
  },
  within24HourErrorHeader: {
    id: `${scope}.Within24HourErrorHeader`,
    defaultMessage: 'Your local time zone cannot be edited'
  },
  invalidAccessTokenInstitution: {
    id: `${scope}.InvalidAccessTokenInstitution`,
    defaultMessage: 'Consent ID has expired.'
  },
  reAuthenticate: {
    id: `${scope}.ReAuthenticate`,
    defaultMessage: 'Re-Authenticate'
  },
  btnClose: {
    id: `${scope}.BtnClose`,
    defaultMessage: 'Close'
  },
  btnCancel: {
    id: `${scope}.BtnCancel`,
    defaultMessage: 'Cancel'
  },
  btnYes: {
    id: `${scope}.BtnYes`,
    defaultMessage: 'Yes'
  },
  canNotReAuthenticate: {
    id: `${scope}.CanNotReAuthenticate`,
    defaultMessage: 'You cannot re-authenticate the consent ID(s), only enagement owner(s) can do so.'
  },
  connectWidthEngagementOwner: {
    id: `${scope}.ConnectWidthEngagementOwner`,
    defaultMessage: 'Please connect with your engagement owner(s) to re-authenticate the consent ID(s)  before they expire.'
  },
  messageReAuthenticateHeader: {
    id: `${scope}.MessageReAuthenticateHeader`,
    defaultMessage: 'Re-authenticate consent ID(s) for the selected Financial Institution(s).'
  },
  messageReAuthenticateBody: {
    id: `${scope}.MessageReAuthenticateBody`,
    defaultMessage: `You are requesting to re-authenticate consent ID(s) for: {listGroupNameName}Are you sure you want to send the request?`
  },
  consentExpires:{
    id: `${scope}.ConsentExpires`,
    defaultMessage: 'Consent ID expires on:'
  },
  noFutherReAuthenticate:{
    id: `${scope}.NoFutherReAuthenticate`,
    defaultMessage: 'No further re-authentication possible for the consent ID. Resend an authorization request to your client to proceed.'
  },
  lastDateReAuthenticate:{
    id: `${scope}.LastDateReAuthenticate`,
    defaultMessage: 'Re-authentication request last sent on {date}.'
  },
  expired:{
    id: `${scope}.Expired`,
    defaultMessage: 'EXPIRED '
  }
})
