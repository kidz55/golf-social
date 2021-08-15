import {
  SET_GAME_LIST, UPDATE_GAME, DELETE_GAME,
} from '../actions/sport/types';

const initialState = {
  list: {},
  gameCount: 0,
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_GAME_LIST:
      return {
        ...state,
        gameCount: action.list.count,
        list: action.list.rows.reduce((acc, game) => {
          if (state.list[game.id]) {
            acc[game.id] = { ...state.list[game.id], ...game };
            return acc;
          }
          acc[game.id] = game;
          return acc;
        }, {}),
      };
    case DELETE_GAME: {
      return {
        ...state,
        list: Object.keys(state.list).filter((id) => id !== action.game.id).reduce((obj, key) => {
          // eslint-disable-next-line no-param-reassign
          obj[key] = state.list[key];
          return obj;
        }, {}),
      };
    }
    case UPDATE_GAME: {
      return {
        ...state,
        list: { ...state.list, [action.game.id]: action.game },
      };
    }
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
