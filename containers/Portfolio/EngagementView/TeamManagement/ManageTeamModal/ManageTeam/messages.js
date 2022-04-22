import { defineMessages } from 'react-intl'

export const scope = 'TeamMember'

export default defineMessages({
  manageTeam: {
    id: `${scope}.ManageTeam`,
    defaultMessage: 'Manage team'
  },
  deactivateText: {
    id: `${scope}.DeactivateText`,
    defaultMessage: 'Deactivate'
  },
  cancelBtn: {
    id: `${scope}.CancelBtn`,
    defaultMessage: 'Cancel'
  },
  updateBtn: {
    id: `${scope}.UpdateBtn`,
    defaultMessage: 'Update team'
  },
  addTeamMemberBtn: {
    id: `${scope}.AddTeamMemberBtn`,
    defaultMessage: 'Add a team member'
  },
  searchTeamMember: {
    id: `${scope}.SearchTeamMember`,
    defaultMessage: 'Search by name or email'
  },
  deactivateMemberHeader: {
    id: `${scope}.DeactivateMemberHeader`,
    defaultMessage: 'Deactivating a team member'
  },
  deactivateMemberContent: {
    id: `${scope}.DeactivateMemberContent`,
    defaultMessage: 'Deactivating a team member will remove access for that team member within the engagement. Any work saved by that team member will not be deleted. A deactivated team member can be enabled again later.'
  },
  deactivateOwnerHeader: {
    id: `${scope}.DeactivateOwnerHeader`,
    defaultMessage: 'Are you sure?'
  },
  deactivateOwnerContent: {
    id: `${scope}.DeactivateOwnerContent`,
    defaultMessage: 'Deactivating yourself will remove access for the engagement. Any work saved will not be deleted. To get reactivated, you will need to contact the engagement owner.'
  },
  noResult: {
    id: `${scope}.NoResult`,
    defaultMessage: 'No matches were found.'
  },
  mustBeEngagementOwnerAssigned: {
    id: `${scope}.MustBeEngagementOwnerAssigned`,
    defaultMessage: 'There must be at least one engagement owner assigned to the team.'
  },
  reactivateMember: {
    id: `${scope}.ReactivateMember`,
    defaultMessage: 'This user has been reactivated to the engagement.'
  },
  exitsMember: {
    id: `${scope}.ExitsMember`,
    defaultMessage: 'User already exists in the engagement'
  },
  showMoreResult: {
    id: `${scope}.ShowMoreResult`,
    defaultMessage: 'Please refine your search further to see more results.'
  },
  minCharacters: {
    id: `${scope}.MinCharacters`,
    defaultMessage: 'Keyword or string must be at least three characters.'
  },
  rolePlaceholder: {
    id: `${scope}.RolePlaceholder`,
    defaultMessage: 'Select a role'
  },
  roleRequired: {
    id: `${scope}.RoleRequired`,
    defaultMessage: 'You must assign a role to each user.'
  },
  errorMemberLeftFirm: {
    id: `${scope}.ErrorMemberLeftFirm`,
    defaultMessage: `Updates cannot be completed due to following invalid user(s): {emails}.{br}Please deactivate invalid user and try again.`
  }
})
