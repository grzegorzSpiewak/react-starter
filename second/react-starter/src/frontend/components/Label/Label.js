'use strict';
import React from 'react';

module.exports = ({ header, isSubmitting }) => {
  if (isSubmitting) {
    return null;
  }
  return <h1>{ header }</h1>
};
