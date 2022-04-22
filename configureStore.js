/**
 * Create the store with dynamic reducers
 */
import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';

import createRootReducer from 'src/containers/reducers'

export default function configureStore(preloadedState, history) {
  const store = createStore(
    createRootReducer(history),
    preloadedState, composeWithDevTools(applyMiddleware(routerMiddleware(history), thunk)),
  )
   
  return store
}
