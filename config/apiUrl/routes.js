const routes = {
  index: '/',
  setting: {
    index: '/setting',
    user: '/setting/user'
  },
  UIComponents: '/ui-components',
  portfolio: {
    index: '/portfolio',
    detail: '/portfolio/:geoCode/:containerCode/:engagementId',
    engagementView: {
      GroupNameDataManagement: {
        authorizedInstitutions:
          '/portfolio/:geoCode/:containerCode/:engagementId/GroupNamedata-management-authorizedInstitutions',
        dataExtractionList:
          '/portfolio/:geoCode/:containerCode/:engagementId/GroupNamedata-management-dataExtractionList'
      },
      GroupNameDataAuthorization:
        '/portfolio/:geoCode/:containerCode/:engagementId/GroupNamedata-authorization',
      transactionDataManagement:
        '/portfolio/:geoCode/:containerCode/:engagementId/transactiondata-management',
      matching: '/portfolio/:geoCode/:containerCode/:engagementId/matching',
      teamManagement:
        '/portfolio/:geoCode/:containerCode/:engagementId/team-management',
    },
    engagementSettings:
      '/portfolio/:geoCode/:containerCode/:engagementId/engagementSettings'
  },
  engagement: {
    create: '/engagement/create'
  },
  invitation:
    '/geo/:geoCode/container/:container/containerId/:containerId/platform/:platform/invitationId/:engagementInstitutionInvitationClientId/invitationcode/:verify/:keyversion',
  callbackDirectId:
    '/directid/success'
}

export { routes }
