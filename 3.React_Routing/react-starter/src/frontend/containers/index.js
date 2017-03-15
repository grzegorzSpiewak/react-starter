import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

/**Pages */
import Layout from './Pages/Layout/Layout'
import LandingPage from './Pages/LandingPage/LandingPage'
import SecondPage from './Pages/SecondPage/SecondPage'
import ThirdPage from './Pages/ThirdPage/ThirdPage'

module.exports = function (props) {
  if (props.error) {
    return <div style={{ color: 'red' }}>{ props.error.toString()}</div>
  }

  return (
    <Router history={ hashHistory }>
      <Route path='/' component={ Layout }>
        <IndexRoute component={ LandingPage }></IndexRoute>
        <Route path='second' component={ SecondPage }></Route>
        <Route path='Third' component={ ThirdPage }></Route>
      </Route>
    </Router>
  );
};
