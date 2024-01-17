import React, { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom"
import { UserContext } from "../App"

const UserDetails = ({ setUser }) => {
  const navigate = useNavigate();
  const user = useContext(UserContext);
  const [signUpError, setSignUpError] = useState('');
  const handleChange = (e) => {

    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value
    }));
  }

  const addressChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      "address": {
        ...prevUser["address"],
        [name]: value
      }
    }));
  }

  const geoChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      "address": {
        ...prevUser["address"],
        "geo": {
          ...prevUser["address"]["geo"],
          [name]: value
        }
      }
    }));
  };


  const companyChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      "company": {
        ...prevUser["company"],
        [name]: value
      }
    }));
  }

  const postUser = () => {

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    };
    fetch(`http://localhost:3000/users`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setUser(data);
        const userWithoutWebsite = { ...data };
        delete userWithoutWebsite.website;
        localStorage.setItem("currentUser", data.id);
        localStorage.setItem(data.id, JSON.stringify(userWithoutWebsite));
        navigate('/home');
      })
      .catch((error) => {
        setSignUpError(error.toString());
        console.error('There was an error!', error);
      });

  };

  return (
    <div className='registration'>
      <h2 className="title">User Details</h2><br />
      <input type="text" className='input' value={user.name} name="name" placeholder="name" onChange={handleChange} /><br />
      <input type="text" className='input' value={user.email} name="email" placeholder="email" onChange={handleChange} /><br />
      <input type="text" className='input' value={user.address.street} name="street" placeholder="street" onChange={addressChange} /><br />
      <input type="text" className='input' value={user.address.suite} name="suite" placeholder="suite" onChange={addressChange} /><br />
      <input type="text" className='input' value={user.address.city} name="city" placeholder="city" onChange={addressChange} /><br />
      <input type="text" className='input' value={user.address.zipcode} name="zipcode" placeholder="zipcode" onChange={addressChange} /><br />
      <input type="text" className='input' value={user.address.geo.lat} name="lat" placeholder="lat" onChange={geoChange} /><br />
      <input type="text" className='input' value={user.address.geo.lng} name="lng" placeholder="lng" onChange={geoChange} /><br />
      <input type="text" className='input' value={user.phone} name="phone" placeholder="phone" onChange={handleChange} /><br />
      <input type="text" className='input' value={user.company.name} name="name" placeholder="company's name" onChange={companyChange} /><br />
      <input type="text" className='input' value={user.company.catchPhrase} name="catchPhrase" placeholder="catch phrase" onChange={companyChange} /><br />
      <input type="text" className='input' value={user.company.bs} name="bs" placeholder="bs" onChange={companyChange} /><br />
      {signUpError && <p className='error' style={{ color: "red" }}>{signUpError}</p>}
      <button className="Connect" onClick={postUser}>Connect</button><br />
    </div>
  )
}

export default UserDetails;