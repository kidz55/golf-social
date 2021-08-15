import {
  put, all, call, takeLatest,
} from 'redux-saga/effects';
import Api from '../api';
import { encodeParams } from '../helpers';
import { setGameList } from './actions/sport';

const mockGames = [
  {
    id: 1,
    host_id: 1,
    when: 'Sun, 15 Aug 2021 03:13:19',
    course_id: 1,
    max_players: 3,
    players: [],
    description: 'my first event',
    title: 'my event title',
  },
  {
    id: 2,
    host_id: 2,
    when: 'Sun, 15 Aug 2021 03:13:19',
    course_id: 2,
    max_players: 5,
    players: [],
    description: 'my second event',
    title: 'my sec ev title',
  },
  {
    id: 3,
    host_id: 3,
    when: 'Sun, 15 Aug 2021 03:13:19',
    course_id: 3,
    max_players: 3,
    players: [],
    description: 'my third event',
    title: 'my third title',
  },
];

export function* fetchGames(action) {
  const { query } = action;
  try {
    const { data: list } = yield call(Api.get, `/Games?${encodeParams(query)}`);
  } catch (error) {
    yield put(setGameList({ count: 3, rows: mockGames }));
    yield put({ type: 'Game_REQ_FAILED', error });
  }
}

export function* updateGame(action) {
  const { game } = action;
  try {
    yield call(Api.put, `/Games/${game.id}`, game);
    yield put(updateGame(game));
  } catch (error) {
    yield put({ type: 'UPDATE_STATUS', status: 'error' });
  }
}

export function* createGame() {}

export function* deleteGame() {}

function* watchFetchGames() {
  yield takeLatest('GET_GAMES', fetchGames);
}

function* watchUpdateGame() {
  yield takeLatest('UPDATE_GAME', updateGame);
}

function* watchAddGame() {
  yield takeLatest('ADD_GAME', createGame);
}

function* watchDeleteGame() {
  yield takeLatest('DELETE_GAME', deleteGame);
}
// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([watchFetchGames(), watchUpdateGame(), watchDeleteGame(), watchAddGame()]);
}
