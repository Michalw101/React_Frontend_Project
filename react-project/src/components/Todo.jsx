import React from 'react'

const Todo = ({ todo }) => {
    return (
        <li key={todo.id}>
      {/* <input type="text" className='input' value={todo.title} name="name" placeholder="name" onChange={handleChange} /><br />

            <p>{todo.id} {}
                <input
                    type="checkbox"
                    checked={todo.completed}
                    disabled
                /></p> */}
        </li>)
}

export default Todo
