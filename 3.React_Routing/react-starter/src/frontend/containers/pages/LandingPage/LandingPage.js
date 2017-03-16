'use strict';
import React from 'react';
import cmz from 'cmz';
import { Link } from 'react-router';
import items from '../../common/common';

/** Import and styles Loading page*/
import { generalStyle } from '../Styles';
const pageStyle = cmz(`
  background: #e7d2a8;
`).compose(generalStyle);

/** Import component */
import ListItem from '../../components/ListItem/ListItem';
const item = items.map((item, i) =>
  <li key= {i} >
    <Link to={`/detail/${ item.id }`}>{ item.title }</Link>
  </li>
);

module.exports = (props) => {
  return (
    <section className={ pageStyle }>

      <ListItem items={ item }/>

    </section>
  )
};
