import React from 'react'
import { Grid } from 'semantic-ui-react'

import { Header } from 'src/components'

import { engagementSettingsMessages } from './constants'

const SettingHeader = () => {
  
  return (
    <div className='engagement-settings__header'>
      <Grid columns='equal'>
        <Grid.Column>
          <Header as='h1'>{engagementSettingsMessages.engagementSettings}</Header>
        </Grid.Column>
      </Grid>
    </div>
  )
}

export default SettingHeader