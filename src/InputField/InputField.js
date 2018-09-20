import React from 'react';
import './InputField.css';

const InputField = (props) => {
  return (
    <input
      type='text'
      className='input'
      placeholder='What needs to be done?'
      onKeyPress={props.pressed}
    />
  );
}

export default InputField;