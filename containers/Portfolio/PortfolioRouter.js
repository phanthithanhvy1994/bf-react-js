import React from 'react'
import { Route } from 'react-router-dom'

import { routes, engagementViewName } from 'src/config'

import Portfolio from '../Portfolio'
import GroupNameDataAuthorization from '../Portfolio/EngagementView/GroupNameDataAuthorization'
import AuthorizedInstitutions from '../Portfolio/EngagementView/GroupNameDataManagement/AuthorizedInstitutions'
import DataExtractionList from '../Portfolio/EngagementView/GroupNameDataManagement/DataExtractionList'
import Matching from '../Portfolio/EngagementView/Matching'
import TeamManagement from '../Portfolio/EngagementView/TeamManagement'
import TransactionalDataManagement from '../Portfolio/EngagementView/TransactionalDataManagement'
import EngagementSettings from '../Setting/EngagementSettings'

const PortfolioRouter = () => {
  return (
    <>
      <Route exact path={routes.portfolio.index} component={Portfolio} />
      <Route path={routes.portfolio.engagementSettings} component={EngagementSettings} />
      <Route path={routes.portfolio.engagementView.GroupNameDataAuthorization} component={GroupNameDataAuthorization} />
      <Route path={routes.portfolio.engagementView.GroupNameDataManagement.authorizedInstitutions} component={AuthorizedInstitutions} />
      <Route path={routes.portfolio.engagementView.GroupNameDataManagement.dataExtractionList} component={DataExtractionList} />
      <Route path={routes.portfolio.engagementView.transactionDataManagement} component={TransactionalDataManagement} />
      <Route path={routes.portfolio.engagementView.matching} component={Matching} />
      <Route path={routes.portfolio.engagementView.teamManagement} component={TeamManagement} />
    </>
  )
}

export default PortfolioRouter
