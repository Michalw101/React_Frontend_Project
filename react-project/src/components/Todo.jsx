import React, { useEffect, useState } from 'react';

const Todo = ({ todo, setTodos, todos }) => {
    const [copyTodo, setCopyTodo] = useState({ ...todo });
    const [update, setUpdate] = useState(false);
    const [checkboxClicked, setCheckboxClicked] = useState(false);
    const [updateVClicked, setUpdateVClicked] = useState(false);


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
                setUpdate(false);
            })
            .catch((error) => {
                console.error('There was an error!', error);
            });

    }, [checkboxClicked, updateVClicked])



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
                onClick={() => { setUpdate((prev) => !prev) }}

            />
            <button onClick={deleteTodoClicked}>🚽</button>
            {update && <div><button onClick={() => {
                setUpdateVClicked((prev) => !prev);
                setUpdate((prev) => !prev)
            }}>✔</button>
                <button onClick={() => {
                    setUpdate((prev) => !prev);
                    // setTodos(todos);
                    
                }}>✖</button></div>}

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
