import React, { useState } from 'react';

const Todo = ({ todo, setTodos, todos }) => {
    const [to_do, setTo_do] = useState({ ...todo });
    const [update, setUpdate] = useState(false);

    function handleChange(e) {
        const { name, value } = e.target;

        setTo_do((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    function handleCheckboxChange(e) {
        const { checked } = e.target;
        const metumtam ={
            ...to_do,
            "completed": checked
        }
        setTo_do(metumtam);
    }

        function permissionChangeClicked() {

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
                    updateTodos = [...todos];
                    updateTodos[i] = data;
                    setTodos(updateTodos);
                    setUpdate(false);
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
                .then(() => {
                    let i, updateTodos;
                    todos.map((t, index) => {
                        if (t.id === to_do.id) {
                            i = index;
                        }
                        return t;
                    });
                    updateTodos = [...todos];
                    updateTodos.splice(i, 1);
                    setTodos(updateTodos);
                    console.log(updateTodos);
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
                    onClick={() => { setUpdate((prev) => !prev) }}

                />
                <button onClick={deleteTodoClicked}>🚽</button>
                {update && <div><button onClick={() => {
                    permissionChangeClicked();
                    setUpdate((prev) => !prev)
                }}>✔</button>
                    <button onClick={() => {
                        setUpdate((prev) => !prev);
                        // setTodos(todos);
                    }}>✖</button></div>}

                <input
                     type="checkbox"
                     checked={to_do.completed}
                     name="completed"
                    onChange={(e) => {
                        handleCheckboxChange(e);
                        permissionChangeClicked(e);
                    }}
                />
            </li>
        );
    };
    export default Todo;
