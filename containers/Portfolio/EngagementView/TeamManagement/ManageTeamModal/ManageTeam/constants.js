import React from 'react'
import { FormattedMessage } from 'react-intl'
import messages from './messages'

const manageTeamMessages = {
  manageTeam: <FormattedMessage {...messages.manageTeam} />,
  deactivateText: messages.deactivateText,
  cancelBtn: messages.cancelBtn,
  updateBtn: messages.updateBtn,
  searchGuideTitle: <FormattedMessage {...messages.searchGuideTitle} />,
  searchGuideContent: <FormattedMessage {...messages.searchGuideContent} />,
  addTeamMemberBtn: <FormattedMessage {...messages.addTeamMemberBtn} />,
  searchTeamMember: messages.searchTeamMember.defaultMessage,
  deactivateMemberHeader: messages.deactivateMemberHeader,
  deactivateMemberContent: messages.deactivateMemberContent,
  deactivateOwnerHeader: messages.deactivateOwnerHeader,
  deactivateOwnerContent: messages.deactivateOwnerContent,
  noResult: <FormattedMessage {...messages.noResult} />,
  mustBeEngagementOwnerAssigned: <FormattedMessage {...messages.mustBeEngagementOwnerAssigned} />,
  reactivateMember: <FormattedMessage {...messages.reactivateMember} />,
  exitsMember: messages.exitsMember,
  showMoreResult: <FormattedMessage {...messages.showMoreResult} />,
  minCharacters: <FormattedMessage {...messages.minCharacters} />,
  maxCharacters: <FormattedMessage {...messages.maxCharacters} />,
  roleRequired: <FormattedMessage {...messages.roleRequired} />,
  rolePlaceholder: messages.rolePlaceholder,
  errorMemberLeftFirm: messages.errorMemberLeftFirm
}

const DEFAULT_SEARCH = {
  Skip: 0,
  Top: 100,
  KeywordComparator: 2
}

const VALIDATE_SEARCH = {
  minLength: 3,
  maxLength: 100,
  maxResult: 50
}

const OPM_ACTIVE_STATUS = 'Active'

export { manageTeamMessages, DEFAULT_SEARCH, OPM_ACTIVE_STATUS, VALIDATE_SEARCH }