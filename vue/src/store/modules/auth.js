export default {
  state: {
    user: null
  },
  getters: {
    getUser: state => state.user,
    getUserId: state => (state.user ? state.user.localId : null)
  },
  mutations: {
    setUser(state, user) {
      window.localStorage.setItem("uJCG58LFb9", JSON.stringify(user));
      state.user = { ...user };
    },
    logout(state) {
      window.localStorage.removeItem("uJCG58LFb9");
      state.user = null;
    }
  },
  actions: {
    setUser(context, payload) {
      context.commit("setUser", payload);
    },
    logout(context) {
      context.commit("logout");
    }
  }
};
