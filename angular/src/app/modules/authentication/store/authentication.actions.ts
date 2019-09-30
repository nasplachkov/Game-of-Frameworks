import { Action } from '@ngrx/store';

export enum AuthActionTypes {
  SaveUser = '[Auth] Save user',
}

export class SaveUser implements Action{
  public readonly type = AuthActionTypes.SaveUser;
  constructor(public readonly payload: any) {
    this.payload = payload;
  }
}

export type AuthenticationActions = SaveUser;
