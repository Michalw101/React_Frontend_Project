import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom"


function LogIn() {

    const navigate = useNavigate();
    const [loginError, setLoginError] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    let user;

    function handleLogin() {
        const userURL = `http://localhost:3000/users?username=${userName}`;
        fetch(userURL)
            .then(response => response.json())
            .then(data => {
                user = data;
                console.log(user);
                if (user && user[0] && user[0].website == password) {
                    setLoginError("");
                    localStorage.setItem("currentUser", user[0].id);
                    localStorage.setItem( user[0].id, JSON.stringify(user[0]));
                    navigate('/home');
                }
                else if (!userName || !password)
                    setLoginError('Please fill in all fields.');
                else
                    setLoginError("Username or password is not correct")
            })
    }

    return (
        <div >
            <h2 className="title">Log in</h2><br />
            <input type="userName" className='input' value={userName} placeholder="user name" onChange={(e) => setUserName(e.target.value)} /><br />
            <input type="password" className='input' value={password} placeholder="password" onChange={(e) => setPassword(e.target.value)} /><br />
            {loginError && <p className='error' style={{ color: "red" }}>{loginError}</p>}
            <button className="btnOkLogIn" onClick={handleLogin}>Connect</button>
            <Link className='link' to="/register" >Dont have an account? Sign up</Link>

        </div>
    );
}
export default LogIn