'use strict';
import React from 'react';
import cmz from 'cmz';
/** Import styles for component */
import { button } from './buttonStyles';
import { primaryButton } from './buttonStyles'

/**
 * render
 * @return {ReactElement} SubmitButton
 */
module.exports = ({ disabled, onSubmit, isSubmitting, primary, getCityWeather }) => {
  if (isSubmitting) {
    return <p>Submiting...</p>;
  }
  return !disabled ? <button className={ primary ? primaryButton : button }
                             onClick={ getCityWeather }>Submit</button> : null;
};
