'use strict';
import React from 'react';

/**
 * render
 * @return {ReactElement} Section
 */
module.exports = ({ informations, inputValue, clear }) => {

  /**
   * Handles missspelling in typed city name
   * render
   * @return {ReactElement} Error section
   */
  if(informations.message === 'Error') {
    return (
      <section>
        <p>{ inputValue } is not a city</p>
        <button onClick={ clear }>Clear all</button>
      </section>
    )
  };

  /**
   * Hides section before reciving data
   */
  if (!informations || !informations.list) {
    return null;
  };

  /**
   * render
   * @return {ReactElement} Answer section
   */
  return (
    <section>
      <p>Country: { informations.city.country }</p>
      <p>Current weather: { informations.list[0].weather[0].description }</p>
      <p>Time of latest report: { informations.list[0].dt_txt }</p>
      <button onClick={ clear }>Clear all</button>
    </section>
  );
};
