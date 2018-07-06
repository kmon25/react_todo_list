import React, { Component } from 'react';
import InputField from './InputField/InputField';
import Todo from './Todo/Todo';
import './App.css';

class App extends Component {

  state = {
    completed: 0,
    todos: [
      { id: 1, name: 'Eat Lunch', complete: false},
      { id: 2, name: 'Take Shower', complete: false},
      { id: 3, name: 'Learn React', complete: false},
      { id: 4, name: 'Watch World Cup 2018', complete: false},
      { id: 5, name: 'Push 1 Commit', complete: false},
    ]
  }

  completeThisTodo = (id) => {
    const allTodos = this.state.todos;
    const thisTodo = allTodos.find(item => item.id === id);
    thisTodo.complete = !thisTodo.complete;

    const isCompleted = allTodos.filter(todo => todo.complete);
    const numOfCompleted = isCompleted.length;

    this.setState({
      completed: numOfCompleted,
      todos: allTodos
    });
  }

  deleteThisTodo = (id) => {
    const allTodos = this.state.todos;
    const thisTodo = allTodos.filter(item => item.id !== id);
    this.setState({ todos: thisTodo });
  }

  addThisTodo = (event) => {
    const allTodos = this.state.todos;
    if (event.key === 'Enter') {
      const newTodo = {
        id: this.state.todos.length + 1,
        name: event.target.value,
        complete: false
      };
      allTodos.push(newTodo);
      this.setState({ todos: allTodos });
      event.target.value = '';
    }
  }

  render() {

    const displayTodos = this.state.todos.map(todo => {
      return <Todo
        key={todo.id}
        task={todo.name}
        completed={todo.complete}
        clicked={() => this.completeThisTodo(todo.id)}
        delete={() => this.deleteThisTodo(todo.id)}
        />
    });

    return (
      <div className="App">
        <h1>Todo List</h1>
        <p id='intro'>Add and delete your tasks below.</p>
        <InputField pressed={this.addThisTodo}/>

        {displayTodos}

        <div className='stats'>
          <p id='count'>Todos: <span>{this.state.todos.length}</span></p>
          <p id='completed'>Completed: <span>{this.state.completed}</span></p>
        </div>

      </div>
    );
  }
}

export default App;
