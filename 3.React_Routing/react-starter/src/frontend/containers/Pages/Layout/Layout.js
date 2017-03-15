'use strict';
import React from 'react';
import Navigation from '../../components/Navigation/Navigation'
import Footer from '../../components/Footer/Footer'

module.exports = ({ children }) => {
  return (
    <div>
      <Navigation />

      { children }

      <Footer />
    </div>
  )
};
