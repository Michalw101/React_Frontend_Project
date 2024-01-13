// import React, { useState, useEffect } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import Photo from '../components/Photo';

// const Photos = () => {

//     const [photos, setPhotos] = useState([]);
//     let { albumId, userId } = useParams();
//     userId = parseInt(userId, 10);
//     albumId = parseInt(albumId, 10);

//     useEffect(() => {
//         fetch(`http://localhost:3000/photos?albumId=${albumId}`)
//           .then(res => res.json())
//           .then(data => {
//             setPhotos(data);
//           })
//       }, []);

//   return (
//     <div>Photos
//     <Link to={`/home/users/${userId}/albums/${albumId}`}>return to albums</Link >
//       {photos.map((photo) => (
//             <Photo key={photo.id} photo={photo} setPhotos={setPhotos} photos={photos} />
//           ))}
//     </div>

//   )
// }
// export default Photos;
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Photo from '../components/Photo';
let returnMassege = "";
const Photos = () => {
  const [photos, setPhotos] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [photosPerPage] = useState(5);
  const [visiblePhotos, setVisiblePhotos] = useState([]);
  let { albumId, userId } = useParams();
  userId = parseInt(userId, 10);
  albumId = parseInt(albumId, 10);

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
    updateVisiblePhotos(); // Call this when the component mounts to display the first 5 photos
  }, [startIndex, photos]);

  const handleNext = () => {
    setStartIndex(startIndex + photosPerPage);
    updateVisiblePhotos();
  };

  const handlePrev = () => {
    setStartIndex(Math.max(startIndex - photosPerPage, 0));
    updateVisiblePhotos();
  };

  return (
    
    <div>
      <h2>Photos</h2>
      {returnMassege}

      <Link to={`/home/users/${userId}/albums/${albumId}`}>Return to albums</Link>
      <br/>
      <button onClick={handlePrev} disabled={startIndex === 0}>
        ⬅️
      </button>
      <button onClick={handleNext} disabled={startIndex + photosPerPage >= photos.length}>
        ➡️
      </button>
      {visiblePhotos.map((photo) => (
        <Photo key={photo.id} photo={photo} setPhotos={setPhotos} photos={photos} />
      ))}

     
    </div>
  );
};

export default Photos;
