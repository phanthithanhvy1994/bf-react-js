import React from 'react'
import { FormattedMessage } from 'react-intl'

import messages from './messages'

const portfolioMessages = {
  portfolio: <FormattedMessage {...messages.portfolio} />,
  listOfEngagementsHeader: <FormattedMessage {...messages.listOfEngagementsHeader} />,
  emptyEngagement: <FormattedMessage {...messages.emptyEngagement} />,
  deleteBtn: messages.deleteBtn,
  deleteEngagementContent: messages.deleteEngagementContent,
  rejectEngagementContent: messages.rejectEngagementContent,
  cancelBtn: messages.cancelBtn,
  rejectBtn: messages.rejectBtn,
  unsuccessfullyDel: <FormattedMessage {...messages.unsuccessfullyDel} />,
  geoPopup: <FormattedMessage {...messages.geoPopup} />,
  versionPopup: <FormattedMessage {...messages.versionPopup} />
}

const creationPrompt = {
  createEngagement: <FormattedMessage {...messages.createEngagement} />
}

const steps = {
  stepOneEC: 1,
  stepTwoEC: 2
}

const actionType = {
  TOGGLE_POPUP: 'TOGGLE_POPUP',
  SET_CURRENT_STEP: 'SET_CURRENT_STEP',
  SET_CURRENT_DATA: 'SET_CURRENT_DATA',
  SET_INIT_DATA: 'SET_INIT_DATA'
}

const statusInProgress = 'In-progress'
const statusSubmitted = 'Submitted for deletion'
const statusApproved = 'Approved Deletion'
const actionDelType = {
  submit: 'submit',
  approve: 'approve',
  reject: 'reject'
}

export {
  creationPrompt,
  portfolioMessages,
  steps,
  actionType,
  statusSubmitted,
  statusApproved,
  actionDelType,
  statusInProgress
}
