import React from 'react'
import { FormattedMessage } from 'react-intl'

import messages from './messages'

const teamMemberMessages = {
  teamManagement: <FormattedMessage {...messages.teamManagement} />,
  manageTeamBtn: <FormattedMessage {...messages.manageTeamBtn} />,
  emptyRecords: <FormattedMessage {...messages.emptyRecords} />,
  unsuccessfullyGetTeamMgmtList: <FormattedMessage {...messages.unsuccessfullyGetTeamMgmtList} />,
  updatedSuccess: <FormattedMessage {...messages.updatedSuccess} />,
  errorByEngagementDeleted: <FormattedMessage {...messages.errorEngagementDeleted} />
}


const headerTable = [
  { text: <FormattedMessage {...messages.cellName} /> },
  { text: <FormattedMessage {...messages.cellEmail} /> },
  { text: <FormattedMessage {...messages.cellRole} /> }
]

const columnsDetail = (member) => {
  const disabledRow = !member.isActive
  return [
    {
      value: `${member?.firstName} ${member?.lastName}`,
      className: disabledRow ? 'disabledRow' : ''
    },
    {
      value: member?.email,
      className: disabledRow ? 'disabledRow' : ''
    },
    {
      value: member?.role,
      className: disabledRow ? 'disabledRow' : ''
    }
  ]
}

export {
  teamMemberMessages,
  headerTable,
  columnsDetail
}
