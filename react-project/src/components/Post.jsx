import { useNavigate, Outlet } from 'react-router-dom';
import React, { useState, useContext } from 'react';
import { UserContext } from "../App.jsx"

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
    if (user.id != post.userId)
      alert("you can not delete this post :(");
    else {
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
  }

  function editPostClicked() {
    if (user.id != post.userId)
      alert("you can not edit this post :(");
    else
      setEditState(true);
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
  }


  return (
    <>
      <div>
        <p>ID: {post.id}</p>
        <h2 onDoubleClick={() => {
          setFormPost((prev) => !prev),
            setEditState(false);
          navigate(`/home/users/${user.id}/posts/${post.id}`);
        }}>{post.title}</h2>
        <button onClick={deletePostClicked}>🚽</button>
        <button onClick={() => {
          navigate(`/home/users/${user.id}/posts/${post.id}/comments`),
            setViewComment((prev) => !prev)
        }}>🍾</button>
      </div>
      {viewComments && <Outlet />}
      {formPost && <div className='postDetails'>
        <h2>{copyPost.id}</h2><br />
        {/* <input type="text" name="title" className='input' value={copyPost.title} onChange={handleChange} disabled={!editState} /><br />
        <input type="text" name="body" className='input' value={copyPost.body} onChange={handleChange} disabled={!editState} /><br /> */}

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


        {/* {!editState && <>
          <button onClick={editPostClicked}>🪁</button>
        </>} */}
        {/* {editState && <>
          <button onClick={handleSubmit}>✅</button>
          <button onClick={() => { setFormPost(false) }}>❎</button>
        </>} */}
        <hr />
        {!editState &&<button onClick={editPostClicked}>Edit</button>}
        {editState && <><button onClick={handleSubmit}>Save Post</button>
          <button>Reset edits</button></>}
      </div>}
    </>
  );
};

export default Post;