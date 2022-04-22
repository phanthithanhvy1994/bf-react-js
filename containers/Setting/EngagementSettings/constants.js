import React from 'react'
import { FormattedMessage } from 'react-intl'

import { routes } from "src/config"

import messages from './messages'

const countries = [
  { 
    id: 48705600,
    code: 'CA',
    name: 'Canada'
  },
  { 
    id: 48706549,
    code: 'NL',
    name: 'Netherlands'
  },
  { 
    id: 48706627,
    code: 'UK',
    name: 'United Kingdom'
  }
]

const engagementSettingsMessages = {
  engagementSettings: <FormattedMessage {...messages.engagementSettings} />,
  generalInformation: <FormattedMessage {...messages.generalInformation} />,
  selectedCloudCabinet: <FormattedMessage {...messages.selectedCloudCabinet} />,
  language: <FormattedMessage {...messages.language} />,
  engagementType: <FormattedMessage {...messages.engagementType} />,
  engagementDetails: <FormattedMessage {...messages.engagementDetails} />,
  engagementName: <FormattedMessage {...messages.engagementName} />,
  periodEndDate: <FormattedMessage {...messages.periodEndDate} />,
  country: <FormattedMessage {...messages.country} />,
  entityDetails: <FormattedMessage {...messages.entityDetails} />,
  entityName: <FormattedMessage {...messages.entityName} />,
  entityChargeCode: <FormattedMessage {...messages.entityChargeCode} />,
  saveChanges: <FormattedMessage {...messages.saveChanges} />,
  saved: <FormattedMessage {...messages.saved} />,
  generalInformationGuideText: <FormattedMessage {...messages.generalInformationGuideText} />,
  settingFormGuideText: <FormattedMessage {...messages.settingFormGuideText} />,
  contentErrorModal: <FormattedMessage {...messages.contentErrorModal} />,
  sendErrorByEngagementDeleted: <FormattedMessage {...messages.sendErrorByEngagementDeleted} />,
  matchingFeature: <FormattedMessage {...messages.matchingFeature} />,
  matchingHeaderWarning: messages.matchingHeaderWarning,
  matchingContentWarning: messages.matchingContentWarning,
  cancel: messages.cancel,
  yes: messages.yes,
  offMatchingHeaderWarning: <FormattedMessage {...messages.offMatchingHeaderWarning} />,
  offMatchingContentWarning: <FormattedMessage {...messages.offMatchingContentWarning} />,
  close: <FormattedMessage {...messages.close} />
}

const showPromptUrls = [routes.index, routes.portfolio.index, routes.setting.user]

export { engagementSettingsMessages, countries, showPromptUrls }