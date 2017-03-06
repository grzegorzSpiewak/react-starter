'use strict';
import React from 'react'

/**
 * Creates a button
 */
module.exports = ({buttonText, disabled, handleSubmit, isFormSubmited }) => {
  if(isFormSubmited) {
    return <p>Submiting...</p>
  }
  return !disabled ? <button onClick = {handleSubmit}>{buttonText}</button> : null;
}
