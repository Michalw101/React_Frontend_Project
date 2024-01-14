import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import Photo from '../components/Photo';
import { UserContext } from "../App.jsx"


const Photos = () => {
  const user = useContext(UserContext);
  const [photos, setPhotos] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [photosPerPage] = useState(5);
  const [visiblePhotos, setVisiblePhotos] = useState([]);
  const [addPhoto, setAddPhoto] = useState(false);
  const [newPhoto, setNewPhoto] = useState({ title: '', url: '', thumbnailUrl: '' });

  let { albumId } = useParams();
  albumId = parseInt(albumId, 10);
  let returnMassege = "";

  useEffect(() => {
    fetch(`http://localhost:3000/photos?albumId=${albumId}`)
      .then(res => res.json())
      .then(data => {
        setPhotos(data);
        updateVisiblePhotos();
      });
  }, [albumId]);

  if (!photos) {
    return <h1>Loading...</h1>
  }

  if (photos.length === 0) {
    returnMassege = <h1>No photos found.</h1>
  }


  const updateVisiblePhotos = () => {
    const endIndex = startIndex + photosPerPage;
    const slicedPhotos = photos.slice(startIndex, endIndex);
    setVisiblePhotos(slicedPhotos);
  };

  useEffect(() => {
    updateVisiblePhotos();
  }, [startIndex, photos]);

  const handleNext = () => {
    setStartIndex(startIndex + photosPerPage);
    updateVisiblePhotos();
  };

  const handlePrev = () => {
    setStartIndex(Math.max(startIndex - photosPerPage, 0));
    updateVisiblePhotos();
  };


  const addPhotoClicked = () => {

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...newPhoto, albumId: albumId })
    };

    fetch('http://localhost:3000/photos', requestOptions)
      .then(response => response.json())
      .then(data => {
        setPhotos([...photos, data]);
        setAddPhoto(false);
        setNewPhoto({ title: '', url: '', thumbnailUrl: '' });
      })
      .catch(error => console.error('There was an error!', error));
  };

  const cancelAddPhoto = () => {
    setAddPhoto(false);
    setNewPhoto({ title: '', url: '', thumbnailUrl: '' });
  };

  return (

    <div className='photos'>
      <h1>Photos</h1>
      {returnMassege}
      <Link className="link" to={`/home/users/${user.id}/albums/${albumId}`}>Return to albums</Link>

      <div id='allPhotos'>
        {visiblePhotos.map((photo) => (
          <Photo key={photo.id} photo={photo} setPhotos={setPhotos} photos={photos} />
        ))}
        {addPhoto ? (
          <div className='photo'>
            <input
              className='photoInput'
              type="text"
              value={newPhoto.title}
              onChange={(e) => setNewPhoto({ ...newPhoto, title: e.target.value })}
              placeholder="Photo title"
            />
            <input
              className='photoInput'
              type="text"
              value={newPhoto.url}
              onChange={(e) => setNewPhoto({ ...newPhoto, url: e.target.value })}
              placeholder="Photo url"
            />
            <input
              className='photoInput'
              type="text"
              value={newPhoto.thumbnailUrl}
              onChange={(e) => setNewPhoto({ ...newPhoto, thumbnailUrl: e.target.value })}
              placeholder="Photo thumbnailUrl"
            />
            <button onClick={addPhotoClicked}>Add Photo</button>
            <button onClick={cancelAddPhoto}>Cancel</button>
          </div>
        ) : (
          <button id="plus" onClick={() => setAddPhoto((prev) => !prev)}>➕</button>
        )}
      </div>
      <br />
      <button onClick={handlePrev} disabled={startIndex === 0}>
        ⬅️
      </button>
      <button onClick={handleNext} disabled={startIndex + photosPerPage >= photos.length}>
        ➡️
      </button>

    </div>
  );
};

export default Photos;