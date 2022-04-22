import React from 'react'
import { FormattedMessage } from 'react-intl'

import messages from './messages'
import { defaultTimeLimitEditingBDARequest } from 'src/config/constants'

const ViewResendBDARequestMes = {
  leaveModalHeader: messages.leaveModalHeader,
  leaveModalContent: messages.leaveModalContent,
  cancelBDABtn: messages.cancelBtn,
  cancelBtn: <FormattedMessage {...messages.cancelBtn} />,
  nextBtn: <FormattedMessage {...messages.nextBtn} />,
  yesBtn: messages.yesBtn,
  linkStatus: <FormattedMessage {...messages.linkStatus} />,
  selectedFinancialInstitutions: <FormattedMessage {...messages.selectedFinancialInstitutions} />,
  authorized: <FormattedMessage {...messages.authorized} />,
  pendingAuthorization: <FormattedMessage {...messages.pendingAuthorization} />,
  clientDetails: <FormattedMessage {...messages.clientDetails} />,
  firstName: <FormattedMessage {...messages.firstName} />,
  lastName: <FormattedMessage {...messages.lastName} />,
  email: <FormattedMessage {...messages.email} />,
  clientInformation: <FormattedMessage {...messages.clientInformation} />,
  financialInstitutions: <FormattedMessage {...messages.financialInstitutions} />,
  sendBtn: <FormattedMessage {...messages.sendBtn} />,
}

const steps = {
  clientInfo: 0,
  institutions: 1
}

const actionType = {
  SET_CURRENT_STEP: 'SET_CURRENT_STEP',
  SET_CURRENT_DATA: 'SET_CURRENT_DATA',
  SET_INIT_DATA: 'SET_INIT_DATA'
}
const limitTimeEditingBDA = 1000 * 60 * (_.get(window.appsettings, 'TimeLimitEditingBDARequest', defaultTimeLimitEditingBDARequest)) //minutes setting to milliseconds

export {
  ViewResendBDARequestMes,
  steps,
  actionType,
  limitTimeEditingBDA
}
