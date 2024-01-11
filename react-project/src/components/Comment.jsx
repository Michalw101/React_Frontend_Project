import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from "../App.jsx"


const Comment = ({ comment, setComments, comments }) => {

  const user = useContext(UserContext);
  const navigate=useNavigate();

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
        let i, updateComments;
        comments.map((c, index) => {
          if (c.id === data.id) {
            i = index;
          }
          return c;
        });
        updateComments = [...comments];
        updateComments[i] = data;
        setComments(updateComments);
        setEditState((prev)=>!prev);
      })
      .catch((error) => {
        console.error('There was an error!', error);
      });

  }
  function EditClicked() {
    if (user.email === comment.email)
    {
      setEditState((prev) => !prev);
      navigate(`/home/users/${user.id}/posts/${comment.postId}/comments/${comment.id}`);
    }
    else
      alert("you cannot edit this comment :(")
  }
  function deleteClicked(){
    if (user.email === comment.email){
      const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(copyComment)
      };
  
      fetch(`http://localhost:3000/comments/${copyComment.id}`, requestOptions)
        .then(() => {
          let i, updateComments;
          comments.map((c, index) => {
            if (c.id === copyComment.id) {
              i = index;
            }
            return c;
          });
          updateComments = [...comments]
          updateComments.splice(i, 1);
          setComments(updateComments);
        })
        .catch((error) => {
          console.error('There was an error!', error);
        });

    }
    else
    alert("you cannot delete this comment :(")

  }

  return (
    <>
      <div>
        <p>ID: {comment.id}</p>
        <h2>{comment.email}</h2>
      </div>
      <div >
        <label>
          Comment title:
          <input
            name="name"
            disabled={!editState}
            value={copyComment.name}
            onChange={handleChange} />
        </label>
        <br />
        <label>
          <textarea
            name="body"
            disabled={!editState}
            value={copyComment.body}
            onChange={handleChange}
            rows={6}
            cols={50}
          />
        </label>
        <hr />
        <button onClick={EditClicked}>Edit</button>
        <button onClick={deleteClicked}>🚽</button>


        {editState && <><button onClick={handleSubmit}>Save comment</button>
          <button>Reset edits</button></>}
      </div>
      {/* } */}
    </>)
}

export default Comment