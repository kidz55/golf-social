import { fork } from 'redux-saga/effects';
import events from './events';
import users from './users';

export default function* rootSaga() {
  yield fork(events);
  yield fork(users);
}
