'use strict';
import React from 'react';

module.exports = ({ inputValue, onTextInput, isSubmitting }) => {
  if (isSubmitting) {
    return null;
  }
  return <input type='text' value ={ inputValue } onChange={ onTextInput } />;
}
