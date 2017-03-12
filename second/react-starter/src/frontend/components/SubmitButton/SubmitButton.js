'use strict';
import React from 'react';
import cmz from 'cmz';
/** Import styles for component */
import { button } from './buttonStyles';
import { primaryButton } from './buttonStyles'

module.exports = ({ disabled, onSubmit, isSubmitting, primary, getCity }) => {
  if (isSubmitting) {
    return <p>Submiting...</p>;
  }
  return !disabled ? <button className={ primary ? primaryButton : button }
                             onClick={ onSubmit, getCity }>Submit</button> : null;
};
