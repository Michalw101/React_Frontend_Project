import React from 'react';

const Post = ({ post }) => {
  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <p>ID: {post.id}</p>
      <p>User ID: {post.userId}</p>
    </div>
  );
};

export default Post;