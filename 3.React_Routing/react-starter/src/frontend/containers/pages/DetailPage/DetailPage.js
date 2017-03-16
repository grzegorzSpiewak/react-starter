'use strict';
import React from 'react';
import cmz from 'cmz';
import items from '../../common/common';

/** Importing and Styling Dysplay Items Page */
import { generalStyle } from '../Styles';
const pageStyle = cmz(
  `
    background: #d7d2a8;
  `
).compose(generalStyle);

/** Importing Components */
import Article from '../../components/Article/Article';

/** Exporting Details Page */
module.exports = (props) =>  {
  return (
    <section className={ pageStyle }>
      <Article items={ items } props={ props }  />
    </section>
  );
}
