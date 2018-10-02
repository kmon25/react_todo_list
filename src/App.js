import React from 'react';
import { Provider, Consumer } from './Context/Context';
import InputField from './InputField/InputField';
import Todo from './Todo/Todo';
import './App.css';

const App = () => {
  return (
    <Provider>
      <Consumer>
        {(value) => {
          const { todos, addTodo, completeTodo, deleteTodo } = value;

          const completedCount = todos.filter(todo => todo.completed === true);

          const displayTodos = todos.map(todo => {
            return (
              <Todo
                key={todo._id}
                taskName={todo.name}
                completed={todo.completed}
                clicked={() => completeTodo(todo)}
                delete={() => deleteTodo(todo._id)}
              />
            )
          });

          return (
            <div className="App">
              <h1>Todo List</h1>
              <p id='intro'>Add and delete your tasks below.</p>
              <InputField pressed={addTodo} />
              {displayTodos}
              <div className='stats'>
                <p id='count'>Todos: <span>{todos.length}</span></p>
                <p id='completed'>Completed: <span>{completedCount.length}</span></p>
              </div>
            </div>
          )
        }}
      </Consumer>
    </Provider>
  );
}

export default App;