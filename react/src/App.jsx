import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import { AuthenticatedRoute } from "./utils/authenticatedRoute";

import './App.scss';

import { SignIn } from './views/signIn';
import { SignUp } from './views/signUp';
import { Movies } from './views/movies';
import { StoreProvider } from './store';

function App() {
  return (
    <StoreProvider>
      <Router>
        <Switch>
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <AuthenticatedRoute path="/movies" component={Movies} />
          <Redirect to="/movies" />
        </Switch>
      </Router>
    </StoreProvider>
  );
}

export default App;
