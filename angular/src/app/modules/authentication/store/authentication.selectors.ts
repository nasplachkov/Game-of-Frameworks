import { AUTH_STATE_KEY } from '../authentication.module';

export const userSelector = state => { return state[AUTH_STATE_KEY].user;}
