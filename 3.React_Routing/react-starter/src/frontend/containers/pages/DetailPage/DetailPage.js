'use strict';
import React from 'react';
import cmz from 'cmz';
import items from '../../common/common';

/** Import styles */
import { generalStyle } from '../Styles'

const pageStyle = cmz(`
  background: #d7d2a8;
  display: inline;
`).compose(generalStyle);

module.exports = (props) =>  (
  console.log(props) ||
  <div>
    { items.map((item, i) =>
        <section className={ pageStyle } key={i}>
          <h1>{ item.title }</h1>
          <p>{ item.content }</p>
          <p>Ited id: { item.id }</p>
        </section>
    ) }
  </div>
);
