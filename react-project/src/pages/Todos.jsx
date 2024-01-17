import React, { useEffect, useContext, useState } from 'react';
import { UserContext } from "../App.jsx"
import Todo from '../components/Todo.jsx';
import "../css/todos.css"
import MyImage from '../images/Loading.gif';

const Todos = () => {
  const user = useContext(UserContext);
  const [todos, setTodos] = useState(null);
  const [sortBy, setSortBy] = useState('sequential');
  const [searchBy, setSearchBy] = useState('');
  const [addTodo, setAddTodo] = useState(false);
  const [newTodo, setNewTodo] = useState({ title: '', completed: false });
  const [searchCheckbox, setSearchCheckbox] = useState(false);
  let returnMassege = "";

  useEffect(() => {
    fetch(`http://localhost:3000/todos?userId=${user.id}`)
      .then(res => res.json())
      .then(data => {
        setTodos(data);
      })
  }, []);

  if (!todos) 
    return <img src={MyImage} />;
  
  if (todos.length === 0) 
    returnMassege = <h1>No todos found.</h1>
  
  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchBy(event.target.value);
  };

  const handleSearchCheckboxChange = () => {
    setSearchCheckbox((prev) => !prev);
    setSearchBy("completed");
  };

  const sortedAndFilteredTodos = () => {
    let filteredTodos;

    if (searchBy != null) {
      filteredTodos = todos.filter(todo =>
        (searchBy == "completed" && todo.completed === searchCheckbox) ||
        (searchBy != "completed" &&
          todo.title.toLowerCase().includes(searchBy.toLowerCase()) ||
          todo.id.toString().includes(searchBy))
      );
    }

    switch (sortBy) {
      case 'completed':
        return filteredTodos.sort((a, b) => a.completed - b.completed);
      case 'sequential':
        return filteredTodos.sort((a, b) => a.id - b.id);
      case 'alphabetical':
        return filteredTodos.sort((a, b) => a.title.localeCompare(b.title));
      case 'random':
        return filteredTodos.sort(() => Math.random() - 0.5);
      default:
        return filteredTodos;
    }
  };

  const addTodoClicked = () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...newTodo, userId: user.id })
    };

    fetch('http://localhost:3000/todos', requestOptions)
      .then(response => response.json())
      .then(data => {
        setTodos([...todos, data]);
        setAddTodo(false);
        setNewTodo({ title: '', completed: false });
      })
      .catch(error => console.error('There was an error!', error));
  }

  const cancleAddTodo = () => {
    setAddTodo(false);
    setNewTodo({ title: '', completed: false });
  };

  return (
    <div className='todos'>
      <h1>Todos</h1>
      {returnMassege}
      <div className='search'>
        <label htmlFor="sort">Sort by: </label>
        <select
          id="sort"
          value={sortBy}
          onChange={handleSortChange}>
          <option value="sequential">Sequential</option>
          <option value="completed">Completed</option>
          <option value="alphabetical">Alphabetical</option>
          <option value="random">Random</option>
        </select>
        <br />
        <br />
        <label htmlFor="search">Search: </label>
        <input
          type="text"
          id="search"
          value={searchBy}
          onChange={handleSearchChange}
        />
        <br />
        <br />
        <label htmlFor="searchCheckbox">
          Completed
          <input
            id="checkbox"
            type="checkbox"
            checked={searchCheckbox}
            name="searchCheckbox"
            onChange={handleSearchCheckboxChange}
          />
        </label></div>
      {addTodo ? (
        <div className='addTodo'>
          <input
            className='todoInput'
            type="text"
            value={newTodo.title}
            onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
            placeholder="Todo title"
          />
          <button className="btn" onClick={addTodoClicked}>Save Todo</button>
          <button className="btn" onClick={cancleAddTodo}>Cancel</button>
        </div>
      ) : (
        <button id="plus" onClick={() => setAddTodo((prev) => !prev)}>
          ➕ Add Todo
        </button>
      )}

      <div id='allTodos'>
        {sortedAndFilteredTodos().map((todo) => (
          todo.userId === user.id && (
            <Todo key={todo.id} todo={todo} setTodos={setTodos} todos={todos} />
          )
        ))}

      </div>
    </div>
  );
}

export default Todos;