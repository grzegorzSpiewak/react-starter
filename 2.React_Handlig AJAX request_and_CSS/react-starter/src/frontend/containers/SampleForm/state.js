import React from 'react';

import Component from './index.js';

const presets = {};

presets.init = {
  text: '',
  error: null,
  isChecked: false,
  isSubmitting: false,
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

  handleCheckboxChange: function () {
     const isChecked = this.state.isChecked;
     this.setState({
       ...this.state,
       isChecked: !this.state.isChecked,
     });
  },

  render: function () {
    return <Component { ...this.state }
                      inputValue={ this.state.inputValue }
                      onTextInput={ this.onTextInput }
                      handleCheckboxChange={ this.handleCheckboxChange }
                      onSubmit={ this.onSubmit }
    />
  }
})
