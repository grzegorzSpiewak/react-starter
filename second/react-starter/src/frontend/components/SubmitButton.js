'use strict';
import React from 'react';

module.exports = ({ disabled, onSubmit, isSubmitting }) => {
  if (isSubmitting) {
    return <p>Submiting...</p>;
  }
  return !disabled ? <button onClick={onSubmit}>Submit</button> : null;
};
