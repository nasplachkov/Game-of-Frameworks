import { httpClient } from "./httpClient";

function createAuthService() {
  return {
    get baseUrl() {
      return "https://identitytoolkit.googleapis.com/v1/accounts:";
    },
    register(email, password) {
      return httpClient.post(
        this.baseUrl + "signUp?key=" + process.env.VUE_APP_FIREBASE_KEY,
        {
          email,
          password
        }
      );
    },
    login(email, password) {
      return httpClient.post(
        this.baseUrl +
          "signInWithPassword?key=" +
          process.env.VUE_APP_FIREBASE_KEY,
        {
          email,
          password,
          returnSecureToken: true
        }
      );
    },
    logout() {}
  };
}

export let authService = createAuthService();
