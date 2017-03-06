import React from 'react'
import { render } from 'react-dom'

/** Import Components */
import Sample from './containers/Sample/state'

/** Attach created componetns to DOM */
render(
    <Sample />,
    document.getElementById('root')
)

if (module.hot) {
  module.hot.accept()
}
