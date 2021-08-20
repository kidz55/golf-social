import React from 'react';
import { hot } from 'react-hot-loader';
import { Provider } from 'react-redux';
import Container from '@material-ui/core/Container';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import configureStore from './store/index';
import Home from './views/event';
import Detail from './views/event/Detail';
import Navbar from './components/Navbar';

const store = configureStore();
const App = () => (
  <Provider store={store}>
    <Router>
      <Navbar />
      <Container>
        <Route path="/" exact component={Home} />
        <Route path="/event/:id" component={Detail} />
      </Container>
    </Router>
  </Provider>
);

export default hot(module)(App);
