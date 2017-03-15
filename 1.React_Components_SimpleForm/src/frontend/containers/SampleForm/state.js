import React from 'react'
import Component from './index.js'

// stateful container
module.exports = React.createClass({
  displayName: 'State',

  getInitialState: function () {
    return {
      message: 'Hello World',
      checked: false, /** Initial value for checkbox */
      isFormSubmited: false, /** Initial value for button */
    }
  },

  onTextInput: function (event) {
    this.setState({
      inputValue: event.nativeEvent.target.value,
    });
  },

  /** Function to toggle checked initial value */
  handleCheckboxChange: function () {
     const checked = this.state.checked;
     this.setState({
       ...this.state,
       checked: !this.state.checked,
     })
  },

  /** Function to change isFormSubmited initial value */
  onSubmit: function () {
    const isFormSubmited = this.state.isFormSubmited;
    this.setState({
      ...this.state,
      isFormSubmited: true,
    })
  },

  render: function () {
    return <Component {...this.state}
                      inputValue = {this.state.inputValue}
                      onTextInput = {this.onTextInput}
                      handleCheckboxChange = {this.handleCheckboxChange}
                      onSubmit = {this.onSubmit}
  />
  }
})
