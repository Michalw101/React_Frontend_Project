import React, { useState } from 'react';

function SignUp() {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [passwordVerify, setPasswordVerify] = useState('');
    const [signUpError, setSignUpError] = useState('');
    let foundUser;

    function handleRegistration() {
        if (!userName || !password || !passwordVerify) {
            setSignUpError('Please fill in all fields.');
        }
        else if (!ValidateEmail(email)) {
        }
        else if (!CheckPassword(password)) {
        }
        const url = `http://localhost:3000/users?username=${userName}`;
        fetch(url)
            .then(res => res.json())
            .then(user => {
                foundUser = user[0];
                if (foundUser != null) {
                    setSignUpError('User exists, please logIn');
                }
                else {
                    foundUser = {
                        "id": 0,
                        "userName": userName,
                        "email": email,
                        "website": password
                    }
                    // const userURL = `http://localhost:3000/users`;
                    // fetch("POST", userURL, )
                    // const newUser = {
                    //     userName: userName,
                    //     website: password
                    // };
                    // const requestOptions = {
                    //     method: 'POST',
                    //     body: JSON.stringify(newUser),
                    // };
                    // fetch(url, requestOptions)
                    //     .then(response => response.json())
                    //     .then(data => {
                    //         console.log(data.id);       // גישה ל-id של המשתמש החדש
                    //         console.log(data.userName); //  גישה ל-userName של המשתמש החדש
                    //         console.log(data.website);   // גישה ל-website של המשתמש החדש
                    //         localStorage.setItem(userName, JSON.stringify(data));
                    //         setSignUpError('User created successfully');
                    //         setVeriftPassword("");
                    //         setUserName("");
                    //         setPassword("");
                    //     })
                    //     .catch(error => {
                    //         setSignUpError('Error creating user');
                    //     });
                }
            })

        // localStorage.setItem(email, JSON.stringify(user));
        // setPlayersArray(prevPlayersArr => [...prevPlayersArr, user]);
        // setEmail("");
        // setName("");
        // setPassword("");
        // setSignUpError('Registration successful');

    }
    function ValidateEmail(mailAdress) {
        let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (mailAdress.match(mailformat)) {
            return true;
        } else {
            setSignUpError("You have entered an invalid email address!");
            return false;
        }
    }

    function CheckPassword(password) {
        let psw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,16}$/;
        if (password.match(psw)) {
            return true;
        } else {
            setSignUpError('Wrong password...! The password must contain letters and numbers');
            return false;
        }
    }

    return (
        <div >
            <h2 className="title">Create Account</h2><br />
            <input type="text" className='input' value={userName} placeholder="user name" onChange={(e) => setUserName(e.target.value)} /><br />
            <input type="email" className='input' value={email} placeholder="email" onChange={(e) => setEmail(e.target.value)} /><br />
            <input type="password" className='input' value={password} placeholder="password" onChange={(e) => setPassword(e.target.value)} /><br />
            <input type="passwordCheck" className='input' value={passwordVerify} placeholder="password-verify" onChange={(e) => setPasswordVerify(e.target.value)} /><br />
            <button className="btnOkSignUp" onClick={handleRegistration}>Connect</button><br />
            {signUpError && <p className='error' style={{ color: "red" }}>{signUpError}</p>}
        </div>
    )
};

export default SignUp;