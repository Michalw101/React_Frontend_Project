import React, { useEffect, useContext, useState } from 'react';
import { UserContext } from "../App.jsx"

const Todos = () => {
  const { user } = useContext(UserContext);
  const [todos, setTodos] = useState(null);
  const [sortBy, setSortBy] = useState('sequential');
  const [searchBy, setSearchBy] = useState('');

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

  const sortedAndFilteredTodos = () => {
    let filteredTodos = todos;

    if (searchBy) {
      filteredTodos = todos.filter(todo =>
        todo.title.toLowerCase().includes(searchBy.toLowerCase()) ||
        todo.id.toString().includes(searchBy)
      );
    }

    // Sort by sort criterion
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
        // Default: sort sequentially
        return filteredTodos;
    }
  };


  return (
    <div>
      <h1>Todos</h1>
      <div>
        <label htmlFor="sort">Sort by:</label>
        <select id="sort" value={sortBy} onChange={handleSortChange}>
          <option value="sequential">Sequential</option>
          <option value="completed">Completed</option>
          <option value="alphabetical">Alphabetical</option>
          <option value="random">Random</option>
        </select>
      </div>

      <div>
        <label htmlFor="search">Search:</label>
        <input
          type="text"
          id="search"
          value={searchBy}
          onChange={handleSearchChange}
        />
      </div>

      <ul>
        {sortedAndFilteredTodos().map((todo) => (
          <Todo todt={todo}/>
        ))}
      </ul>
    </div>
  )
}

export default Todos;
