import React, { useState } from 'react';

const UserDetails = ({prevUser}) => {
    const [user, setUser] = useState(
        {
            id: "",
            name: "",
            username: "",
            email: "",
            address: {
                street: "",
                suite: "",
                city: "",
                zipcode: "",
                geo: {
                    lat: "",
                    lng: ""
                }
            },
            phone: "",
            website: "",
            company: {
                name: "",
                catchPhrase: "",
                bs: ""
            }
        });
    const [signUpError, setSignUpError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value,
        });

        const postUser=()=>{
            setUser({
                ...user,
                username: prevUser.username,
                website: prevUser.username,
            });
            
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        };
        fetch(`http://localhost:3000/users`, requestOptions)
            .then(response => response.json())
            .then(data => this.setState({...user, id: data.id }));  
        }

        return (
            <>
                <div>
                    <h2 className="title">User Details</h2><br />
                    <input type="text" className='input' value={user.name} name="name" placeholder="name" onChange={handleChange} /><br />
                    <input type="text" className='input' value={user.email} name="email" placeholder="email" onChange={handleChange} /><br />
                    <input type="text" className='input' value={user.street} name="street" placeholder="street" onChange={handleChange} /><br />
                    <input type="text" className='input' value={user.suite} name="suite" placeholder="suite" onChange={handleChange} /><br />
                    <input type="text" className='input' value={user.city} name="city" placeholder="city" onChange={handleChange} /><br />
                    <input type="text" className='input' value={user.zipcode} name="zipcode" placeholder="zipcode" onChange={handleChange} /><br />
                    <input type="text" className='input' value={user.lat} name="lat" placeholder="lat" onChange={handleChange} /><br />
                    <input type="text" className='input' value={user.lng} name="lng" placeholder="lng" onChange={handleChange} /><br />
                    <input type="text" className='input' value={user.phone} name="phone" placeholder="phone" onChange={handleChange} /><br />
                    <input type="text" className='input' value={user.company} name="company" placeholder="company's name" onChange={handleChange} /><br />
                    <input type="text" className='input' value={user.catchPhrase} name="catchPhrase" placeholder="catch phrase" onChange={handleChange} /><br />
                    <input type="address" className='input' value={user.bs} name="bs" placeholder="bs" onChange={handleChange} /><br />
                    {signUpError && <p className='error' style={{ color: "red" }}>{signUpError}</p>}
                    <button className="Connect" onClick={postUser}>Connect</button><br />
                    {/* Home Page */}
                </div>
            </>
        )
    }
}

export default UserDetails