import FireBaseService from './base';
import { dispatch } from '../store';
import { setUser } from '../store/actions/auth';

const BASE_URL = 'https://identitytoolkit.googleapis.com/v1';

class AuthenticationService extends FireBaseService {
  constructor() {
    super(BASE_URL);
  }

  login(email, password) {
    return this.client.post('accounts:signInWithPassword', {
      email,
      password
    }).then(
      (response) => {
        const user = response.data;
        dispatch((setUser(user)));
        localStorage.setItem('auth', JSON.stringify(user));
        return user;
      }
    );
  }

  register(email, password) {
    return this.client.post('accounts:signUp', {
      email,
      password
    });
  }
}

export default new AuthenticationService();
