const currentEngagementSelector = (state) => state.engagement.currentEngagement
const listEngagementsSelector = (state) => state.engagement.listOfEngagements
const allTimeZonesSelector = (state) => state.engagement.allTimeZones
const listScheduleTasksSelector = (state) => state.engagement.listScheduleTasks
const listExtractionStatusSelector = (state) => state.engagement.listExtractionStatus

export {
  currentEngagementSelector,
  listEngagementsSelector,
  allTimeZonesSelector,
  listScheduleTasksSelector,
  listExtractionStatusSelector
}
