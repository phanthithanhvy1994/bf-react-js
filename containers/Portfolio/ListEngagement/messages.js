import { defineMessages } from 'react-intl'

export const scope = 'ListEngagement'

export default defineMessages({
  cellEngagement: {
    id: `${scope}.CellEngagement`,
    defaultMessage: 'Engagement'
  },
  cellEntity: {
    id: `${scope}.CellEntity`,
    defaultMessage: 'Entity'
  },
  cellStatus: {
    id: `${scope}.CellStatus`,
    defaultMessage: 'Status'
  },
  cellPeriodEndDate: {
    id: `${scope}.CellPeriodEndDate`,
    defaultMessage: 'Period-end date'
  },
  cellEngagementOwner: {
    id: `${scope}.CellEngagementOwner`,
    defaultMessage: 'Engagement owner'
  },
  cellEmpty: {
    id: `${scope}.CellEmpty`,
    defaultMessage: ' '
  }
})
