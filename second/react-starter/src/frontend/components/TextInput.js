'use strict';
import React from 'react';

module.exports = ({ inputValue, onTextInput }) => {
  return <input type='number' value = {inputValue} onChange = {onTextInput} />;
}
