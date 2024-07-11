import './reset.css';
import './App.css';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import CheckAllAndRemaining from './components/CheckAllAndRemaining';
import TodoFilters from './components/TodoFilters';
import ClearCompletedButton from './components/ClearCompletedButton';
import { useCallback, useEffect, useState } from 'react';

function App() {
  let [todos, setTodos] = useState([]);

  let [filteredTodos, setFilteredTodos] = useState(todos);

  useEffect(() => {
    fetch('http://localhost:3001/todos')
    .then(res => res.json())
    .then((todos) => {
      setTodos(todos)
      setFilteredTodos(todos)
    })
  },[])

  let filterTodo = useCallback((filter) => {
    if(filter === 'All') {
      setFilteredTodos(todos)
    }
    if(filter === 'Active') {
      setFilteredTodos(todos.filter(todo => !todo.completed ))
    }
    if(filter === 'Completed') {
      setFilteredTodos(todos.filter(todo => todo.completed))
    }
  }, [todos])
  console.log(filteredTodos);

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

  let checkTodo = () => {
    setTodos(prevState => {
      return prevState.map(t=> {
        return {...t, completed:true}
      })
    })
  }

  let remainingTodos = todos.filter(t => { return !t.completed}).length;

  let checkAllTodos = () => {
    todos.forEach( t => {
       t.completed = true;
       updateTodo(t)
    })

    setTodos(prevState => {
      return prevState.map(
        t=> {
          return {...t,completed:true}
        }
      )
    })
  }

  let clearCompleted = () => {
    todos.forEach(t => {
      if(t.completed) {
        deleteTodo(t.id);
      }
    })
    setTodos(prevState => {
      return prevState.filter(t => {
         return !t.completed
      })
    })
  }

  return (
    <div className="todo-app-container">
      <div className="todo-app">
        <h2>Todo App</h2>

        <TodoForm addTodo={addTodo}/>
        <TodoList todos = {filteredTodos} deleteTodo={deleteTodo} updateTodo={updateTodo}/>
        <CheckAllAndRemaining remainingTodos= {remainingTodos} checkAllTodos={checkAllTodos}/>

        <div className="other-buttons-container">
          <TodoFilters filterTodo={filterTodo}/>
          <ClearCompletedButton clearCompleted={clearCompleted}/>
        </div>
      </div>
    </div>
  );
}

export default App;