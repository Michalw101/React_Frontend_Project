import React, { useEffect, useContext, useState } from 'react';
import { UserContext } from "../App.jsx"

const Posts = () => {
  const user = useContext(UserContext);
  const [posts, setPosts] = useState(null);
  const [sortBy, setSortBy] = useState('sequential');
  const [searchBy, setSearchBy] = useState('');
  const [addPost, setAddPost] = useState(false);
  const [newPost, setNewPost] = useState({ title: '', body: '' });

  useEffect(() => {
    fetch(`http://localhost:3000/posts/${to_do.id}`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setPosts(data);
      })
  }, [user.id]);

  if (!posts) {
    return <h1>Loading...</h1>
  }
  if (posts.length === 0) {
    return <h1>No posts found.</h1>
  }

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchBy(event.target.value);
  };
  
  const sortedAndFilteredPosts = () => {
    let filteredPosts = posts;

    if (searchBy) {
      filteredPosts = posts.filter(post =>
        post.title.toLowerCase().includes(searchBy.toLowerCase()) ||
        post.id.toString().includes(searchBy)
      );
    }

    switch (sortBy) {
      case 'completed':
        return filteredPosts.sort((a, b) => a.completed - b.completed);
      case 'sequential':
        return filteredPosts.sort((a, b) => a.id - b.id);
      case 'alphabetical':
        return filteredPosts.sort((a, b) => a.title.localeCompare(b.title));
      case 'random':
        return filteredPosts.sort(() => Math.random());
      default:
        return filteredPosts;
    }
  };

  const addPostClicked = () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...newTodo, userId: user.id })
    };

    fetch('http://localhost:3000/posts', requestOptions)
      .then(response => response.json())
      .then(data => {
        setTodos([...todos, data]);
        setAddTodo(false);
        setNewTodo({ title: '', completed: false });
      })
      .catch(error => console.error('There was an error!', error));
  };

  const cancelAddPost = () => {
    setAddPost(false);
    setNewPost({ title: '', completed: false });
  };

  return (
    <ul>
    {sortedAndFilteredTodos().map(
      (todo) => (
        todo.userId === user.id &&
        <Todo key={todo.id} todo={todo} setTodos={setTodos} todos={todos} />
      ))}
  </ul>
  )
}

export default Posts