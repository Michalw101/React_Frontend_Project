import React, { useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { UserContext } from "../App.jsx"
// M 
const Album = ({ album, setAlbums, albums }) => {

  const user = useContext(UserContext);
  return (

    <div><h3>{album.id}</h3>
      <p>{album.title}</p>
      <Link key={album.id} to={`/home/users/${user.id}/albums/${album.id}/photos`}>view album</Link>
      {/* <Popup trigger={} position="bottom center" width = "100%"> */}
        {/* <div>Popup content here !!</div> */}
        {/* <Outlet /> */}
      {/* </Popup> */}
    </div>

  )
}

export default Album