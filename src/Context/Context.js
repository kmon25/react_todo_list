import React, { Component } from 'react';

const Context = React.createContext();

export class Provider extends Component {

  state = {
    todos: []
  }

  componentDidMount() {
    this.loadTodos();
  }

  loadTodos = () => {
    fetch('https://frozen-brushlands-43586.herokuapp.com/api/todos')
      .then(res => res.json())
      .then(todos => this.setState({todos: todos}))
  }

  addTodo = (event) => {
    if (event.key === 'Enter' && event.target.value !== '') {
      fetch('https://frozen-brushlands-43586.herokuapp.com/api/todos', {
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

  completeTodo = (todo) => {
    fetch(`https://frozen-brushlands-43586.herokuapp.com/api/todos/${todo._id}`, {
      method: 'put',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({completed: !todo.completed})
    })
      .then(res => res.json())
      .then(updatedTodo => {
        this.setState({
          todos: this.state.todos.map(t =>
            t._id === updatedTodo._id ? {...t, completed: !t.completed} : t
          )
        })
      })
  }

  deleteTodo = (id) => {
    fetch(`https://frozen-brushlands-43586.herokuapp.com/api/todos/${id}`, {
      method: 'delete',
    })
      .then(() => {
        const remainingTodos = this.state.todos.filter(todo => todo._id !== id);
        this.setState({todos: remainingTodos});
      })
  }

  render() {
    return (
      <Context.Provider value={{
        todos: this.state.todos,
        addTodo: this.addTodo,
        completeTodo: this.completeTodo,
        deleteTodo: this.deleteTodo
      }}
      >
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;