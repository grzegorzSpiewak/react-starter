import React from 'react'
import Component from './index.js'

const presets = {}

presets.init = {
  loading: false,
  error: null,
  result: null
}

presets.loading = {
  ...presets.init,
  loading: true
}

presets.error = {
  ...presets.init,
  error: new Error('something bad happened')
}
/*
 * In result object define required initial values
 */
presets.loaded = {
  ...presets.init,
  result: {
    message: 'Hello World',
    checked: false, /** Initial value for checkbox */
    isFormSubmited: false, /** Initial value for button */
  }
}

// stateful container
module.exports = React.createClass({
  displayName: 'State',

  getInitialState: function () {
    return presets.loaded
  },

  onInput: function (event) {
    this.setState({
      inputValue: event.nativeEvent.target.value,
    });
  },

  /** Function to toggle checked initial value */
  handleChange: function () {
     const checked = this.state.result.checked;
     this.setState({
       ...this.state,
       result: {
         ...this.state.result,
         checked: !this.state.result.checked,
       }
     })
  },

  /** Function to change isFormSubmited initial value */
  handleSubmit: function () {
    const isFormSubmited = this.state.result.isFormSubmited;
    this.setState({
      ...this.state,
      result: {
        ...this.state.result,
        isFormSubmited: true,
      }
    })
  },

  render: function () {
    return <Component {...this.state}
                      inputValue = {this.state.inputValue}
                      onInput = {this.onInput}
                      handleChange = {this.handleChange}
                      handleSubmit = {this.handleSubmit}
  />
  }
})
