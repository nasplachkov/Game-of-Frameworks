import React, { createContext, useContext, useReducer } from 'react';

import getInitialState from './initialState';
import { combineReducers } from './combineReducers';
import { authReducer } from './reducers/auth';
import { moviesReducer } from './reducers/movies';

export * from './actions/movies';

const combinedReducer = combineReducers({
  auth: authReducer,
  movies: moviesReducer
});

let initialState = null;
try {
  const storedState = localStorage.getItem('state');
  initialState = storedState ? JSON.parse(storedState) : getInitialState();
} catch (_) {
  initialState = getInitialState();
}

try {
  const user = localStorage.getItem('auth');
  initialState.auth.user = JSON.parse(user);
} catch (_) {}

export const StoreContext = createContext();

let stateAndDispatch = [];
export const StoreProvider = (props) => {
  stateAndDispatch = useReducer(combinedReducer, initialState);

  return (
    <StoreContext.Provider value={stateAndDispatch}>
      {props.children}
    </StoreContext.Provider>
  );
};

export const getState = () => stateAndDispatch[0];
export const dispatch = (action) => stateAndDispatch[1](action);
export const useStore = () => useContext(StoreContext);
