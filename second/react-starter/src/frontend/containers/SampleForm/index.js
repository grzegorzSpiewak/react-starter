import React from 'react';
import SubmitButton from '../../components/SubmitButton';
import Checkbox from '../../components/Checkbox';
import TextInput from '../../components/TextInput';

module.exports = function SampleForm(props) {
  if (props.error) {
    return <div style={{ color: 'red' }}>{ props.error.toString()}</div>
  }

  const inputTextValue = props.inputValue && props.inputValue.length > 0;
  const checkboxChecked = props.isChecked === true;
  const isButtonClickable = checkboxChecked && inputTextValue;

  return <form>
    <TextInput inputValue = {props.inputValue || props.text}
               onTextInput = {props.onTextInput}
    />

    <Checkbox isChecked={props.isChecked}
              handleCheckboxChange = {props.handleCheckboxChange}
    />

    <SubmitButton disabled = {!isButtonClickable}
                  isSubmitting = {props.isSubmitting}
                  onSubmit = {props.onSubmit}
    />
  </form>;
};
