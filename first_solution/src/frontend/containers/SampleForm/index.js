import React from 'react';
import Button from '../../components/Button';
import Checkbox from '../../components/Checkbox';
import TextArea from '../../components//TextArea';

module.exports = function Sample (props) {
  /**
   * Conditions required for button to be displayed
   * TextAreaValue checks if input has text
   * checkboxCheked checks state of input
  */
  const textAreaValue = props.inputValue && props.inputValue.length > 0;
  const checkboxChecked = props.checked === true;
  const isButtonClickable = checkboxChecked && textAreaValue

  return (
    <form>
      <div>{props.message}</div>

      <Checkbox checked = {props.checked}
                handleCheckboxChange = {props.handleCheckboxChange}
      />

      <TextArea onTextInput = {props.onTextInput}
                inputValue = {props.inputValue}
      />

      <Button buttonText = 'click me'
              disabled = {!isButtonClickable}
              isFormSubmited = {props.isFormSubmited}
              onSubmit = {props.onSubmit}
      />
    </form>
  );
}
