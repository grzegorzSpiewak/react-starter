import React from 'react';
import Component from './index.js';

/** import key from config file */
import ApiKey from '../../common/config'

const presets = {};

presets.init = {
  text: '',
  error: null,
  isChecked: false,
  isSubmitting: false,
  header: 'Check current weather in any city in the world',
  data: {},
}

presets.submitting = {
  ...presets.init,
}

presets.error = {
  ...presets.init,
  error: new Error('something bad happened'),
}

presets.withValues = {
  ...presets.init,
  text: 'Warsaw',
}

/**
 * Statefull container
 */
module.exports = React.createClass({
  displayName: 'State',

  getInitialState: function() {
    return presets.init;
  },

  onTextInput: function(event) {
    this.setState({
      inputValue: event.nativeEvent.target.value,
    });
  },

  onSubmit: function() {
    const isSubmitting = this.state.isSubmitting;
    this.setState({
      ...this.state,
      isSubmitting: true,
    });
  },

  /**
   * Handle ajax request
   */
  getCityWeather: function() {
    const apiKey = ApiKey;
    const apiLink = `http://api.openweathermap.org/data/2.5/forecast?APPID=${apiKey}`;
    const cityUrl = `${apiLink}&q=${this.state.inputValue}`;

    fetch(cityUrl)
      .then(blob => blob.json())
      .then(data => {
        this.setState({
          data,
        })
      })
  },

  /**
   * Clear all typed informations and states
   */
  clear: function() {
    this.setState({
      data: {},
      inputValue: '',
    });
  },

  render: function() {
    return <Component { ...this.state }
                      inputValue={ this.state.inputValue }
                      onTextInput={ this.onTextInput }
                      onSubmit={ this.onSubmit }
                      getCityWeather={ this.getCityWeather }
                      clear={ this.clear }
    />
  }
});
