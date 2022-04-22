import React, { useMemo } from 'react'
import { useSelector } from 'react-redux'

import { HeaderDropDown } from 'src/components'
import { currentEngagementSelector, listEngagementsSelector } from 'src/containers/Portfolio/Redux'
import { statusInProgress } from 'src/containers/Portfolio/constants'

import { dataSource } from './constants'
import './styles.scss'

const EngagementDropdown = () => {
  const currentEngagement = useSelector(currentEngagementSelector)
  const dataGetEngagements = useSelector(listEngagementsSelector)

  const listOfEngagements = useMemo(() => {
    let result = dataSource
    if (!_.isEmpty(dataGetEngagements)) {
      let top5Engagements = []
      top5Engagements = _.orderBy(dataGetEngagements.filter((eng) => {
        return eng.status == statusInProgress && eng.id !== currentEngagement.id && eng.entityName.toLowerCase() === _.get(currentEngagement, ['entity','name'], '').toLowerCase() && eng.containerCode === currentEngagement.containerCode
      }), 'dateCreated', 'desc').slice(0, 5)
      result = [...dataSource, ...top5Engagements]
    }
    return result
  }, [dataGetEngagements, currentEngagement])

  return (
    <HeaderDropDown
      inverted secondary
      dataSourceName={currentEngagement.name}
      dataSource={listOfEngagements}
      classes='menu-engagement-setting'
    />
  )
}

export default EngagementDropdown
