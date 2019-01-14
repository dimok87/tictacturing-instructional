import React from 'react'
import {Route, IndexRoute} from 'react-router'
import Template from '../containers/Template'
import TicTacToe from '../containers/TicTacToe'
import Profile from '../containers/Profile'
import Callback from '../components/Callback'
import auth from '../utils/auth';
import Relay from 'react-relay/classic'

const ViewerQueries = {
  viewer: () => Relay.QL`query { viewer }`
}

const handleAuthentication = (nextState, replace) => {
  console.log(nextState)
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication();
  }
}

const createRoutes = () => {
  return (
    <Route
      path='/'
      component={Template}
      query={ViewerQueries}
    >
      <IndexRoute
        component={TicTacToe}
        auth={auth}
        query={ViewerQueries}
      />
      <Route
        path={'/profile'}
        component={Profile}
        auth={auth}
        query={ViewerQueries}
      />
      <Route
        path={'/callback'}
        component={Callback}
        onEnter={handleAuthentication}
        query={ViewerQueries}
      />
    </Route>
  )
}

const Routes = createRoutes()

export default Routes
