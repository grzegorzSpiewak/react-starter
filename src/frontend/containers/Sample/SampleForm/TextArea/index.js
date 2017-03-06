'use strict';
import React from 'react'

/**
 * Creates text area
 */
module.exports = ({onInput, inputValue}) => {
  return <textarea value = {inputValue || ''} onChange = {onInput} ></textarea>
}
