import './reset.css';
import './App.css';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import CheckAllAndRemaining from './components/CheckAllAndRemaining';
import TodoFilters from './components/TodoFilters';
import ClearCompletedButton from './components/ClearCompletedButton';
import { useEffect, useState } from 'react';

function App() {
  let [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/todos')
    .then(res => res.json())
    .then((todos) => {
      setTodos(todos)
    })
  },[])

  let addTodo = (todo) => {
    fetch('http://localhost:3001/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(todo)
    })
    .then(res => res.json())
    .then((newTodo) => {
      setTodos(prevState => [...prevState, newTodo]);
    });
  }

  let deleteTodo = (todoID) => {
    fetch(`http://localhost:3001/todos/${todoID}`, {
      method:'DELETE'
    })
    setTodos(prevState => {
      return prevState.filter(todo => {
        return todo.id != todoID
      })
    })
  }

  let updateTodo = (todo) => {
    fetch(`http://localhost:3001/todos/${todo.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(todo)
    })
    setTodos(prevState => {
      return prevState.map(t => {
        if(t.id == todo.id) {
          return todo;
        }
        return t;
      })
    })
  }

  return (
    <div className="todo-app-container">
      <div className="todo-app">
        <h2>Todo App</h2>

        <TodoForm addTodo={addTodo}/>
        <TodoList todos = {todos} deleteTodo={deleteTodo} updateTodo={updateTodo}/>
        <CheckAllAndRemaining/>

        <div className="other-buttons-container">
          <TodoFilters/>
          <ClearCompletedButton/>
        </div>
      </div>
    </div>
  );
}

export default App;