import { defineMessages } from 'react-intl'

export const scope = 'TeamMember'

export default defineMessages({
  teamManagement: {
    id: `${scope}.TeamManagement`,
    defaultMessage: 'Team Management'
  },
  manageTeamBtn: {
    id: `${scope}.ManageTeamBtn`,
    defaultMessage: 'Manage team'
  },
  emptyRecords: {
    id: `${scope}.EmptyRecords`,
    defaultMessage: 'No records yet.'
  },
  cellName: {
    id: `${scope}.CellName`,
    defaultMessage: 'Name'
  },
  cellEmail: {
    id: `${scope}.CellEmail`,
    defaultMessage: 'Email'
  },
  cellRole: {
    id: `${scope}.CellRole`,
    defaultMessage: 'Role'
  },
  unsuccessfullyGetTeamMgmtList: {
    id: `${scope}.UnsuccessfullyGetTeamMgmtList`,
    defaultMessage: 'Can not get team member list. Please try again'
  },
  updatedSuccess: {
    id: `${scope}.UpdatedSuccess`,
    defaultMessage: 'Update successful'
  },
  errorEngagementDeleted: {
    id: `${scope}.ErrorEngagementDeleted`,
    defaultMessage: 'The Audit team is in the process of deleting this engagement. Please reach out to your Audit team for questions.'
  }
})
