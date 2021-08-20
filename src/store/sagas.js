import {
  put, all, call, takeLatest,
} from 'redux-saga/effects';
import Api from '../api';
import { encodeParams } from '../helpers';
import { setEventList, setCurrentEvent } from './actions/event';
import { setUser } from './actions/user';
import { events, user } from './reducers/mock';

const mockEvents = events;

export function* fetchEvents(action) {
  const { query } = action;
  try {
    const { data: list } = yield call(Api.get, `/Games?${encodeParams(query)}`);
  } catch (error) {
    yield put(setEventList({ count: 3, rows: mockEvents }));
    yield put({ type: 'Game_REQ_FAILED', error });
  }
}

export function* fetchEvent(action) {
  const { id } = action;
  try {
    const { data: event } = yield call(Api.get, `/event/${id}}`);
  } catch (error) {
    yield put(setCurrentEvent(mockEvents[1]));
    yield put({ type: 'Game_REQ_FAILED', error });
  }
}

export function* updateEvent(action) {
  const { Event } = action;
  try {
    yield call(Api.put, `/Events/${Event.id}`, Event);
    yield put(updateEvent(Event));
  } catch (error) {
    yield put({ type: 'UPDATE_STATUS', status: 'error' });
  }
}

export function* createEvent() {}

export function* deleteEvent() {}

export function* fetchUser(action) {
  const { id } = action;
  try {
    const { data: user } = yield call(Api.get, `/users/${id}}`);
  } catch (error) {
    yield put(setUser(user));
    yield put({ type: 'Game_REQ_FAILED', error });
  }
}

function* watchFetchEvents() {
  yield takeLatest('GET_EVENTS', fetchEvents);
}

function* watchUpdateEvent() {
  yield takeLatest('UPDATE_EVENT', updateEvent);
}

function* watchAddEvent() {
  yield takeLatest('CREATE_EVENT', createEvent);
}

function* watchFetchEvent() {
  yield takeLatest('GET_EVENT', fetchEvent);
}

function* watchDeleteEvent() {
  yield takeLatest('DELETE_EVENT', deleteEvent);
}
// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([watchFetchEvents(),
    watchFetchEvent(), watchUpdateEvent(), watchDeleteEvent(), watchAddEvent()]);
}
