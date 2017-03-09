import React from 'react';
import cmz from 'cmz';
import SubmitButton from '../../components/SubmitButton';
import Checkbox from '../../components/Checkbox';
import TextInput from '../../components/TextInput';

const styles = cmz({
  form: `
  background: #D4D7FE;
  padding: 20px;
  text-align: center;
  `,

  textInput: `
  background: transparent;
  border: none;
  border-bottom: 1px solid black;
  `
});


module.exports = function SampleForm(props) {
  if (props.error) {
    return <div style={{ color: 'red' }}>{ props.error.toString()}</div>
  }

  const inputTextValue = props.inputValue && props.inputValue.length > 0;
  const checkboxChecked = props.isChecked === true;
  const isButtonClickable = checkboxChecked && inputTextValue;

  return <form className={ styles.form }>

    <TextInput
      className={ styles.textInput }
      inputValue={ props.inputValue || props.text }
      onTextInput={ props.onTextInput }
    />

    <Checkbox
      isChecked={ props.isChecked }
      handleCheckboxChange={ props.handleCheckboxChange }
    />

    <SubmitButton
      primary={true}
      disabled={!isButtonClickable}
      isSubmitting={ props.isSubmitting }
      onSubmit={ props.onSubmit }
    />
  </form>;
};
