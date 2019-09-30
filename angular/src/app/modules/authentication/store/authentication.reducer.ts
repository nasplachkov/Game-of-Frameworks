import { ActionReducer } from '@ngrx/store';
import { AuthActionTypes, AuthenticationActions } from './authentication.actions';

export interface AuthStateModel {
  user: any;
}

export const authInitialState = {
  user: null
};

export function authenticationReducer(state = authInitialState, action: AuthenticationActions): AuthStateModel {
  switch (action.type) {
    case AuthActionTypes.SaveUser:
      return { ...state, user: action.payload };
  }
  return state;
}
