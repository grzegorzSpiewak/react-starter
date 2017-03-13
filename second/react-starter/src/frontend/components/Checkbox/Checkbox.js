'use strict';
import React from 'react';

/**
 * render
 * @return {ReactElement} Checkbox
 */
module.exports = ({ isChecked, handleCheckboxChange }) => {
  return <input type='checkbox' checked={ isChecked } onChange={ handleCheckboxChange } />
};
