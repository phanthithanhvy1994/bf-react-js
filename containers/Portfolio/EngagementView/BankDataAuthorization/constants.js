import React from 'react'
import { FormattedMessage } from 'react-intl'

import { Button } from 'src/components'

import messages from './messages'

const Authorization = {
  deleteBtn: <FormattedMessage {...messages.deleteBtn} />,
  createRequest: <FormattedMessage {...messages.createRequest} />,
  resendBtn: <FormattedMessage {...messages.resendBtn} />,
  emptyRequests: <FormattedMessage {...messages.emptyRequests} />,
  limitModalHeader: messages.limitModalHeader,
  limitModalContent: messages.limitModalContent,
  closeBtn: messages.closeBtn,
  resendModalContent: messages.resendModalContent,
  noBtn: messages.noBtn,
  yesBtn: messages.yesBtn,
  deleteModalBodyContent: messages.deleteModalBodyContent,
  buttonDelete: messages.buttonDelete,
  buttonCancel: messages.buttonCancel,
  sendSuccess: messages.sendSuccess,
  sendErrorByEngagementDeleted: <FormattedMessage {...messages.sendErrorByEngagementDeleted} />,
  SendErrorByEngagementEdited: <FormattedMessage {...messages.SendErrorByEngagementEdited} />
}

const headerTable = [
  {
    text: <FormattedMessage {...messages.cellEmpty} />,
    className: 'cbx-clm'
  },
  {
    text: <FormattedMessage {...messages.clientName} />,
    className: 'client-name'
  },
  {
    text: <FormattedMessage {...messages.clientEmail} />,
    className: 'client-email'
  },
  {
    text: <FormattedMessage {...messages.sendDate} />,
    className: 'send-date'
  },
  {
    text: <FormattedMessage {...messages.linkStatus} />,
    className: 'status'
  },
  {
    text: <FormattedMessage {...messages.author} />,
    colSpan: 2,
    className: 'header-authorize'
  },
  {
    text: <FormattedMessage {...messages.cellEmpty} />,
    className: 'resend-col'
  },//resent btn
  {
    text: <FormattedMessage {...messages.cellEmpty} />,
    type: 'collap',
    className: 'collap-col',
  } //colllap btn
]

const columnsDetail = (onCheckboxChange, handleResendRequest, handleViewRequest, requests) => [
  {
    type: 'checkbox',
    func: onCheckboxChange
  },
  {
    type: 'popup',
    value: requests.clientName,
    className: 'client-name'
  },
  {
    type: 'popup',
    value: requests.clientEmail,
    className: 'client-email'
  },
  {
    value: requests.linkStatus != BDA_STATUS.FAILED ? window.localize.toLocalDate(requests.sendDate): '',
    className: 'send-date'
  },
  {
    value: requests.linkStatus,
    className: 'status'
  },
  {
    value: requests.numberOfAuthorizedInstitution,
    className: 'authorrized'
  },
  {
    value: <div className='icon--info' onClick={() => handleViewRequest(requests)}></div>,
    className: 'authorrized-icon'
  },
  {
    value: <Button className='primary-btn btn--resend' onClick={() => handleResendRequest(requests)}>{Authorization.resendBtn}</Button>,
    className: 'resend-col'
  },
  {
    className: 'collap-col',
    type: 'collap'
  }
]

const columnsCollapChild = (requests) => [
  {
    value: '',
    className: 'cbx-clm'
  },
  {
    value: '',
    className: 'client-name'
  },
  {
    value: '',
    className: 'client-email'
  },
  {
    value: requests?.linkStatus != BDA_STATUS.FAILED ? window.localize.toLocalDate(requests?.sendDate) : '',
    className: 'send-date'
  },
  {
    value: requests.linkStatus,
    className: 'status'
  },
  {
    value: '',
    className: 'authorrized'
  },
  {
    value: '',
    className: 'authorrized-icon'
  },
  {
    value: '',
    className: 'resend-col'
  },
  {
    value: '',
    className: 'collap-col',
    type: 'collap'
  }
]

const MODE = {
  VIEW: 'view',
  EDIT: 'edit',
  CREATE: 'create'
}

const BDA_STATUS = {
  ACTIVE: 'Active',
  FAILED: 'Failed',
  EXPIRED: 'Expired'
}

export {
  Authorization,
  headerTable,
  columnsDetail,
  columnsCollapChild,
  MODE,
  BDA_STATUS
}