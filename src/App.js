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

  return (
    <div className="todo-app-container">
      <div className="todo-app">
        <h2>Todo App</h2>

        <TodoForm addTodo={addTodo}/>
        <TodoList todos = {todos}/>
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