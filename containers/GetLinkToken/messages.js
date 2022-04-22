import { defineMessages } from 'react-intl'

export const scope = 'GetLinkToken'
export default defineMessages({
  linkExpired: {
    id: `${scope}.LinkExpired`,
    defaultMessage: 'The link you followed has expired.',
  },
  requestDeleted: {
    id: `${scope}.RequestDeleted`,
    defaultMessage: 'The request you are trying to follow has been deleted.'
  },
  engagementDeleted: {
    id: `${scope}.EngagementDeleted`,
    defaultMessage: 'The Audit team is in the process of deleting this engagement. Please reach out to your Audit team for questions.'
  },
  unableConnectDirectId: {
    id: `${scope}.UnableConnectDirectId`,
    defaultMessage: 'Unable to connect to DirectID/Financial Institution. Please reach out to technology support or your engagement team for assistance.'
  },
  requestAuthorized: {
    id: `${scope}.RequestAuthorized`,
    defaultMessage: 'The following request has already been authorized.'
  },
  successfullyAuthorized: {
    id: `${scope}.SuccessfullyAuthorized`,
    defaultMessage: 'You have successfully authorized your financial institution.'
  },
  unSuccessfullyAuthorized: {
    id: `${scope}.UnSuccessfullyAuthorized`,
    defaultMessage: 'You have unsuccessfully authorized your financial institution. Please reach out to technology support or your engagement team for assistance.'
  },
  authorizeHasNotBeenAssigned: {
    id: `${scope}.AuthorizeHasNotBeenAssigned`,
    defaultMessage: 'The financial institution you tried to authorize has not been assigned to you by the auditor.'
  },
  selectAuthorizeAccess: {
    id: `${scope}.SelectAuthorizeAccess`,
    defaultMessage: 'Please select the required financial institution specified in the invitation email by clicking on its corresponding “Authorize Access” button.'
  },
  buttonClose: {
    id: `${scope}.ButtonClose`,
    defaultMessage: 'Close'
  }
})