import React from 'react';
import { hot } from 'react-hot-loader';
import { Provider } from 'react-redux';
import Container from '@material-ui/core/Container';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import { ProvideAuth, PrivateRoute } from './plugins/auth';
import configureStore from './store/index';
import Home from './views/event';
import Login from './views/user/Login';
import Signup from './views/user/Signup';
import Detail from './views/event/Detail';
import Navbar from './components/Navbar';

const store = configureStore();

const App = () => (
  <Provider store={store}>
    <ProvideAuth>
      <Router>
        <Navbar />
        <Container>
          <PrivateRoute path="/event/:id">
            <Detail />
          </PrivateRoute>
          <Route path="/" exact component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
        </Container>
      </Router>
    </ProvideAuth>
  </Provider>
);

export default hot(module)(App);
