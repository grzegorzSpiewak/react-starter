'use strict';
import React from 'react'

/**
 * Creates text area
 */
module.exports = ({onTextInput, inputValue}) => {
  return <input type='number' value = {inputValue || ''} onChange = {onTextInput} />
}
