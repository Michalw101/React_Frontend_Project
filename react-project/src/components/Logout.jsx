import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const Logout = () => {
  const navigate = useNavigate();
  const [confirmLogout, setConfirmLogout] = useState(false);

  useEffect(() => {
    if (confirmLogout) {
      localStorage.clear();
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
