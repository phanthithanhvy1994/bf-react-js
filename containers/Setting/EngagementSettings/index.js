import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { Container } from 'src/components'
import { getCurrentEngagementByIdThunk, currentEngagementSelector } from 'src/containers/Portfolio/Redux'
import EngagementViewNav from 'src/containers/Portfolio/EngagementView/EngagementViewNav'

import SettingForm from './settingForm'
import GeneralInformation from './generalInformation'
import SettingHeader from './settingHeader'
import { REQUEST_MODEL } from 'src/config/constants'
import { engagementOwnerCode } from 'src/config/constants'
import './styles.scss'

const EngagementSettings = () => {
  const dispatch = useDispatch()
  const currentEngagement = useSelector(currentEngagementSelector)
  const { currentUser } = useSelector((state) => state.account)
  const isEngagementOwner = (_.find(_.get(currentEngagement, 'teamMembers', []), { 'id': _.get(currentUser, 'user.userId') }) || []).roleId === engagementOwnerCode
  const { geoCode, containerCode, engagementId } = useParams()
  const model = REQUEST_MODEL
  model.uri = { engagementId: engagementId, containerCode }
  model.geoCode = geoCode

  useEffect(() => {
    dispatch(getCurrentEngagementByIdThunk(model))
  }, [])

  return (
    <>
      {!_.isEmpty(currentEngagement) &&
        (
          <>
            <EngagementViewNav />
            <div className='engagement-settings'>
              <Container>
                <SettingHeader />
                <GeneralInformation engagementSetting={currentEngagement} />
                <SettingForm engagementSetting={currentEngagement} isEngagementOwner={isEngagementOwner} />
              </Container>
            </div>
          </>
        )
      }
    </>
  )
}

export default EngagementSettings