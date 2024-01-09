import React, { useState } from 'react';

const Todo = ({ todo, setTodos, todos }) => {
    const [to_do, setTo_do] = useState({ ...todo });
    // const [isEnable, setIsEnable] = useState(false);
    const [update, setUpdate] = useState(false);

    function handleChange(e) {
        const { name, value, type, checked } = e.target;

        setTo_do((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    }

    function permissionChangeClicked() {
        setUpdate((prev) => !prev)

        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(to_do)
        };
        fetch(`http://localhost:3000/todos/${to_do.id}`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                let i, updateTodos;
                todos.map((t, index) => {
                    if (t.id === data.id) {
                        i = index;
                    }
                    return t;
                });
                updateTodos = todos;
                updateTodos[i] = data;
                setTodos(updateTodos);
                console.log(todos);
            })
            .catch((error) => {
                console.error('There was an error!', error);
            });
    }

    function deleteTodoClicked() {
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(to_do)
        };
        fetch(`http://localhost:3000/todos/${to_do.id}`, requestOptions)
            .then((response) => response.json())
            .then(() => {
                let i, updateTodos;
                todos.map((t, index) => {
                    if (t.id === to_do.id) {
                        i = index;
                    }
                    return t;
                });
                updateTodos = todos;
                updateTodos.splice(i, 1);
                setTodos(updateTodos);
                console.log(todos);
            })
            .catch((error) => {
                console.error('There was an error!', error);
            });
    }

    return (
        <li>
            {to_do.id}
            <input
                type="text"
                className='input'
                value={to_do.title}
                name="title"
                onChange={handleChange}
                // onClick={() => { setIsEnable((prev) => !prev), setUpdate((prev) => !prev) }}
                onClick={() => { setUpdate((prev) => !prev) }}

            />
            <button onClick={deleteTodoClicked}>🚽</button>
            {update && <div><button onClick={permissionChangeClicked}>✔</button>
                <button onClick={() => {
                    setUpdate((prev) => !prev);
                    // setTodos(todos)
                }}>✖</button></div>}

            <input
                type="checkbox"
                checked={to_do.completed}
                name="completed"
                onChange={handleChange}
            />
        </li>
    );
};

export default Todo;
