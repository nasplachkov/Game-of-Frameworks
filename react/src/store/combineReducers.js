
export const combineReducers = (reducers) => {
  return (state = {}, action) => {
    const keys = Object.keys(reducers);
    const combined = {};

    for (const key of keys) {
      combined[key] = reducers[key](state[key], action);
    }

    // Very easy to use for debugging
    // localStorage.setItem('state', JSON.stringify(combined));

    return combined;
  };
};
