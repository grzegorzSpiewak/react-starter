'use strict';
import React from 'react'

/**
 * Creates a checkbox
 */
module.exports = ({checked, handleCheckboxChange}) => {
  return <input type='checkbox' checked={checked} onChange={handleCheckboxChange}/>
}
