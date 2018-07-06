import React from 'react';
import './Todo.css';

const todo = (props) => {
  return (
    <div className='todo'>
      {
        props.completed ?
        <p className='completed' onClick={props.clicked}>{props.task}</p>
        :
        <p onClick={props.clicked}>{props.task}</p>
      }
      <button className='delete' onClick={props.delete}>x</button>
    </div>
  );
}

export default todo;