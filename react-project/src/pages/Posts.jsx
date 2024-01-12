import React, { useEffect, useContext, useState } from 'react';
import { UserContext } from "../App.jsx"
import Post from "../components/Post.jsx"

const Posts = () => {
  const user = useContext(UserContext);
  const [posts, setPosts] = useState(null);
  const [searchBy, setSearchBy] = useState('');
  const [addPost, setAddPost] = useState(false);
  const [newPost, setNewPost] = useState({ title: '', body: '' });
   const [showAllPosts, setShowAllPosts] = useState(false)

  let filteredPosts = posts;

  useEffect(() => {
     if (!showAllPosts) {
      fetch(`http://localhost:3000/posts/?userId=${user.id}`)
        .then(res => res.json())
        .then(data => {
          console.log(data);
          setPosts(data);
        })
     }
  }, [ ,showAllPosts]);

  useEffect(() => {
    if (showAllPosts) {
      fetch(`http://localhost:3000/posts`)
        .then(res => res.json())
        .then(data => {
          setPosts(data);
          console.log(data);
        })
    }
  }, [showAllPosts]);

  if (!posts) {
    return <img src="../images/Loading.gif"/>
  }

  if (posts.length === 0) {
    return <h1>No posts found.</h1>
  }

  const handleSearchChange = (event) => {
    setSearchBy(event.target.value);
  };

  const filterPosts = () => {

     filteredPosts = posts;

    if (searchBy) {
      filteredPosts = posts.filter(post =>
        post.title.toLowerCase().includes(searchBy.toLowerCase()) ||
        post.id.toString().includes(searchBy)
      );
    }
    return filteredPosts;
  };

  const addPostClicked = () => {
    
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...newPost, userId: user.id })
    };

    fetch('http://localhost:3000/posts', requestOptions)
      .then(response => response.json())
      .then(data => {
        setPosts([...posts, data]);
        setAddPost(false);
        setNewPost({ title: '', body: '' });
      })
      .catch(error => console.error('There was an error!', error));
  };

  const cancelAddPost = () => {
    setAddPost(false);
    setNewPost({ title: '', body: '' });
  };

  return (
    <>
      <h1>Posts</h1>

     {showAllPosts? 
     <button onClick={() => setShowAllPosts(false)}>show my posts</button>:
     <button onClick={() => setShowAllPosts(true)}>show all posts</button>}
      <div>
        <label htmlFor="search">Search:</label>
        <input
          type="text"
          id="search"
          value={searchBy}
          onChange={handleSearchChange}
        />
      </div>
      {addPost ? (
        <div>
          <input
            type="text"
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
            placeholder="Post title"
          />
          <input
            type="text"
            value={newPost.body}
            onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
            placeholder="Post body"
          />
          <button onClick={addPostClicked}>Add Post</button>
          <button onClick={cancelAddPost}>Cancel</button>
        </div>
      ) : (
        <button onClick={() => setAddPost((prev) => !prev)}>➕</button>
      )}

      <ul>
        {filterPosts().map((post) => (
          <Post key={post.id} post={post} setPosts={setPosts} posts={posts} />
        ))}
      </ul>
    </>
    )
}

export default Posts