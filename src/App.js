import React, { Component } from 'react';
import InputField from './InputField/InputField';
import Todo from './Todo/Todo';
import './App.css';

class App extends Component {

  state = {
    todos: []
  }

  componentDidMount() {
    fetch('http://localhost:8080/api/todos')
      .then(res => res.json())
      .then(todos => this.setState({todos: todos}))
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

    const { todos } = this.state;

    const displayTodos = todos.map(todo => {
      return <Todo
        key={todo._id}
        task={todo.name}

        //TODO: Fix completed
        completed={todo.complete}

        //TODO: Fix clicks to complete and delete todo
        clicked={() => this.completeThisTodo(todo._id)}
        delete={() => this.deleteThisTodo(todo._id)}
        />
    });

    return (
      <div className="App">
        <h1>Todo List</h1>
        <p id='intro'>Add and delete your tasks below.</p>
        <InputField pressed={this.addThisTodo}/>

        {displayTodos}

        <div className='stats'>
          <p id='count'>Todos: <span>{todos.length}</span></p>

          {/*TODO: Fix completed to show numbers instead of true or false */}
          <p id='completed'>Completed: <span>{this.state.completed}</span></p>
        </div>

      </div>
    );
  }
}

export default App;
