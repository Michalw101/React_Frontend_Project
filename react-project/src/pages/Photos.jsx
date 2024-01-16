import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import Photo from '../components/Photo';
import { UserContext } from "../App.jsx"
import "../css/Photos.css"

const Photos = () => {
  const user = useContext(UserContext);
  const [photos, setPhotos] = useState([]);
  const [photosPerPage,setPhotosPerPage ]= useState(1);
  const [addPhoto, setAddPhoto] = useState(false);
  const [newPhoto, setNewPhoto] = useState({ title: '', url: '', thumbnailUrl: '' });

  let { albumId } = useParams();
  albumId = parseInt(albumId, 10);
  let returnMassege = "";

  useEffect(() => {
    funcGetPhotos();
  }, [albumId]);

  const funcGetPhotos =(()=>{
    fetch(`http://localhost:3000/photos?albumId=${albumId}&_page=${photosPerPage}&_limit=4`)
    .then(res => res.json())
    .then(data => {
      setPhotos([...photos , ...data]);
      setPhotosPerPage((prev)=>(prev+1));
    });
  })
  if (!photos) {
    return <h1>Loading...</h1>
  }

  if (photos.length === 0) {
    returnMassege = <h1>No photos found.</h1>
  }




  const addPhotoClicked = () => {

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...newPhoto, albumId: albumId })
    };

    fetch('http://localhost:3000/photos', requestOptions)
      .then(response => response.json())
      .then(data => {
        // setPhotos([...photos, data]);
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
      <h1>Photos of album number {albumId}</h1>
      {returnMassege}
      <Link className="return" to={`/home/users/${user.id}/albums/${albumId}`}>Return to albums</Link>

      {addPhoto ? (
        <div className='addPhoto'>
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
        <button id="plus" onClick={() => setAddPhoto((prev) => !prev)}>ג• Add Photo</button>
      )}
      <br />
      <button className="more" onClick={funcGetPhotos}>
        טען עוד
      </button>
      {/* <button className="more" onClick={handleNext} disabled={startIndex + photosPerPage >= photos.length}>
        ג¡ן¸
      </button> */}
      <div id='allPhotos'>
        {photos.map((photo) => (
          <Photo key={photo.id} photo={photo} setPhotos={setPhotos} photos={photos} />
        ))}

      </div>


    </div>
  );
};

export default Photos;