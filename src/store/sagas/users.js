import { put, all, call, takeLatest } from 'redux-saga/effects';
import Api from '../../api';
import { setUser, setLoading, setError } from '../actions/user';

export function* fetchUser(action) {
  const { id } = action;
  yield put(setLoading(true));
  try {
    const user = yield call(Api.get, 'users', id);
    yield put(setUser(user));
    return user;
  } catch (error) {
    console.log(error);
    yield put(setError(JSON.stringify(error)));
  } finally {
    yield put(setLoading(false));
  }
}

function* watchFetchUser() {
  yield takeLatest('GET_USER', fetchUser);
}

// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export default function* userSaga() {
  yield all([watchFetchUser()]);
}
