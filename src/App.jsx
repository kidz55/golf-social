import React from 'react';
import { hot } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import configureStore from './store/index';
import Home from './views/Home';

const store = configureStore();
const App = () => (
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
      </Switch>
    </Router>
  </Provider>
);

export default hot(module)(App);
