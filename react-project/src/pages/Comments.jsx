import React, { useEffect, useState, useContext } from 'react'
import { UserContext } from "../App.jsx"
import { useParams } from 'react-router-dom';


const Comments = () => {
    const user = useContext(UserContext);
    const [comments, setComments] = useState([]);
    const [addComments, setAddComments] = useState([]);
    let { postId } = useParams();


        useEffect(() => {
            fetch(`http://localhost:3000/comments?postId=${postId}`)
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    setComments(data);
                })
        });

    // if (!comments) {
    //     return <h1>Loading...</h1>
    // }

    // if (comments.length === 0) {
    //     return <h1>No comments found.</h1>
    // }

    //   const addTodoClicked = () => {
    //     const requestOptions = {
    //       method: 'POST',
    //       headers: { 'Content-Type': 'application/json' },
    //       body: JSON.stringify({ ...newTodo, userId: user.id })
    //     };

    //     fetch('http://localhost:3000/todos', requestOptions)
    //       .then(response => response.json())
    //       .then(data => {
    //         setTodos([...todos, data]);
    //         setAddTodo(false);
    //         setNewTodo({ title: '', completed: false });
    //       })
    //       .catch(error => console.error('There was an error!', error));
    //   }

    // const cancelAddTodo = () => {
    //     setAddTodo(false);
    //     setNewTodo({ title: '', completed: false });
    //   };

    return (
        <>
            {/* {addTodo ? (
        <div>
          <input
            type="text"
            value={newTodo.title}
            onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
            placeholder="Todo title"
          />
          <button onClick={addTodoClicked}>Add Todo</button>
          <button onClick={cancelAddTodo}>Cancel</button>
        </div>
      ) : (
        <button onClick={() => setAddTodo((prev) => !prev)}>➕</button>
      )} */}

            <ul>
                {comments.map(
                    (comment) => (
                        <Comment />
                    ))}
            </ul>
        </>

    )
}

export default Comments