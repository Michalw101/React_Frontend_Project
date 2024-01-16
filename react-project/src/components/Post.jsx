import { useNavigate, Outlet } from 'react-router-dom';
import React, { useState, useContext } from 'react';
import { UserContext } from "../App.jsx"
import "../css/Posts.css"
const Post = ({ post, setPosts, posts }) => {

  const user = useContext(UserContext);
  const navigate = useNavigate();
  const [copyPost, setCopyPost] = useState({ ...post });
  const [formPost, setFormPost] = useState(false);
  const [editState, setEditState] = useState(false);
  const [viewComments, setViewComment] = useState(false);


  function handleChange(e) {
    const { name, value } = e.target;

    setCopyPost((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  function deletePostClicked() {
    const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(post)
    };

    fetch(`http://localhost:3000/posts/${post.id}`, requestOptions)
      .then(() => {
        setPosts(posts.filter(currentPost => currentPost.id !== post.id));
      })
      .catch((error) => {
        console.error('There was an error!', error);
      });
  }

  function handleSubmit() {
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(copyPost)
    };
    fetch(`http://localhost:3000/posts/${copyPost.id}`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setPosts(posts.map(currentPost => post.id == currentPost.id ? data : currentPost));
        setFormPost(false)
      })
      .catch((error) => {
        console.error('There was an error!', error);
      });
    navigate(`/home/users/${user.id}/posts`);
  }

  function resetEdit() {
    navigate(`/home/users/${user.id}/posts`);
    setEditState(false);
  }

  return (
    <>
      <div className='post'>
        <p onDoubleClick={() => {
          setFormPost((prev) => !prev),
            setEditState(false);
          navigate(`/home/users/${user.id}/posts/${post.id}`);
        }}>{post.id}. {post.title}</p>

      </div>
      {formPost && <div className='postDetails'>
          <input className='postInput'
            name="title"
            disabled={!editState}
            value={copyPost.title}
            onChange={handleChange} />
          <textarea className='postInput'
            name="body"
            disabled={!editState}
            value={copyPost.body}
            onChange={handleChange}
            rows={6}
            cols={50}
          />
        <hr />
        {(user.id == post.userId) && !editState && <button  className="btn" onClick={() => setEditState(true)}>Edit</button>}
        {editState && <><button  className="btn" onClick={handleSubmit}>Save Post</button>
          <button className="btn" onClick={resetEdit}>Reset edits</button></>}
        {(user.id == post.userId) && <button  className="btn"  onClick={deletePostClicked}>Delete</button>}
        <button  className="btn" onClick={() => {
          navigate(`/home/users/${user.id}/posts/${post.id}/comments`),
            setViewComment((prev) => !prev)
        }}>view comments</button>
      </div>}
      {viewComments && <Outlet />}
    </>
  );
};

export default Post;