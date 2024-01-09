import React, { useState } from 'react';

const Todo = ({ todo }) => {
    const [to_do, setTo_do] = useState({...todo});
    const [isEnable, setIsEnable] = useState(false);
    const [update, setUpdate] = useState(false);

    function handleChange(e) {
        const { name, value, type, checked } = e.target;

        setTo_do((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    }

    function permissionChangeClicked(){
       setUpdate((prev) => !prev)
       /// PUT
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
                    onClick={() => {setIsEnable((prev) => !prev), setUpdate((prev) => !prev)}}
                />
               { update && <div><button onClick={permissionChangeClicked}>✔</button>
                <button onClick={() => {setUpdate((prev) => !prev)}}>✖</button></div>}

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
