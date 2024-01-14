import React, { useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { UserContext } from "../App.jsx"
// M 
const Album = ({ album, setAlbums, albums }) => {

  const user = useContext(UserContext);
  return (

    <div className='album'><h3>{album.id}</h3>
      <p>{album.title}</p>
      <Link key={album.id} to={`/home/users/${user.id}/albums/${album.id}/photos`}>view album</Link>
    </div>

  )
}

export default Album