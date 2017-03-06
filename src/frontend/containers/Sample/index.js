import React from 'react';
import Button from './SampleForm/Button';
import Checkbox from './SampleForm/Checkbox';
import TextArea from './SampleForm/TextArea';

module.exports = function Sample (props) {
  /**
   * Conditions required for button to be displayed
   * TextAreaValue checks if input has text
   * checkboxCheked checks state of input
   */
  const textAreaValue = props.inputValue && props.inputValue.length !== 0;
  const checkboxCheked = props.result.checked === true;

  if (props.loading) {
    return <div>Loading...</div>
  }

  if (props.error) {
    return <div style={{color: 'red'}}>{props.error.toString()}</div>
  }

  if (!props.result) {
    return <div>Nothing loaded</div>
  }

  return (
    <div>
      <div>{props.result.message}</div>

      <Checkbox checked={props.result.checked}
                handleChange={props.handleChange}
      />

      <TextArea onInput={props.onInput}
                inputValue={props.inputValue}
      />

      <Button buttonText = 'click me'
              disabled={!checkboxCheked || !textAreaValue}
              isFormSubmited={props.result.isFormSubmited}
              handleSubmit={props.handleSubmit}
      />
    </div>
  );
}
