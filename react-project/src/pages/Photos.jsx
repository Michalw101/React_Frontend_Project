import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Photos = () => {
    const [photos, setPhotos] = useState([]);
    let { albumId } = useParams();
    albumId = parseInt(albumId, 10);
    useEffect(() => {
        fetch(`http://localhost:3000/photos?albumId=${albumId}`)
          .then(res => res.json())
          .then(data => {
            console.log(data);
            setPhotos(data);
          })
      }, [albumId]);

  return (
    <div>Photos</div>
  )
}

export default Photos;
