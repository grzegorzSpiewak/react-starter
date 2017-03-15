import React from 'react';
import Component from './index.js';


const presets = {};

presets.init = {
  error: null,
  path: '/'
}

presets.error = {
  ...presets.init,
  error: new Error('something bad happened'),
}

/**
 * Statefull container
 */
module.exports = React.createClass({
  displayName: 'State',

  getInitialState: function() {
    return presets.init;
  },

  render: function() {
    return <Component { ...this.state }

    />
  }
});
