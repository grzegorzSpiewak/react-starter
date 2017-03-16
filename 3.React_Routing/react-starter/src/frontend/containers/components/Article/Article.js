'use strict';

import React from 'react';

module.exports = ({ items, props }) => {
  const currentPath = props.routeParams.id;
  const itemInfo = items.find(item  => currentPath == item.id);

  if(!itemInfo) {
    return (
      <p>There is no item id like that</p>
    );
  };

  return (
    <article>
      <h1>{ itemInfo.title }</h1>
      <p>{ itemInfo.content }</p>
      <p>Item ID:{ itemInfo.id }</p>
    </article>
  );
};
