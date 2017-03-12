import React from 'react';

import Component from './index.js';

const presets = {};

presets.init = {
  text: '',
  error: null,
  isChecked: false,
  isSubmitting: false,
  header: 'Type in your city',
  cities: [],
}

presets.submitting = {
  ...presets.init,
  isSubmitting: true,
}

presets.error = {
  ...presets.init,
  error: new Error('something bad happened'),
}

presets.withValues = {
  ...presets.init,
  text: '1234',
  isChecked: true,
}

presets.onlyText = {
  ...presets.withValues,
  isChecked: false,

}

presets.onlyChechbox = {
  ...presets.withValues,
  text: '1234',
}

// stateful container
module.exports = React.createClass({
  displayName: 'State',

  getInitialState: function () {
    return presets.init;
  },

  onTextInput: function (event) {
    this.setState({
      inputValue: event.nativeEvent.target.value,
    });
  },

  onSubmit: function () {
    const isSubmitting = this.state.isSubmitting;
    this.setState({
      ...this.state,
      isSubmitting: true,
    });
  },

  getCity: function () {
    const apiKey = `953079470cc6ebfc8ed5cbe3c2fb7101`;
    const apiLink = `http://api.openweathermap.org/data/2.5/forecast?APPID=${apiKey}`;
    const cityUrl = `${apiLink}&q=${this.state.inputValue}`;
    fetch(cityUrl)
      .then(blob => blob.json())
      .then(data => {
        this.data = data;
        console.log(data.city)
      })
  },

  render: function () {
    return <Component { ...this.state }
                      inputValue={ this.state.inputValue }
                      onTextInput={ this.onTextInput }
                      onSubmit={ this.onSubmit }
                      getCity={ this.getCity }
    />
  }
})
