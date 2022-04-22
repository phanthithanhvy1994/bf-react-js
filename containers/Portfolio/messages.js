import { defineMessages } from 'react-intl'

export const scope = 'Portfolio'

export default defineMessages({
  portfolio: {
    id: `${scope}.Portfolio`,
    defaultMessage: 'Portfolio'
  },
  listOfEngagementsHeader: {
    id: `${scope}.ListOfEngagementsHeader`,
    defaultMessage: 'List of engagements'
  },
  emptyEngagement: {
    id: `${scope}.EmptyEngagement`,
    defaultMessage: 'You don’t have any engagements yet. Click the button above to create one.'
  },
  deleteBtn: {
    id: `${scope}.DeleteBtn`,
    defaultMessage: 'Delete'
  },
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
    defaultMessage: 'Period End Date'
  },
  cellEngagementOwner: {
    id: `${scope}.CellEngagementOwner`,
    defaultMessage: 'Engagement Owner'
  },
  cellEmpty: {
    id: `${scope}.CellEmpty`,
    defaultMessage: ' '
  },
  deleteEngagementContent: {
    id: `${scope}.DeleteEngagementContent`,
    defaultMessage: 'Are you sure you want to delete this engagement?'
  },
  rejectEngagementContent: {
    id: `${scope}.RejectEngagementContent`,
    defaultMessage: 'Are you sure you want to reject deletion for this engagement?'
  },
  cancelBtn: {
    id: `${scope}.CancelBtn`,
    defaultMessage: 'Cancel'
  },
  rejectBtn: {
    id: `${scope}.RejectBtn`,
    defaultMessage: 'Reject'
  },
  unsuccessfullyDel: {
    id: `${scope}.UnsuccessfullyDel`,
    defaultMessage: 'This engagement is unsuccessfully deleted. Please try to delete again.'
  },
  createEngagement: {
    id: `${scope}.CreateEngagement`,
    defaultMessage: 'Create engagement'
  },
  geoPopup: {
    id: `${scope}.GeoPopup`,
    defaultMessage: 'Only EMA is supported for current version.'
  },
  versionPopup: {
    id: `${scope}.VersionPopup`,
    defaultMessage: 'Future release version will come soon.'
  }
})