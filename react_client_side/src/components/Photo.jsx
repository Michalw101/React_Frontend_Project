import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from "../App.jsx"
import "../css/photos.css"

const Photo = ({ photo, setPhotos, photos }) => {

    const user = useContext(UserContext);
    const navigate = useNavigate();
    const [editPhoto, setEditPhoto] = useState({ ...photo });
    const [editState, setEditState] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditPhoto((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    const handleSubmit = () => {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(editPhoto)
        };
        fetch(`http://localhost:3000/photos/${editPhoto.id}`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                setPhotos(photos.map(currentPhoto => photo.id == currentPhoto.id ? data : currentPhoto));
                setEditState((prev) => !prev);
            })
            .catch((error) => {
                console.error('There was an error!', error);
            });
        navigate(`/home/users/${user.id}/albums/${photo.albumId}/photos`);
    }

    const editClicked = () => {
        setEditState((prev) => !prev);
        navigate(`/home/users/${user.id}/albums/${photo.albumId}/photos/${photo.id}`);
    }


    const deleteClicked = () => {
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(editPhoto)
        };

        fetch(`http://localhost:3000/photos/${editPhoto.id}`, requestOptions)
            .then(() => {
                setPhotos(photos.filter(currentPhotos => currentPhotos.id !== photo.id));
            })
            .catch((error) => {
                console.error('There was an error!', error);
            });
    }

    const resetEdit = () => {
        setEditPhoto(photo);
        setEditState(false);
        navigate(`/home/users/${user.id}/albums/${photo.albumId}/photos`);
    }

    return (
        <div className='photo'>
            <p>{photo.id}.<input
                className='photoInput'
                name="title"
                disabled={!editState}
                value={editPhoto.title}
                onChange={handleChange} />
                <label>photo url:
                    <input
                        className='photoInput'
                        name="thumbnailUrl"
                        disabled={!editState}
                        value={editPhoto.thumbnailUrl}
                        onChange={handleChange} />
                </label></p>

            <img src={editPhoto.thumbnailUrl} />

            {(!editState) && <button className='delete' onClick={editClicked}>Edit</button>}
            <button className='delete' onClick={deleteClicked}>Delete</button>

            {editState && <><button className='delete' onClick={handleSubmit}>Save photo</button>
                <button className='delete' onClick={resetEdit}>Reset edits</button></>}
        </div>
    )
}
export default Photo;