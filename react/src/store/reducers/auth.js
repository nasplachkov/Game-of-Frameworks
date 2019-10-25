export function authReducer(state, action) {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.data
      };
    default:
      return state;
  }
};
