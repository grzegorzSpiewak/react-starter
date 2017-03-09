'use strict';
import React from 'react';

module.exports = ({ isChecked, handleCheckboxChange }) => {
  return <input type='checkbox' checked={ isChecked } onChange={ handleCheckboxChange } />
};
