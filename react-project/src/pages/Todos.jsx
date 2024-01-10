import React, { useEffect, useContext, useState } from 'react';
import { UserContext } from "../App.jsx"
import Todo from '../components/Todo.jsx';

const Todos = () => {
  const user = useContext(UserContext);
  const [todos, setTodos] = useState([]);
  const [sortBy, setSortBy] = useState('sequential');
  const [searchBy, setSearchBy] = useState('');
  const [addTodo, setAddTodo] = useState(false);
  const [newTodo, setNewTodo] = useState({ title: '', completed: false });
  const [searchCheckbox, setSearchCheckbox] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:3000/todos?userId=${user.id}`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setTodos(data);
      })
  }, [user.id]);

  if (!todos) {
    return <h1>Loading...</h1>
  }

  if (todos.length === 0) {
    return <h1>No todos found.</h1>
  }

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
    let filteredTodos = todos;

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
        return filteredTodos.sort(() => Math.random());
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

  const cancelAddTodo = () => {
    setAddTodo(false);
    setNewTodo({ title: '', completed: false });
  };

  return (
    <div>
      <h1>Todos</h1>
      <div>
        <label htmlFor="sort">Sort by:</label>
        <select id="sort"
          value={sortBy}
          onChange={handleSortChange}>
          <option value="sequential">Sequential</option>
          <option value="completed">Completed</option>
          <option value="alphabetical">Alphabetical</option>
          <option value="random">Random</option>
        </select>
      </div>

      {/* <div>
        <label htmlFor="search">Search:</label>
        <input
          type="text"
          id="search"
          value={searchBy}
          onChange={handleSearchChange}
        />
        <input
          type="checkbox"
          checked={searchCheckbox}
          name="searchCheckbox"
          onChange={() => {
            setSearchCheckbox((prev) => !prev);
            searchCheckbox ? setSearchBy("completed") : setSearchBy("not-completed");
          }}
        />
      </div> */}


      <div>
        <label htmlFor="search">Search:</label>
        <input
          type="text"
          id="search"
          value={searchBy}
          onChange={handleSearchChange}
        />
        <input
          type="checkbox"
          checked={searchCheckbox}
          name="searchCheckbox"
          onChange={handleSearchCheckboxChange}
        />
        <label htmlFor="searchCheckbox">Completed</label>
      </div>

      {addTodo ? (
        <div>
          <input
            type="text"
            value={newTodo.title}
            onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
            placeholder="Todo title"
          />
          <button onClick={addTodoClicked}>Add Todo</button>
          <button onClick={cancelAddTodo}>Cancel</button>
        </div>
      ) : (
        <button onClick={() => setAddTodo((prev) => !prev)}>➕</button>
      )}

      <ul>
        {sortedAndFilteredTodos().map(
          (todo) => (
            todo.userId === user.id &&
            <Todo key={todo.id} todo={todo} setTodos={setTodos} todos={todos} />
          ))}
      </ul>
    </div>
  )
}

export default Todos;