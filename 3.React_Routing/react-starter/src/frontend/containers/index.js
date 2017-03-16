import React from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

/**Pages */
import Layout from './pages/Layout/Layout'
import LandingPage from './pages/LandingPage/LandingPage'
import DetailPage from './pages/DetailPage/DetailPage'
import SecondPage from './pages/SecondPage/SecondPage'
import ThirdPage from './pages/ThirdPage/ThirdPage'


module.exports = function (props) {
  if (props.error) {
    return <div style={{ color: 'red' }}>{ props.error.toString()}</div>
  }

  return (
    <Router history={ hashHistory }>
      <Route path='/' component={ Layout }>
        <IndexRoute component={ LandingPage }></IndexRoute>
        <Route path='detail/(:id)' name='Detail viev' component={ DetailPage }></Route>
        <Route path='second' name='Second Page' component={ SecondPage }></Route>
        <Route path='Third' name='Third Page'component={ ThirdPage }></Route>
      </Route>
    </Router>
  );
};
