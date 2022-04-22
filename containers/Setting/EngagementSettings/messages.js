import { defineMessages } from 'react-intl'

export const scope = 'EngagementSettings'
export default defineMessages({
  engagementSettings: {
    id: `${scope}.EngagementSettings`,
    defaultMessage: 'Engagement Settings'
  },
  generalInformation: {
    id: `${scope}.GeneralInformation`,
    defaultMessage: 'General Information'
  },
  selectedCloudCabinet: {
    id: `${scope}.SelectedCloudCabinet`,
    defaultMessage: 'Selected Cloud Cabinet:'
  },
  language: {
    id: `${scope}.Language`,
    defaultMessage: 'Language:'
  },
  engagementType: {
    id: `${scope}.EngagementType`,
    defaultMessage: 'Engagement Type:'
  },
  engagementDetails: {
    id: `${scope}.EngagementDetails`,
    defaultMessage: 'Engagement details'
  },
  engagementName: {
    id: `${scope}.EngagementName`,
    defaultMessage: 'Engagement Name'
  },
  periodEndDate: {
    id: `${scope}.PeriodEndDate`,
    defaultMessage: 'Period-end Date'
  },
  country: {
    id: `${scope}.Country`,
    defaultMessage: 'Country'
  },
  entityDetails: {
    id: `${scope}.EntityDetails`,
    defaultMessage: 'Entity details'
  },
  entityName: {
    id: `${scope}.EntityName`,
    defaultMessage: 'Entity Name'
  },
  entityChargeCode: {
    id: `${scope}.EntityChargeCode`,
    defaultMessage: 'Entity Charge Code'
  },
  engagementNameRequired: {
    id: `${scope}.EngagementNameRequired`,
    defaultMessage: 'Engagement name cannot be left empty.'
  },  
  periodEndDateRequired: {
    id: `${scope}.PeriodEndDateRequired`,
    defaultMessage: 'Period-end date cannot be left empty.'
  },
  countryRequired: {
    id: `${scope}.CountryRequired`,
    defaultMessage: 'Country cannot be left empty.'
  },
  entityNameRequired: {
    id: `${scope}.EntityNameRequired`,
    defaultMessage: 'Entity name cannot be left empty.'
  },
  entityChargeCodeRequired: {
    id: `${scope}.EntityChargeCodeRequired`,
    defaultMessage: 'Entity charge code cannot be left empty.'
  },
  saveChanges: {
    id: `${scope}.SaveChanges`,
    defaultMessage: 'Save changes'
  },
  saved: {
    id: `${scope}.Saved`,
    defaultMessage: 'Changes have been saved!'
  },
  generalInformationGuideText: {
    id: `${scope}.GeneralInformationGuideText`,
    defaultMessage: 'This information is view-only'
  },
  settingFormGuideText: {
    id: `${scope}.SettingFormGuideText`,
    defaultMessage: 'Only you and your team will be able to edit the engagement general details.'
  },
  contentErrorModal: {
    id: `${scope}.ContentErrorModal`,
    defaultMessage: 'The engagement has failed during update engagement. Please try to update again.',
  },
  sendErrorByEngagementDeleted:{
    id: `${scope}.SendErrorByEngagementDeleted`,
    defaultMessage: 'The Audit team is in the process of deleting this engagement. Please reach out to your Audit team for questions.'
  },
  matchingFeature: {
    id: `${scope}.MatchingFeature`,
    defaultMessage: 'Matching Feature'
  },
  matchingHeaderWarning: {
    id: `${scope}.MatchingHeaderWarning`,
    defaultMessage: 'Matching feature will be turned off'
  },
  matchingContentWarning: {
    id: `${scope}.MatchingContentWarning`,
    defaultMessage: 'You are turning off the matching feature, which can no longer be accessed from engagement settings. Any matching/ transactional data management runs in progress will be cancelled. Do you want to proceed?'
  },
  cancel: {
    id: `${scope}.Cancel`,
    defaultMessage: 'Cancel'
  },
  yes: {
    id: `${scope}.Yes`,
    defaultMessage: 'Yes'
  },
  offMatchingHeaderWarning: {
    id: `${scope}.OffMatchingHeaderWarning`,
    defaultMessage: 'Matching feature is turned off'
  },
  offMatchingContentWarning: {
    id: `${scope}.OffMatchingContentWarning`,
    defaultMessage: 'Matching feature has been turned off by the engagement owner. Please contact your engagement owner for further guidance.'
  },
  close: {
    id: `${scope}.Close`,
    defaultMessage: 'Close'
  }
})
