import React, { useEffect, useContext, useState } from 'react';
import { UserContext } from "../App.jsx"
import Album from '../components/Album.jsx';
import '../App.css'

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
  }, [user.id]);


  if (!albums) {
    return <img src="/images/load.gif" alt="Loading..." />;
  }

  if (albums.length === 0) {
    returnMassege = <h1>No albums found.</h1>
  }

  const handleSearchChange = (event) => {
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
    <>
      <h1>Albums</h1>
      {returnMassege}
      <div>
        <label htmlFor="search">Search:</label>
        <input
          type="text"
          id="search"
          value={searchBy}
          onChange={handleSearchChange}
        />
      </div>

      {addAlbum ? (
        <div>
          <input
            type="text"
            value={newAlbum.title}
            onChange={(e) => setNewAlbum({ ...newAlbum, title: e.target.value })}
            placeholder="Album title"
          />
          <button onClick={addAlbumClicked}>Add Album</button>
          <button onClick={cancelAddAlbum}>Cancel</button>
        </div>
      ) : (
        <button onClick={() => setAddAlbum((prev) => !prev)}>➕</button>
      )}

      <ul>
        {sortedAndFilteredAlbums().map((album) => (
          <Album key={album.id} album={album} setAlbums={setAlbums} albums={albums} />
       ))}
      </ul>
    </>)
}

export default Albums