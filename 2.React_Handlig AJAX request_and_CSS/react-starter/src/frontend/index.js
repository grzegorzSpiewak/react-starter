import React from 'react';
import { render } from 'react-dom';
import WeatherApp from './containers/WeatherApp/state';

render(
  <WeatherApp />,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept();
}
