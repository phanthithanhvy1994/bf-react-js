
import { routes, engagementViewName } from 'src/config'

const dataSources = [
  {
    name: engagementViewName.GroupNameDataAuthorization,
    activeItem: 'authorization',
    label: 'GroupName Data Authorization',
    href: routes.portfolio.engagementView.GroupNameDataAuthorization
  },
  {
    name: engagementViewName.GroupNameDataManagement,
    activeItem: 'GroupNamedata-management',
    label: 'GroupName Data Management',
    subItems: [
      {
        name: 'authorizedInstitutions',
        activeItem: 'authorizedInstitutions',
        label: 'Authorized Institutions',
        href: routes.portfolio.engagementView.GroupNameDataManagement.authorizedInstitutions
      },
      {
        name: 'dataExtractionList',
        activeItem: 'dataExtractionList',
        label: 'Data Extraction List',
        href: routes.portfolio.engagementView.GroupNameDataManagement.dataExtractionList
      }
    ]
  },
  {
    name: engagementViewName.transactionDataManagement,
    activeItem: 'transactional',
    label: 'Transactional Data Management',
    href: routes.portfolio.engagementView.transactionDataManagement
  },
  {
    name: engagementViewName.matching,
    activeItem: 'matching',
    label: 'Matching',
    href: routes.portfolio.engagementView.matching
  },
  {
    name: engagementViewName.teamManagement,
    activeItem: 'team',
    label: 'Team Management',
    href: routes.portfolio.engagementView.teamManagement
  }
]

export {
  dataSources
}
