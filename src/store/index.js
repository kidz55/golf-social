import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import reducer from './reducers/index';
import sagas from './sagas/index';

const sagaMiddleware = createSagaMiddleware();
const middleware = [...getDefaultMiddleware({ thunk: false }), sagaMiddleware];
const devMode = process.env.NODE_ENV === 'development';
if (devMode) {
  middleware.push(logger);
}

// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  const store = configureStore({
    reducer,
    devTools: devMode,
    middleware,
  });
  sagaMiddleware.run(sagas);
  return store;
};
