'use strict';
import React from 'react'

/**
 * Creates a button
 */
module.exports = ({buttonText, disabled, onSubmit, isFormSubmited }) => {
  if(isFormSubmited) {
    return <p>Submiting...</p>
  }
  return !disabled ? <button onClick = {onSubmit}>{buttonText}</button> : null;
}
