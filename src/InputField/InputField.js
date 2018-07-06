import React from 'react';
import './InputField.css';

const inputField = (props) => {
  return <input type='text' className='input' placeholder='What needs to be done?' onKeyPress={props.pressed}/>
}

export default inputField;