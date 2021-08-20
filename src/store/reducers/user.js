const initialState = {
  self: null,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        self: action.user,
      };
    case 'TASK_REQ_FAILED': {
      return {
        ...state,
        error: action.error,
      };
    }
    default:
      return state;
  }
};
