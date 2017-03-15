'use strict';
import cmz from 'cmz';

export const NavigationStyle = cmz({
  nav:`
    background: black;
    width: 100%;
    text-align: center;
  `,

  ul: `
    list-style-type: none;
    margin: 0;
    padding: 20px;
    text-decoration: none;
  `,

  li: `
    display: inline;
    margin: 10px;
  `,

  a: `
    text-decoration: none;
    color: white;
  `
})
