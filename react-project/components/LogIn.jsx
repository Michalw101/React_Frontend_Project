import React, { useEffect, useState } from 'react';
import HomePage from '../components/HomePage'

function LogIn({ userName, setUserName, password, setPassword }) {

    const [loginError, setLoginError] = useState('');
    let user;

    function handleLogin() {
        const userURL = `http://localhost:3000/users?username=${userName}`;
        fetch(userURL)
            .then(response => response.json())
            .then(data => {
                user = data;
                console.log(user);
                if (user && user[0] && user[0].website == password) {
                    localStorage.setItem("currentUser", JSON.stringify(user[0]));
                    <HomePage />
                }
                if (!userName || !password)
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
            <button className="btnOkLogIn" onClick={handleLogin}>Connect</button><br />
            {loginError && <p className='error' style={{ color: "red" }}>{loginError}</p>}
        </div>
    );
}
export default LogIn