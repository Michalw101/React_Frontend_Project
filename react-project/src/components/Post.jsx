import React, { useEffect, useState } from 'react';

const Post = ({ post, setPosts, posts }) => {

  const [copyPost, setCopyPost] = useState({ ...post });
  const [formPost, setFormPost] = useState(false);
  const [postTitle, setPostTitle] = useState(false);
  const [postBody, setPostBody] = useState(false);

  function deleteTodoClicked() {
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

  function permissionUpdatePost()
  {

  }

  return (
    <>
      <div>
        <p>ID: {post.id}</p>
        <h2 onDoubleClick={() => { setFormPost((prev) => !prev) }}>{post.title}</h2>
        <button onClick={deleteTodoClicked}>🚽</button>
      </div>
      {formPost && <div className='postDetails'>
            <h2>{copyPost.id}</h2><br />
            <input type="postTitle" className='input' value={copyPost.title} onChange={(e) => setPostTitle(e.target.value)} /><br />
            <input type="postBody" className='input' value={copyPost.body} onChange={(e) => setPostBody(e.target.value)} /><br />
            <button onClick={permissionUpdatePost}>✅</button>
            <button onClick={()=>{setFormPost(false)}}>❎</button>
        </div>}
    </>
  );
};

      export default Post;