import React from 'react'
import { Route } from 'react-router-dom'

import { routes } from 'src/config'
import UserProfile from './UserProfile'

const SettingRouter = () => {
  return (
    <>
      <Route path={routes.setting.user} component={UserProfile} />
    </>
  )
}

export default SettingRouter