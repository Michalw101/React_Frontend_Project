import React, { useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { UserContext } from "../App.jsx"

const Album = ({ album }) => {

  const user = useContext(UserContext);
  return (

    <div className='album'><h3>{album.id}</h3>
      <p>{album.title}</p>
      <Link
        to={{
          pathname: `/home/users/${user.id}/albums/${album.id}/photos`,
          state: { album }
        }}
      >
        view album
      </Link>
    </div>

  )
}

export default Album