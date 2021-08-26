import React from 'react';
import { hot } from 'react-hot-loader';
import { Provider } from 'react-redux';
import Container from '@material-ui/core/Container';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import { ProvideAuth, PrivateRoute } from './plugins/auth';
import configureStore from './store/index';
import Home from './views/event';
import Login from './views/user/Login';
import Detail from './views/event/Detail';
import Navbar from './components/Navbar';

const store = configureStore();

const App = () => (
  <Provider store={store}>
    <ProvideAuth>
      <Router>
        <Navbar />
        <Container>
          <Route path="/" exact component={Home} />
          <PrivateRoute path="/event/:id" component={Detail} />
          <Route path="/login" component={Login} />
        </Container>
      </Router>
    </ProvideAuth>
  </Provider>
);

export default hot(module)(App);
