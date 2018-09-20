import React, { Component } from 'react';
import InputField from './InputField/InputField';
import Todo from './Todo/Todo';
import './App.css';

class App extends Component {

  state = {
    todos: []
  }

  componentDidMount() {
    this.loadTodos();
  }

  loadTodos = () => {
    fetch('http://localhost:8080/api/todos')
      .then(res => res.json())
      .then(todos => this.setState({todos: todos}))
  }

  addTodo = (event) => {
    if (event.key === 'Enter' && event.target.value !== '') {
      fetch('http://localhost:8080/api/todos', {
        method: 'post',
        headers: new Headers({
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify({name: event.target.value})
      })
        .then(res => res.json())
        .then(newTodo => this.setState({todos: [...this.state.todos, newTodo]}))

      event.target.value = '';
    }
  }

  completeTodo = (id) => {
    // const allTodos = this.state.todos;
    // const thisTodo = allTodos.find(item => item.id === id);
    // thisTodo.complete = !thisTodo.complete;

    // const isCompleted = allTodos.filter(todo => todo.complete);
    // const numOfCompleted = isCompleted.length;

    // this.setState({
    //   completed: numOfCompleted,
    //   todos: allTodos
    // });
  }

  deleteTodo = (id) => {
    fetch(`http://localhost:8080/api/todos/${id}`, {
      method: 'delete',
    })
      .then(() => {
        const remainingTodos = this.state.todos.filter(todo => todo._id !== id);
        this.setState({todos: remainingTodos});
      })
  }

  render() {

    const { todos } = this.state;

    const displayTodos = todos.map(todo => {
      return (
        <Todo
          key={todo._id}
          task={todo.name}

          //TODO: Fix completed
          completed={todo.complete}

          //TODO: Fix clicks to complete todo
          clicked={() => this.completeTodo(todo._id)}
          delete={() => this.deleteTodo(todo._id)}
        />
      )
    });

    return (
      <div className="App">
        <h1>Todo List</h1>
        <p id='intro'>Add and delete your tasks below.</p>

        <InputField pressed={this.addTodo} />

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
