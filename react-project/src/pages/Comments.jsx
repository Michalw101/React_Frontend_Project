import React, { useEffect, useState, useContext } from 'react'
import { UserContext } from "../App.jsx"
import { useParams } from 'react-router-dom';
import Comment from '../components/Comment.jsx';


const Comments = () => {
    const user = useContext(UserContext);
    const [comments, setComments] = useState(null);
    const [addComment, setAddComment] = useState(false);
    const [newComment, setNewComment]= useState({ name: '', body: '' });
    let { postId } = useParams();
    postId = parseInt(postId, 10);

    useEffect(() => {
        fetch(`http://localhost:3000/comments?postId=${postId}`)
            .then(response => response.json())
            .then(data => { 
                console.log(data);
                setComments(data);
            })
    }, []);

    if (!comments) {
        return <h1>Loading...</h1>
    }

    if (comments.length === 0) {
        return <h1>No comments found.</h1>
    }

      const addCommentClicked = () => {
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...newComment, postId: postId, email: user.email })
        };

        fetch('http://localhost:3000/todos', requestOptions)
          .then(response => response.json())
          .then(data => {
            setComments([...comments, data]);
            setAddComment(false);
            setNewComment({ name: '', body: '' });
          })
          .catch(error => console.error('There was an error!', error));
      }

    const cancelAddComment = () => {
        setAddComment(false);
        setNewComment({ name: '', body: '' });
      };

    return (
        <>
            {addComment ? (
        <div>
          <input
            type="text"
            value={newComment.name}
            onChange={(e) => setNewComment({ ...newComment, name: e.target.value })}
            placeholder="comment name"
          />
          <textarea
            name="body"
            value={newComment.body}
            onChange={(e) => setNewComment({ ...newComment, body: e.target.value })}
            rows={6}
            cols={50}
          />
          <button onClick={addCommentClicked}>Add Comment</button>
          <button onClick={cancelAddComment}>Cancel</button>
        </div>
      ) : (
        <button onClick={() => setAddComment((prev) => !prev)}>➕ COMMENT</button>
      )}

            <ul>
                {comments.map(
                    (comment) => (
                        <Comment key={comment.id} comment={comment} setComments={setComments} comments={comments}/>
                    ))}
            </ul>
        </>

    )
}

export default Comments