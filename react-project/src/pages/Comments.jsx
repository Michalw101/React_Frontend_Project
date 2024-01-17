import React, { useEffect, useState, useContext } from 'react'
import { UserContext } from "../App.jsx"
import { useLocation } from "react-router";
import Comment from '../components/Comment.jsx';

const Comments = () => {
  const user = useContext(UserContext);
  const [comments, setComments] = useState(null);
  const [addComment, setAddComment] = useState(false);
  const [newComment, setNewComment] = useState({ name: '', body: '' });
  const { state } = useLocation();
  const { id } = state || {};
  let postId = id;
  // let { postId } = useParams();
  // postId = parseInt(postId, 10);
  let returnMassege;

  useEffect(() => {
    fetch(`http://localhost:3000/comments?postId=${postId}`)
      .then(response => response.json())
      .then(data => {
        setComments(data);
      })
  }, []);

  if (!comments) 
    return <h1>Loading...</h1>

  if (comments.length === 0) 
    returnMassege = <h1>No comments found.</h1>

  const addCommentClicked = () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...newComment, postId: postId, email: user.email })
    };

    fetch('http://localhost:3000/comments', requestOptions)
      .then(response => response.json())
      .then(data => {
        setComments([...comments, data]);
        setAddComment(false);
        setNewComment({ name: '', body: '' });
      })
      .catch(error => console.error('There was an error!', error));
  }

  const cancleAddComment = () => {
    setAddComment(false);
    setNewComment({ name: '', body: '' });
  };

  return (
    <>
    {returnMassege}
      {addComment ? (
        <div className='comment'>
          <input className='postInput'
            type="text"
            value={newComment.name}
            onChange={(e) => setNewComment({ ...newComment, name: e.target.value })}
            placeholder="comment's name"
          />
          <textarea
            name="body" className='postInput'
            value={newComment.body}
            onChange={(e) => setNewComment({ ...newComment, body: e.target.value })}
            rows={6}
            cols={50}
            placeholder="comment's body"
          />
          <br/>
          <button className='btn' onClick={addCommentClicked}>Add</button>
          <button className='btn' onClick={cancleAddComment}>Cancel</button>
        </div>
      ) : (
        <button className='btn' onClick={() => setAddComment((prev) => !prev)}>➕ Add Comment</button>
      )}

      <div>
        {comments.map(
          (comment) => (
            <Comment key={comment.id} comment={comment} setComments={setComments} comments={comments} />
          ))}
      </div>
    </>
  )
}

export default Comments;