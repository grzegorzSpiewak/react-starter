'use strict';
import React from 'react';

/**
 *
 * Layout containts elements of page which are always visable - navigation, footer etc.
 * Import Components for Layout
 */
import Navigation from '../../components/Navigation/Navigation';
import Footer from '../../components/Footer/Footer';

/** Exporting Layout */
module.exports = ({ children }) => {
  return (
    <div>
      <Navigation />
      { children }
      <Footer />
    </div>
  );
};
