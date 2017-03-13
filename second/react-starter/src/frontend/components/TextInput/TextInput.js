'use strict';
import React from 'react';

/**
 * render
 * @return {ReactElement} TextInput
 */
module.exports = ({ inputValue, onTextInput, isSubmitting }) => {
  if (isSubmitting) {
    return null;
  }
  return <input type='text' value ={ inputValue } onChange={ onTextInput } />;
}
