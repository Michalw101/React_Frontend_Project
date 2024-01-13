import React from 'react'
import { Link } from 'react-router-dom'

const Photo = ({ photo, setPhotos, photos }) => {
    return (
            <div>
                <p>{photo.title}</p>
                {photo.url}<br/>
                <img src={photo.thumbnailUrl}></img>
            </div>
    )
}
export default Photo;