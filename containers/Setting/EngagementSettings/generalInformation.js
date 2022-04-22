import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { Header } from 'src/components'
import { containersSelector } from 'src/containers/Setting/UserProfile/Redux'

import { engagementSettingsMessages } from './constants'

const GeneralInformation = (props) => {
  const { engagementSetting } = props
  const containers = useSelector(containersSelector)
  const [generalInformation, setGeneralInformation] = useState({
    selectedCloudCabinet: '',
    language: '',
    engagementType: ''
  })

  useEffect(() => {
    if (!_.isEmpty(engagementSetting) && !_.isEmpty(containers)) {
      setGeneralInformation({
        selectedCloudCabinet: containers?.find(container => container.containerCode === engagementSetting?.containerCode)?.containerName,
        language: engagementSetting?.engagementTaxonomies?.find(engagementTaxonomy => engagementTaxonomy.id === engagementSetting?.languageId)?.name,
        engagementType: engagementSetting?.engagementTaxonomies?.find(engagementTaxonomy => engagementTaxonomy.id === engagementSetting?.engagementTypeId)?.name,
      })
    }
  }, [engagementSetting, containers.length])

  return (
    <div className='primary-card general-information__wrapper'>
      <div className='primary-card__header general-information__title'>
          <Header as='h3'>{engagementSettingsMessages.generalInformation}</Header>
          <Header as='h4'>{engagementSettingsMessages.generalInformationGuideText}</Header>
      </div>
      <div className='primary-card__content general-information__content'>
        <div className='content-wrapper'>
          <Header as='h4'>{engagementSettingsMessages.selectedCloudCabinet}</Header>
          <div>{generalInformation.selectedCloudCabinet}</div>
          <Header as='h4'>{engagementSettingsMessages.language}</Header>
          <div>{generalInformation.language}</div>
          <Header as='h4'>{engagementSettingsMessages.engagementType}</Header>
          <div>{generalInformation.engagementType}</div>
        </div>
      </div>
    </div>
  )
}

export default GeneralInformation