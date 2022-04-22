import { defineMessages } from 'react-intl'

export const scope = 'CreateEngagement'
export default defineMessages({
  createAnEngagement: {
    id: `${scope}.CreateAnEngagement`,
    defaultMessage: 'Create an engagement'
  },
  tellAboutEngagement: {
    id: `${scope}.TellAboutEngagement`,
    defaultMessage: 'Tell us about the engagement'
  },
  engagementName: {
    id: `${scope}.EngagementName`,
    defaultMessage: 'Engagement Name'
  },
  engagementNameRequired: {
    id: `${scope}.EngagementNameRequired`,
    defaultMessage: 'Engagement Name cannot be left empty.'
  },  
  engagementType: {
    id: `${scope}.EngagementType`,
    defaultMessage: 'Engagement Type'
  },
  engagementTypeRequired: {
    id: `${scope}.EngagementTypeRequired`,
    defaultMessage: 'Engagement Type cannot be left empty.'
  },
  periodEndDate: {
    id: `${scope}.PeriodEndDate`,
    defaultMessage: 'Period-end Date'
  },
  periodEndDateRequired: {
    id: `${scope}.PeriodEndDateRequired`,
    defaultMessage: 'Period-end Date cannot be left empty.'
  },
  country: {
    id: `${scope}.Country`,
    defaultMessage: 'Country'
  },
  countryRequired: {
    id: `${scope}.CountryRequired`,
    defaultMessage: 'Country cannot be left empty.'
  },
  tellAboutEntity: {
    id: `${scope}.TellAboutEntity`,
    defaultMessage: 'Tell us about the entity'
  },
  entityName: {
    id: `${scope}.EntityName`,
    defaultMessage: 'Entity Name'
  },
  entityNameRequired: {
    id: `${scope}.EntityNameRequired`,
    defaultMessage: 'Entity Name cannot be left empty.'
  },
  entityChargeCode: {
    id: `${scope}.EntityChargeCode`,
    defaultMessage: 'Entity Charge Code'
  },
  entityChargeCodeRequired: {
    id: `${scope}.EntityChargeCodeRequired`,
    defaultMessage: 'Entity Charge Code cannot be left empty.'
  },
  btnBack: {
    id: `${scope}.BtnBack`,
    defaultMessage: 'Back'
  },
  btnFinish: {
    id: `${scope}.BtnFinish`,
    defaultMessage: 'Finish'
  },
  contentErrorModal: {
    id: `${scope}.ContentErrorModal`,
    defaultMessage: 'The engagement has failed during engagement creation. Please try to create another one.',
  }
})