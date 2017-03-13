'use strict';
import React from 'react';

/**
 * render
 * @return {ReactElement} Header
 */
module.exports = ({ header, isSubmitting }) => {
  if (isSubmitting) {
    return null;
  }
  return <h1>{ header }</h1>
};
