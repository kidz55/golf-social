import {
  SET_GAME_LIST, CREATE_GAME, UPDATE_GAME, DELETE_GAME,
} from './types';

export const setGameList = (list) => ({
  type: SET_GAME_LIST,
  list,
});

export const createGame = (game) => ({
  type: CREATE_GAME,
  game,
});

export const updateGame = (game) => ({
  type: UPDATE_GAME,
  game,
});

export const deleteGame = (game) => ({
  type: DELETE_GAME,
  game,
});
