import React, { useEffect, useContext, useState } from 'react';
import { UserContext } from "../App.jsx"
import Album from '../components/Album.jsx';
import MyImage from '../images/Loading.gif';
import "../css/Album.css"

const Albums = () => {

  const user = useContext(UserContext);
  const [albums, setAlbums] = useState(null);
  const [searchBy, setSearchBy] = useState('');
  const [addAlbum, setAddAlbum] = useState(false);
  const [newAlbum, setNewAlbum] = useState({ title: '', id: '' });
  let filteredAlbums = albums;
  let returnMassege = "";

  useEffect(() => {
    fetch(`http://localhost:3000/albums/?userId=${user.id}`)
      .then(res => res.json())
      .then(data => {
        setAlbums(data);
      })
  }, []);

  if (!albums)
    return <img src={MyImage} />;


  if (albums.length === 0)
    returnMassege = <h1>No albums found.</h1>

  const handleSearchChange = (event)  =>{
    setSearchBy(event.target.value);
  };

  const sortedAndFilteredAlbums = () => {
    filteredAlbums = albums;

    if (searchBy) {
      filteredAlbums = albums.filter(post =>
        post.title.toLowerCase().includes(searchBy.toLowerCase()) ||
        post.id.toString().includes(searchBy)
      );
    }
    return filteredAlbums;
  };

  const addAlbumClicked = () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...newAlbum, userId: user.id })
    };

    fetch('http://localhost:3000/albums', requestOptions)
      .then(response => response.json())
      .then(data => {
        setAlbums([...albums, data]);
        setAddAlbum(false);
        setNewAlbum({ title: '', id: '' });
      })
      .catch(error => console.error('There was an error!', error));
  };

  const cancelAddAlbum = () => {
    setAddAlbum(false);
    setNewAlbum({ title: '', id: '' });
  };

  return (
    <div className='albums'>
      <h1>Albums</h1>
      {returnMassege}

      <div className='search'>
        <label htmlFor="search" >Search: </label>
        <input
          type="text"
          id="search"
          value={searchBy}
          onChange={handleSearchChange}
        />
      </div>
      {addAlbum ? (
        <div className='addAlbum'>
          <input className='albumInput'
            type="text"
            value={newAlbum.title}
            onChange={(e) => setNewAlbum({ ...newAlbum, title: e.target.value })}
            placeholder="Album title"
          /><br />
          <button className='btnAlbum btn' onClick={addAlbumClicked}>Add Album</button>
          <button className='btnAlbum btn' onClick={cancelAddAlbum}>Cancel</button>
        </div>
      ) : (
        <button id="plus" onClick={() => setAddAlbum((prev) => !prev)}>➕ Add Album</button>
      )}

      <div id="allAlbums">
        {sortedAndFilteredAlbums().map((album) => (
          <Album key={album.id} album={album} />
        ))}
      </div>
    </div>
  )
}

export default Albums;