import React, { useState } from 'react';

const UserDetails = () => {
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
        return (
            <>
                <div>
                    <h2 className="title">User Details</h2><br />
                    <input type="text" className='input' value={user.name} name="name" placeholder="name" onChange={handleChange} /><br />
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
                    <button className="Connect" onClick={handleFillData}>Connect</button><br />
                    {signUpError && <p className='error' style={{ color: "red" }}>{signUpError}</p>}
                </div>
            </>
        )
    }
}

export default UserDetails