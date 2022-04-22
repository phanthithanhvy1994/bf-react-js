import React, { useEffect, useContext, useMemo } from 'react'
import { Grid } from 'semantic-ui-react'
import { useSelector } from 'react-redux'

import LayoutContext from 'src/layouts/context'
import { Container, Header } from 'src/components'

import UserSettingForm from './userSettingForm'
import { userSettingsMessages } from './constants'
import { settingsSelector } from './Redux'
import './styles.scss'

const UserProfile = () => {
  const { setShowEngagementDropdown, setShowBackPortfolio } = useContext(LayoutContext)
  const settingsInfo = useSelector(settingsSelector)
  
  const displayFullName = useMemo(() => {
    let result = ''
    if (!_.isEmpty(settingsInfo) && settingsInfo.user && settingsInfo.user.lastName && settingsInfo.user.firstName) {
      result = `${settingsInfo.user.lastName}, ${settingsInfo.user.firstName}`
      if(settingsInfo.user.countryDesc) {
        result = result + `(${settingsInfo.user.countryDesc})`
        if(settingsInfo.user.officeDesc) {
          result = `${settingsInfo.user.lastName}, ${settingsInfo.user.firstName} (${settingsInfo.user.countryDesc}-${settingsInfo.user.officeDesc.split('-')[0]})`
          if(settingsInfo.user.organizationDesc) {
            result =  `${settingsInfo.user.lastName}, ${settingsInfo.user.firstName} (${settingsInfo.user.countryDesc}-${settingsInfo.user.officeDesc.split('-')[0]}-${settingsInfo.user.organizationDesc})`
          }
        }
      }
    }
    return result
  }, [settingsInfo])

  const formatPhoneNumber = (phone) => {
    if (phone) {
      const match = phone.match(/^(\d{1,3})([-])(\d{3})(\d{3})(\d+)$/)
      if (match) {
        return `+${match[1]} (${match[3]}) ${match[4]}${match[2]}${match[5]}`
      }
    }
    return phone || ''
  }

  useEffect(() => {
    setShowEngagementDropdown(false)
    setShowBackPortfolio(true)
  }, [])

  return (
    !_.isEmpty(settingsInfo) &&
    <div className='primary-card user-settings'>
      <Container>
        <div className='user-settings__profile--div'>
          <Grid columns='equal'>
            <Grid.Row>
              <Grid.Column>
                <Header as='h1'>{userSettingsMessages.userProfile}</Header>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
        <div className='primary-card user-settings__information'>
          <div className='primary-card__header'>
            <Header as='h3'>{userSettingsMessages.personalInformation}</Header>
          </div>
          <div className='primary-card__content'>
            <div className='content-wrapper'>
              <Header as='h4'>{displayFullName}</Header>
              <Header as='h4'>{settingsInfo.user.accountType ? settingsInfo.user.accountType : ''}</Header>
              <Header as='h4'>{settingsInfo.user.email ? settingsInfo.user.email : ''}</Header>
              <Header as='h4'>{formatPhoneNumber(settingsInfo.user.phoneNumber)}</Header>
            </div>
          </div>
        </div>
        <UserSettingForm />
      </Container>
    </div>
  )
}

export default UserProfile