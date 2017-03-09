'use strict';
import React from 'react';
import cmz from 'cmz';
import { generalStyle } from '../styles'

const button = cmz(`
  &: {
    background: #9295b5;
    border-color: white;
    border-radius: 5px;
  }

  &:hover {
    background: #e29a09;
  }
`).compose(generalStyle);  //** atache reusable styles defined in styles.js */

const primaryButton = cmz(`
  background: red;
`).compose(generalStyle);


module.exports = ({ disabled, onSubmit, isSubmitting, primary }) => {
  if (isSubmitting) {
    return <p>Submiting...</p>;
  }
  return !disabled ? <button className={ primary ? primaryButton : button }
                             onClick={ onSubmit }>Submit</button> : null;
};
