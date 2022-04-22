import React from 'react'
import { FormattedMessage } from 'react-intl'

import messages from './messages'

const steps = {
  default: 0,
  next: 1
}

const actionType = {
  SET_CURRENT_STEP: 'SET_CURRENT_STEP',
  SET_CURRENT_DATA: 'SET_CURRENT_DATA',
  SET_INIT_DATA: 'SET_INIT_DATA'
}

const requestMessages = {
  cancelBtn: <FormattedMessage {...messages.cancelBtn} />,
  cancelBDABtn: messages.cancelBtn,
  nextBtn: <FormattedMessage {...messages.nextBtn} />,
  sendBtn: <FormattedMessage {...messages.sendBtn} />,
  closeBtn: messages.closeBtn,
  yesBtn: messages.yesBtn,
  confirmBtn: messages.confirmBtn,
  firstName: <FormattedMessage {...messages.firstName} />,
  lastName: <FormattedMessage {...messages.lastName} />,
  email: <FormattedMessage {...messages.email} />,
  clientInformation: <FormattedMessage {...messages.clientInformation} />,
  clientDetails: <FormattedMessage {...messages.clientDetails} />,
  country: <FormattedMessage {...messages.country} />,
  financialInstitutions: <FormattedMessage {...messages.financialInstitutions} />,
  selectIns: <FormattedMessage {...messages.selectIns} />,
  addOtherCountry: <FormattedMessage {...messages.addOtherCountry} />,
  firstNameRequired: <FormattedMessage {...messages.firstNameRequired} />,
  lastNameRequired: <FormattedMessage {...messages.lastNameRequired} />,
  emailRequired: <FormattedMessage {...messages.emailRequired} />,
  somethingWentWrong: <FormattedMessage {...messages.somethingWentWrong} />,
  sentSuccess: messages.sentSuccess,
  warningEmailHeader: messages.warningEmailHeader,
  warningEmailContent: messages.warningEmailContent,
  headerConfirm: messages.headerConfirm,
  contentConfirm: messages.contentConfirm,
  sendErrorByEngagementDeleted: <FormattedMessage {...messages.sendErrorByEngagementDeleted} />
}

export {
  steps,
  actionType,
  requestMessages
}
