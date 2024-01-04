import React, { useEffect, useState } from 'react';
import {  Link } from "react-router-dom"

function LogIn({state, setState }) {

    const [loginError, setLoginError] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    let user, isCorrect;

    function handleLogin() {
        const userURL = `http://localhost:3000/users?username=${userName}`;
        fetch(userURL)
            .then(response => response.json())
            .then(data => {
                user = data;
                console.log(user);
                if (user && user[0] && user[0].website == password) {
                    setLoginError("");
                    localStorage.setItem("currentUser", JSON.stringify(user[0]));
                    setState("homepage");
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
            
            {state!="homepage"&&  <button className="btnOkLogIn" onClick={ handleLogin}>Connect</button>}
            {state=="homepage" && <Link className='link' to="/HomePage">   <button className="btnOkLogIn" onClick={ handleLogin}>Connect</button><br /></Link>}
  
            

            {loginError && <p className='error' style={{ color: "red" }}>{loginError}</p>}

        </div>
    );
}
export default LogIn