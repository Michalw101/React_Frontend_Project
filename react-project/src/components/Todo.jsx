import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from "../App.jsx"



const Todo = ({ todo, setTodos, todos }) => {

    const navigate = useNavigate();
    const user = useContext(UserContext);
    const [copyTodo, setCopyTodo] = useState({ ...todo });
    const [editState, setEditState] = useState(false);
    const [checkboxClicked, setCheckboxClicked] = useState(false);
    const [handleSubmit, sethandleSubmit] = useState(false);


    function handleChange(e) {
        const { name, value } = e.target;
        setCopyTodo((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    function handleCheckboxChange(e) {
        const { checked } = e.target;
        setCopyTodo({
            ...copyTodo,
            "completed": checked
        });
        setCheckboxClicked((prev) => !prev);
    }


    useEffect(() => {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(copyTodo)
        };
        fetch(`http://localhost:3000/todos/${copyTodo.id}`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                let i, updateTodos;
                todos.map((t, index) => {
                    if (t.id === data.id) {
                        i = index;
                    }
                    return t;
                });
                updateTodos = [...todos];
                updateTodos[i] = data;
                setTodos(updateTodos);
                setEditState(false);
            })
            .catch((error) => {
                console.error('There was an error!', error);
            });
    }, [checkboxClicked, handleSubmit])


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
        <li>
            {copyTodo.id}
            <input
                type="text"
                className='input'
                value={copyTodo.title}
                name="title"
                onChange={handleChange}
                onDoubleClick={editTodoClicked}
            //  disabled={!editState}
            />
            <button onClick={deleteTodoClicked}>🚽</button>
            {editState && <div>

                <button onClick={() => {
                    navigate(`/home/users/${user.id}/todos`);
                    setEditState(false);
                    sethandleSubmit((prev) => !prev)
                }}>✔</button>

                <button onClick={() => {
                    setEditState((prev) => !prev);
                    // setTodos(todos);
                    navigate(`/home/users/${user.id}/todos`);
                }}>✖</button>

            </div>}

            <input
                type="checkbox"
                checked={copyTodo.completed}
                name="completed"
                onChange={handleCheckboxChange}
            />
        </li>
    );
};
export default Todo;
