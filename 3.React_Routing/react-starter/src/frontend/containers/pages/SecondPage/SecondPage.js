'use strict';
import React from 'react';
import cmz from 'cmz';

/** Import styles */
import { generalStyle } from '../Styles'

const pageStyle = cmz(`
  background: #d7d2a8;
`).compose(generalStyle);

module.exports = () => {
  return (
    <section className={ pageStyle }>This is Second Page</section>
  )
};
