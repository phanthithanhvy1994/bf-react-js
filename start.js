import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { IntlProvider } from 'react-intl'
import { MsalProvider, MsalAuthenticationTemplate } from '@azure/msal-react'
import { EventType, InteractionType } from '@azure/msal-browser'
import { Switch, Route, BrowserRouter } from 'react-router-dom'
import history from './utils/history'
import { getLanguageFile } from './utils/trannslation'
import configureStore from './configureStore'
import { DEFAULT_LOCALE, appLocales } from './i18n'
import { translationPath } from './config/constants/index'
import { IsDevelopment } from './utils/env'
import { msalInstance } from './utils/authenUtils'
import { defaultGeo, defaultContainer, routes } from 'src/config'
import GetLinkToken  from 'src/containers/GetLinkToken/index'
import App from './app'
import DirectIdCallback from 'src/containers/GetLinkToken/directIdCallback'

const MOUNT_NODE = document.getElementById('app')
const store = configureStore({}, history)
const locale = DEFAULT_LOCALE

let languageFiles = []
if (IsDevelopment()) {
  _.forEach(appLocales, function(value) {
    languageFiles.push(import(`.${translationPath}${value}.json`))
  })
} else {
  _.forEach(appLocales, function(value) {
    languageFiles.push(getLanguageFile(`${translationPath}${value}.json`))
  })
}

window.defaultGeo = defaultGeo
window.defaultContainer = defaultContainer

const accounts = msalInstance.getAllAccounts()
if (accounts.length > 0) {
  msalInstance.setActiveAccount(accounts[0])
}

msalInstance.addEventCallback(message => {
  switch (message.eventType) {
    case EventType.LOGIN_SUCCESS:
      msalInstance.setActiveAccount(message.payload.account)
    case EventType.ACQUIRE_TOKEN_SUCCESS:
      if (message.interactionType === InteractionType.Redirect) {
        localStorage.setItem("access_token", message.payload.accessToken)
        localStorage.setItem("isLoadAfterLogin", true)
      }
      break
    default:
      break
  }
})

Promise.all(languageFiles).then((values) => {
  let translationMessages = {}
  _.forEach(appLocales, function(value, index) {
    translationMessages[value] = values[index]
  })

  ReactDOM.render(
    <IntlProvider locale={locale} messages={translationMessages[locale]}>
      <BrowserRouter>
        <Switch>
          <Route path={routes.invitation} component={GetLinkToken} />
          <Route path={routes.callbackDirectId} component={DirectIdCallback} />
          <Route>
            <MsalProvider instance={msalInstance}>
              <Provider store={store}>
                <ConnectedRouter history={history}>
                    <MsalAuthenticationTemplate interactionType={InteractionType.Redirect}>
                      <Suspense fallback={<div>Loading...</div>}>
                        <App />
                      </Suspense>
                    </MsalAuthenticationTemplate>
                </ConnectedRouter>
              </Provider>
            </MsalProvider>
          </Route>
        </Switch>
      </BrowserRouter>
     </IntlProvider >
    ,
    MOUNT_NODE
  )
})
