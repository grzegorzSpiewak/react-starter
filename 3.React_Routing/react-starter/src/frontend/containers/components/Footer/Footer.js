'use strict';
import React from 'react';
import cmz from 'cmz';
import { IndexLink } from "react-router";

/** import styles */
import { FooterStyles } from './Styles';

module.exports = () => {
  return (
    <footer className={ FooterStyles.footer }>
      <p>Learning React</p>
    </footer>
  );
};
