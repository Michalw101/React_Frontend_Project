import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from "../App.jsx"
import '../App.css';

const Logout = ({setUser}) => {
  const  user = useContext(UserContext);
  const navigate = useNavigate();
  const [confirmLogout, setConfirmLogout] = useState(false);

  useEffect(() => {
    if (confirmLogout) {
      localStorage.setItem("currentUser", null);
      localStorage.removeItem(user.id);

      setUser({
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
      })
      navigate('/login');
    }
  }, [confirmLogout, navigate]);

  return (
    <div className='logout'>
      {!confirmLogout ? (
        <div>
          <p>Are you sure you want to log out?</p>
          <button className='btnConfirm' onClick={() => setConfirmLogout(true)}>Yes</button>
          <button className='btnCancel' onClick={() => navigate('/home')}>Cancel</button>
        </div>
      ) : (
        <div>
          <p>Logging out...</p>
        </div>
      )}
    </div>
  );
};

export default Logout;
