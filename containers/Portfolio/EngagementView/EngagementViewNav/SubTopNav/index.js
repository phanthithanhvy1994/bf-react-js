import React from 'react'
import { useSelector } from 'react-redux'

import { appSettings } from 'src/config/index'
import { HorizontalMenu } from 'src/components'
import { dataSources } from './constants'
import { currentEngagementSelector } from 'src/containers/Portfolio/Redux'

const SubTopNav = () => {
  const currentEngagement = useSelector(currentEngagementSelector)
  const dataSourcesFilter = dataSources.filter(obj => !!currentEngagement.isEnableMatching || !_.includes(appSettings.hideEngagementView, obj.name))

  return (
    <HorizontalMenu
      dataSources={dataSourcesFilter}
      classes='sub-top-nav'
    />
  )
}

export default SubTopNav