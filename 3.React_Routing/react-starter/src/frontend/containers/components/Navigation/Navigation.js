'use strict';

import React from 'react';
import cmz from 'cmz';
import { IndexLink } from "react-router";

/** import styles */
import { NavigationStyle } from './Styles';

module.exports = () => {
  return (
    <nav className={ NavigationStyle.nav }>
      <ul className={ NavigationStyle.ul }>
        <li className={ NavigationStyle.li }>
          <IndexLink to='/' className={ NavigationStyle.a }>Landing Page</IndexLink>
        </li>
      </ul>
    </nav>
  );
};
