import React from 'react';
import cmz from 'cmz';

/**Components*/
import TextInput from '../../components/TextInput/TextInput';
import SubmitButton from '../../components/SubmitButton/SubmitButton';
import Label from '../../components/Label/Label';


module.exports = function SampleForm(props) {
  if (props.error) {
    return <div style={{ color: 'red' }}>{ props.error.toString()}</div>
  }



  return <div>
    <Label header={ props.header }
      isSubmitting={ props.isSubmitting }
    />

    <TextInput
      isSubmitting={ props.isSubmitting }
      inputValue={ props.inputValue || props.text }
      onTextInput={ props.onTextInput }
    />

    <SubmitButton
      isSubmitting={ props.isSubmitting }
      onSubmit={ props.onSubmit }
      getCity={ props.getCity }
    />
  </div>;
};
