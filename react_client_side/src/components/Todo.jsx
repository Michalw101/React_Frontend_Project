import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from "../App.jsx"
import "../css/todos.css"


const Todo = ({ todo, setTodos, todos }) => {

    const navigate = useNavigate();
    const user = useContext(UserContext);
    const [editTodo, setEditTodo] = useState({ ...todo });
    const [editState, setEditState] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditTodo((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    const handleCheckboxChange = (e) => {
        const { checked } = e.target;
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...editTodo, completed: checked })
        };
        fetchRequestPut(requestOptions);
        setEditTodo({
            ...editTodo,
            completed: checked
        });
    }

    const handleSubmit = () => {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(editTodo)
        };
        fetchRequestPut(requestOptions);
        navigate(`/home/users/${user.id}/todos`);
        setEditState(false);
    }

    const fetchRequestPut = (requestOptions) => {
        fetch(`http://localhost:3000/todos/${editTodo.id}`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                setTodos(todos.map(currentTodo => todo.id == currentTodo.id ? data : currentTodo));
                setEditState(false);
            })
            .catch((error) => {
                console.error('There was an error!', error);
            });
    }

    const deleteTodoClicked = () => {
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(editTodo)
        };
        fetch(`http://localhost:3000/todos/${editTodo.id}`, requestOptions)
            .then(() => {
                setTodos(todos.filter(currentTodo => currentTodo.id !== todo.id));
            })
            .catch((error) => {
                console.error('There was an error!', error);
            });
        navigate(`/home/users/${user.id}/todos`);
    }

    const editTodoClicked = () => {
        setEditState((prev) => !prev)
        navigate(`/home/users/${user.id}/todos/${todo.id}`);
    }

    return (
        <div className='todo'>
            <h4 id="todoId">{editTodo.id}</h4>
            <input
                className='input width'
                type="text"
                value={editTodo.title}
                name="title"
                onChange={handleChange}
                onDoubleClick={editTodoClicked}
            />
            <input
                className='innerCheckbox'
                type="checkbox"
                checked={editTodo.completed}
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
                            setEditTodo(todo);
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
