import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from "../App.jsx"
import "../css/todos.css"


const Todo = ({ todo, setTodos, todos }) => {

    const navigate = useNavigate();
    const user = useContext(UserContext);
    const [copyTodo, setCopyTodo] = useState({ ...todo });
    const [editState, setEditState] = useState(false);

    function handleChange(e) {
        const { name, value } = e.target;
        setCopyTodo((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    function handleCheckboxChange(e) {
        const { checked } = e.target;
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({...copyTodo, completed: checked})
        };
        updateTodos(requestOptions);
        setCopyTodo({
            ...copyTodo,
            completed: checked
        });
    }

    const updateTodos = (requestOptions) =>{
        fetch(`http://localhost:3000/todos/${copyTodo.id}`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                setTodos(todos.map(currentTodo => todo.id == currentTodo.id ? data : currentTodo));
                setEditState(false);
            })
            .catch((error) => {
                console.error('There was an error!', error);
            });
    }

    const handleSubmit=()=>
    {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(copyTodo)
        };
        updateTodos(requestOptions);
        navigate(`/home/users/${user.id}/todos`);
        setEditState(false);
    }

    function deleteTodoClicked() {
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(copyTodo)
        };
        fetch(`http://localhost:3000/todos/${copyTodo.id}`, requestOptions)
            .then(() => {
                let i, updateTodos;
                todos.map((t, index) => {
                    if (t.id === copyTodo.id) {
                        i = index;
                    }
                    return t;
                });
                updateTodos = [...todos];
                updateTodos.splice(i, 1);
                setTodos(updateTodos);
            })
            .catch((error) => {
                console.error('There was an error!', error);
            });
        navigate(`/home/users/${user.id}/todos`);
    }

    function editTodoClicked() {
        setEditState((prev) => !prev)
        navigate(`/home/users/${user.id}/todos/${todo.id}`);
    }

    return (
        <div className='todo'>
            <h4 id="todoId">{copyTodo.id}</h4>
            <input
                className='input width'
                type="text"
                value={copyTodo.title}
                name="title"
                onChange={handleChange}
                onDoubleClick={editTodoClicked}
            />
            <input
                className='innerCheckbox'
                type="checkbox"
                checked={copyTodo.completed}
                name="completed"
                onChange={handleCheckboxChange}
            />
            {editState && (
                <div className='buttons-container'>
                    <button
                        onClick={handleSubmit}
                    >
                        ✔
                    </button>
                    <button
                        onClick={() => {
                            setEditState((prev) => !prev);
                            navigate(`/home/users/${user.id}/todos`);
                        }}
                    >
                        ✖
                    </button>
                </div>
            )}
            <button className="delete" onClick={deleteTodoClicked}>Delete</button>
        </div>
    );
};
export default Todo;
