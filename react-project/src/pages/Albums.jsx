import React, { useEffect, useContext, useState } from 'react';
import { UserContext } from "../App.jsx"

const Albums = () => {

  const user = useContext(UserContext);
  const [alboms, setAlboms] = useState(null);
  const [sortBy, setSortBy] = useState('sequential');
  const [searchBy, setSearchBy] = useState('');

  useEffect(() => {
      fetch(`http://localhost:3000/alboms/?userId=${user.id}`)
        .then(res => res.json())
        .then(data => {
          console.log(data);
          setAlboms(data);
        })
  }, []);

  if (!alboms) {
    return <h1>Loading...</h1>
  }

  if (alboms.length === 0) {
    return <h1>No posts found.</h1>
  }

    const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchBy(event.target.value);
  };

  const sortedAndFilteredPosts = () => {
     filteredPosts = posts;

    if (searchBy) {
      filteredPosts = posts.filter(post =>
        post.title.toLowerCase().includes(searchBy.toLowerCase()) ||
        post.id.toString().includes(searchBy)
      );
    }

    switch (sortBy) {

      case 'sequential':
        return filteredPosts.sort((a, b) => a.id - b.id);
      case 'alphabetical':
        return filteredPosts.sort((a, b) => a.title.localeCompare(b.title));
      case 'random':
        return filteredPosts.sort(() => Math.random() - 0.5);
      default:
        return filteredPosts;
    }
  };


 // const addPostClicked = () => {
    
    //   const requestOptions = {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ ...newPost, userId: user.id })
    //   };
  
    //   fetch('http://localhost:3000/posts', requestOptions)
    //     .then(response => response.json())
    //     .then(data => {
    //       setPosts([...posts, data]);
    //       setAddPost(false);
    //       setNewPost({ title: '', completed: false });
    //     })
    //     .catch(error => console.error('There was an error!', error));
    // };
  
   // const cancelAddPost = () => {
  //   setAddPost(false);
  //   setNewPost({ title: '', completed: false });
  // };


  return (
    <>
    <h1>Alboms</h1>

    <div>
      <label htmlFor="sort">Sort by:</label>
      <select id="sort"
        value={sortBy}
        onChange={handleSortChange}>
        <option value="sequential">Sequential</option>
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
      {sortedAndFilteredPosts().map((post) => (
        <Post key={post.id} post={post} setPosts={setPosts} posts={posts} />
      ))}
    </ul>
  </>  )
}

export default Albums