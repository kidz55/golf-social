const initialState = {
  self: null,
  error: null,
  isLoading: false,
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        self: action.user,
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case 'SET_ERROR': {
      return {
        ...state,
        error: action.error,
      };
    }
    default:
      return state;
  }
};

export default user;
