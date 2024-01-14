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
      body: JSON.stringify(copyPost)
    };

    fetch(`http://localhost:3000/posts/${copyPost.id}`, requestOptions)
      .then(() => {
        let i, updatePosts;
        posts.map((t, index) => {
          if (t.id === copyPost.id) {
            i = index;
          }
          return t;
        });
        updatePosts = [...posts]
        updatePosts.splice(i, 1);
        setPosts(updatePosts);
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
        let i, updatePosts;
        posts.map((p, index) => {
          if (p.id === data.id) {
            i = index;
          }
          return p;
        });
        updatePosts = [...posts];
        updatePosts[i] = data;
        setPosts(updatePosts);
        setFormPost(false)
      })
      .catch((error) => {
        console.error('There was an error!', error);
      });
    navigate(`/home/users/${user.id}/posts`);
  }

  function resetEdit(){
    navigate(`/home/users/${user.id}/posts`);
    setEditState(false);
  }

  return (
    <>
      <div className='post'>
        <p>ID: {post.id}</p>
        <h2 onDoubleClick={() => {
          setFormPost((prev) => !prev),
            setEditState(false);
          navigate(`/home/users/${user.id}/posts/${post.id}`);
        }}>{post.title}</h2>
        {(user.id == post.userId) && <button onClick={deletePostClicked}>🚽</button>}
        <button onClick={() => {
          navigate(`/home/users/${user.id}/posts/${post.id}/comments`),
            setViewComment((prev) => !prev)
        }}>🍾</button>
      </div>
      {viewComments && <Outlet />}
      {formPost && <div className='postDetails'>
        <h2>{copyPost.id}</h2><br />

        <label>
          Post title:
          <input
            name="title"
            disabled={!editState}
            value={copyPost.title}
            onChange={handleChange} />
        </label>
        <br />
        <label>
          <textarea
            name="body"
            disabled={!editState}
            value={copyPost.body}
            onChange={handleChange}
            rows={6}
            cols={50}
          />
        </label>

        <hr />
        {(user.id == post.userId) && !editState && <button onClick={()=> setEditState(true)}>Edit</button>}
        {editState && <><button onClick={handleSubmit}>Save Post</button>
          <button onClick={resetEdit}>Reset edits</button></>}
      </div>}
    </>
  );
};

export default Post;