'use strict';
import React from 'react';
import cmz from 'cmz';
import { Link } from 'react-router';
import items from '../../common/common';
/** Import component */
import ListItem from '../../components/ListItem/ListItem';

/** Importing and Styling Landing page */
import { generalStyle } from '../Styles';
const pageStyle = cmz(
  `
    background: #e7d2a8;
  `
).compose(generalStyle);


const item = items.map((item, i) =>
  <li key= {i} >
    <Link to={`/detail/${ item.id }`}>{ item.title }</Link>
  </li>
);

/** Exporting Landing Page */
module.exports = (props) => {
  return (
    <section className={ pageStyle }>
      <ListItem items={ item }/>
    </section>
  );
};
