import React, { useEffect, useContext, useState } from 'react';
import { UserContext } from "../App.jsx"
import Post from "../components/Post.jsx"
import MyImage from '../images/Loading.gif';

const Posts = () => {
  const user = useContext(UserContext);
  const [userPosts, setUserPosts] = useState(null);
  const [allPosts, setAllPosts] = useState(null);
  const [searchBy, setSearchBy] = useState('');
  const [addPost, setAddPost] = useState(false);
  const [newPost, setNewPost] = useState({ title: '', body: '' });
  const [allPostsLoaded, setAllPostsLoaded] = useState(false)
  const [showAllPosts, setShowAllPosts] = useState(false);
  let returnMassege = "";

  useEffect(() => {
    fetch(`http://localhost:3000/posts/?userId=${user.id}`)
      .then(res => res.json())
      .then(data => {
        setUserPosts(data);
      })
  }, []);

  useEffect(() => {
    if (allPosts == null && allPostsLoaded == true) {
      fetch(`http://localhost:3000/posts`)
        .then(res => res.json())
        .then(data => {
          setAllPosts(data);
        })
    }
  }, [allPostsLoaded]);

  if ((!showAllPosts && !userPosts) || (showAllPosts && !allPosts)) 
    return <img src={MyImage} />
  
  if ((!showAllPosts && userPosts.length === 0) || (showAllPosts && allPosts.length === 0)) 
    returnMassege = <h1>No posts found.</h1>
  
  const handleSearchChange = (event) => {
    setSearchBy(event.target.value);
  };

  const filterPosts = () => {
    let filteredPosts = showAllPosts ? allPosts : userPosts;;
    let posts = showAllPosts ? allPosts : userPosts;
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
        showAllPosts ? setAllPosts([...allPosts, data]) : setUserPosts([...userPosts, data]) ;
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
    <div className='posts'>
      <h1>Posts</h1>
      {returnMassege}
      {addPost ? (
        <div className='addPost'>
          <input className='postInput'
            type="text"
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
            placeholder="Post title"
          /><br />
          <input className='postInput'
            type="text"
            value={newPost.body}
            onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
            placeholder="Post body"
          /><br />
          <button className="btn" onClick={addPostClicked}>Add Post</button>
          <button className="btn" onClick={cancelAddPost}>Cancel</button>
        </div>
      ) : (
        <button id="plus" className='btnMiddle' onClick={() => setAddPost((prev) => !prev)}>➕ Add Post</button>
      )}

      {showAllPosts ? (
        <button id="plus" className='btnMiddle' onClick={() => setShowAllPosts(false)}>show my posts</button>
      ) : (
        <button id="plus" className='btnMiddle' onClick={() => { setShowAllPosts(true), setAllPostsLoaded(true) }}>show all posts</button>
      )}
      <div>

        <div className='search'>
          <label htmlFor="search">Search: </label>
          <input
            type="text"
            id="search"
            value={searchBy}
            onChange={handleSearchChange}
          />
        </div>

         <div className='allPost'>
          {filterPosts().map((post) => (
            <Post key={post.id}
              post={post}
              setPosts={showAllPosts ? setAllPosts : setUserPosts}
              posts={showAllPosts ? allPosts : userPosts} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Posts;