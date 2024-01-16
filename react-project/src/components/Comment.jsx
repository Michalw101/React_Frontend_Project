import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from "../App.jsx"
import "../css/Comment.css"

const Comment = ({ comment, setComments, comments }) => {

  const user = useContext(UserContext);
  const navigate = useNavigate();

  const [copyComment, setCopyComment] = useState({ ...comment });
  const [editState, setEditState] = useState(false);


  function handleChange(e) {
    const { name, value } = e.target;

    setCopyComment((prev) => ({
      ...prev,
      [name]: value
    }));
  }


  function handleSubmit() {
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(copyComment)
    };
    fetch(`http://localhost:3000/comments/${copyComment.id}`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setComments(comments.map(currentComment => comment.id == currentComment.id ? data : currentComment));
        setEditState((prev) => !prev);
      })
      .catch((error) => {
        console.error('There was an error!', error);
      });
    navigate(`/home/users/${user.id}/posts/${comment.postId}/comments`);
 }

  function editClicked() {
    setEditState((prev) => !prev);
    navigate(`/home/users/${user.id}/posts/${comment.postId}/comments/${comment.id}`);
  }

  function deleteClicked() {
    const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(comment)
    };

    fetch(`http://localhost:3000/comments/${comment.id}`, requestOptions)
      .then(() => {
        setComments(comments.filter(currentComment => currentComment.id !== comment.id));
      })
      .catch((error) => {
        console.error('There was an error!', error);
      });
  }

  function resetEdit(){
    setEditState(false);
    setCopyComment(comment);
    navigate(`/home/users/${user.id}/posts/${comment.postId}/comments`);
  }

  return (
    <>
      <div className='comment'>
        <p>{comment.id}. {comment.email}</p>
        <label>
          Comment title:
          <input className='commentInput'
            name="name"
            disabled={!editState}
            value={copyComment.name}
            onChange={handleChange} />
        </label>
        <label>
          <textarea className='commentInput'
            name="body"
            disabled={!editState}
            value={copyComment.body}
            onChange={handleChange}
            rows={6}
            cols={55}
          />
        </label>
        <hr />

        {(user.email === comment.email) &&
          <>{(!editState) && <button  className="btn" onClick={editClicked}>Edit</button>}
           <button className="btn" onClick={deleteClicked}>Delete</button></>}

        {editState && <><button  className="btn" onClick={handleSubmit}>Save comment</button>
          <button  className="btn"  onClick={resetEdit}>Reset edits</button></>}
      </div>
    </>)
}

export default Comment