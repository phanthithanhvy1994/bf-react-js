import React from 'react'
import { FormattedMessage } from 'react-intl'

import messages from './messages'
import { statusSubmitted } from '../constants'

const headerTable = [
  { text: <FormattedMessage {...messages.cellEmpty} /> },
  { text: <FormattedMessage {...messages.cellEngagement} /> },
  { text: <FormattedMessage {...messages.cellEntity} /> },
  { text: <FormattedMessage {...messages.cellStatus} /> },
  { text: <FormattedMessage {...messages.cellPeriodEndDate} /> },
  { text: <FormattedMessage {...messages.cellEngagementOwner} /> }
]

const columnsDetail = (handleOnChangeRadioItem, engagement) => {
  const isDisabledRow = engagement.status === statusSubmitted
  const classNameRow = isDisabledRow ? 'row-disabled' : 'rowClicked'
  return [
    {
      type: 'radio',
      func: handleOnChangeRadioItem,
      className: `eng-radio ${isDisabledRow && 'row-disabled'}`
    },
    {
      className: `${classNameRow} eng-name`,
      type: 'popup',
      value: engagement.name
    },
    {
      className: `${classNameRow} eng-ent`,
      type: 'popup',
      value: engagement?.entityName || engagement?.entity?.name
    },
    {
      field: 'status',
      className: classNameRow,
      value: engagement.status
    },
    {
      className: classNameRow,
      type: 'date',
      value: engagement.periodEndDate
    },
    {
      field: 'createUserName',
      className: classNameRow,
      value: `${engagement.owner}`
    }
  ]
}

const configPagination = {
  boundaryRange: 1,
  siblingRange: 1,
  itemPerPage: 17
}

export {
  columnsDetail,
  headerTable,
  configPagination
}