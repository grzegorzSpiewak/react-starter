'use strict';
import React from 'react'

/**
 * Creates a checkbox
 */
module.exports = ({checked, handleChange}) => {
  return <input type = 'checkbox' checked = {checked} onChange = {handleChange}/>
}
