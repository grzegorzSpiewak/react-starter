import cmz from 'cmz';
import { generalStyle } from '../../styles'

export const button = cmz(`
  &: {
    background: #9295b5;
    border-color: white;
    border-radius: 5px;
  }

  &:hover {
    background: #e29a09;
  }
`).compose(generalStyle);  //** atache reusable styles defined in styles.js */

export const primaryButton = cmz(`
  background: red;
`).compose(generalStyle);
