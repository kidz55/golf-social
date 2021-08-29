import { put, all, call, takeLatest } from 'redux-saga/effects';
import Api from '../../api';
import { encodeParams } from '../../helpers';
import { setEventList, setCurrentEvent } from '../actions/event';
import { events } from '../reducers/mock';

const mockEvents = events;

export function* fetchEvents(action) {
  const { query } = action;
  try {
    throw Error('not implemented');
  } catch (error) {
    yield put(setEventList({ count: 3, rows: mockEvents }));
    yield put({ type: 'Game_REQ_FAILED', error });
  }
}

export function* fetchEvent(action) {
  const { id } = action;
  try {
    throw Error('not implemented');
  } catch (error) {
    yield put(setCurrentEvent(mockEvents[1]));
    yield put({ type: 'Game_REQ_FAILED', error });
  }
}

export function* updateEvent(action) {
  const { Event } = action;
  try {
    throw Error('not implemented');
    yield put(updateEvent(Event));
  } catch (error) {
    yield put({ type: 'UPDATE_STATUS', status: 'error' });
  }
}

export function* createEvent() {}

export function* deleteEvent() {}

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
export default function* eventSaga() {
  yield all([
    watchFetchEvents(),
    watchFetchEvent(),
    watchUpdateEvent(),
    watchDeleteEvent(),
    watchAddEvent(),
  ]);
}
