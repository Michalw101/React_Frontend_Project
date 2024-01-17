import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from "../App.jsx"

const Album = ({ album }) => {
  const navigate = useNavigate();
  const user = useContext(UserContext);

  return (

    <div className='album'><h3>{album.id}</h3>
      <p>{album.title}</p>
      <a className='viewAlbum' onClick={() => navigate(`/home/users/${user.id}/albums/${album.id}/photos`, { state: album })}>view album</a>
    </div>
  )
}

export default Album;