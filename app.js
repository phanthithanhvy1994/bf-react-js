import React, { useEffect, useState } from 'react'
import { Switch, Route, Redirect, BrowserRouter as Router } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useIdleTimer } from 'react-idle-timer'
import { useMsal } from '@azure/msal-react'
import jwtDecode from 'jwt-decode'

import CustomPromptConfirm from 'src/containers/Common/Components/CustomPromptConfirm'
import { typePrompt } from 'src/containers/Common/Components/CustomPromptConfirm/constants'
import { Loader } from 'src/components'

import { DefaultLayout as Layout } from './layouts'
import { routes, appSettings } from 'src/config'
import { LOGGED_OUT_EVENT } from 'src/config/constants'
import { IsDevelopment } from './utils/env'
import PortfolioRouter from './containers/Portfolio/PortfolioRouter'
import NotFoundPage from './containers/NotFoundPage'
import AppContext from './context.js'
import SettingRouter from './containers/Setting/SettingRouter'
import { checkOrCreateNewUserServices, callGetOPMContainerMapping } from 'src/containers/Setting/Redux/services'

var localize = require('src/assets/js/localize.js')
let UIComponents
if (IsDevelopment()) {
  UIComponents = React.lazy(() => import('./components/UIComponents'))
}

function App() {
  window.localize = localize
  const dispatch = useDispatch()
  const { instance } = useMsal()
  const [open, setOpen] = useState(false)
  const [confirmCallback, setConfirmCallback] = useState(null)
  const [submitCB, setSubmitCB] = useState(null)
  const [type, setType] = useState(typePrompt.CONFIRM)
  const isLoadAfterLoginStatus = useSelector((state) => state.account.isLoadAfterLoginStatus)
  const isLoadAfterLogin = localStorage.getItem('isLoadAfterLogin')
  
  const handleOnIdle = event => {
    instance.logout()
  }

  const { getRemainingTime, getLastActiveTime } = useIdleTimer({
    timeout: 1000 * 60 * appSettings.sessionTimeout,
    onIdle: handleOnIdle,
    debounce: 500,
    crossTab: {
      type: 'localStorage',
      emitOnAllTabs: true
    }
  })

  const getConfirm = (message, callback) => {
    if (message === '') {
      setConfirmCallback((prevState) => callback)
      setOpen(true)
    }
    else {
      const warningData = JSON.parse(message)
      const { config, typeData } = warningData
      if (_.isNil(config))
        config = false
      if (!_.isNil(typeData))
        setType(typeData)
      if (config) {
        setConfirmCallback((prevState) => callback)
        setOpen(true)
      }
      else {
        callback(true)
      }
    }
  }

  useEffect(() => {
    if (!_.isNil(localStorage.getItem('access_token'))) {
      const { upn } = jwtDecode(localStorage.getItem('access_token'))
      if (isLoadAfterLogin == 'true') {
        checkOrCreateNewUserServices(dispatch, upn)
        localStorage.setItem('isLoadAfterLogin', false)
      } else {
        callGetOPMContainerMapping(dispatch, upn)
      }
    }

    window.addEventListener('storage', function(event) {
      if (event.key === LOGGED_OUT_EVENT) {
        instance.logout()
      }
    })
  }, [])

  const renderApp = () => {
    return (
      <AppContext.Provider value={{ submitCB, setSubmitCB }} >
        <Router getUserConfirmation={getConfirm}>
          <CustomPromptConfirm
            submitCB = {submitCB}
            open={open}
            type={type}
            confirmCallback={confirmCallback}
            setOpen={setOpen}
          />
          <Layout>
            <Switch>
              <Redirect exact from="/" to="/portfolio" />
              <Route path={routes.portfolio.index} component={PortfolioRouter} />
              <Route component={SettingRouter} />
              {IsDevelopment() && <Route path={routes.UIComponents} component={UIComponents} />}
              <Route component={NotFoundPage} />
            </Switch>
          </Layout>
        </Router>
      </AppContext.Provider>
    )
  }

  return (isLoadAfterLogin == 'false' || (isLoadAfterLogin == 'true' && isLoadAfterLoginStatus)) ? renderApp() : <Loader size='large' active />
}
export default App
