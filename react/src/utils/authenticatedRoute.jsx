import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { useStore } from '../store';

export function AuthenticatedRoute({ component: Component, ...other }) {
  const [state] = useStore();

  return (
    <Route {...other} render={routeProps =>
      state.auth.user ?
        <Component {...routeProps} /> :
        <Redirect to={{
          pathname: '/signin',
          state: { from: routeProps.location }
        }} />
    } />
  );
}

AuthenticatedRoute.propTypes = {
  path: PropTypes.string.isRequired,
  component: PropTypes.elementType.isRequired
};
