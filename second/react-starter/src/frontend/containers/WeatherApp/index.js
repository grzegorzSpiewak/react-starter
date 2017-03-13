import React from 'react';
import cmz from 'cmz';

/**Components*/
import TextInput from '../../components/TextInput/TextInput';
import SubmitButton from '../../components/SubmitButton/SubmitButton';
import Label from '../../components/Label/Label';
import Section from '../../components/Section/Section';


module.exports = function WeatherApp(props) {
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
      getCityWeather={ props.getCityWeather }
    />

    <Section
      informations={ props.data }
      inputValue={ props.inputValue || props.text }
      clear={ props.clear }
    />
  </div>;
};
