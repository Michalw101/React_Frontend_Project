import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from "../App.jsx"
import "../css/photos.css"

const Photo = ({ photo, setPhotos, photos }) => {

    const user = useContext(UserContext);
    const navigate = useNavigate();

    const [copyPhoto, setCopyPhoto] = useState({ ...photo });
    const [editState, setEditState] = useState(false);

    function handleChange(e) {
        const { name, value } = e.target;

        setCopyPhoto((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    function handleSubmit() {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(photo)
        };
        fetch(`http://localhost:3000/photos/${photo.id}`, requestOptions)
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

    function editClicked() {
        setEditState((prev) => !prev);
        navigate(`/home/users/${user.id}/albums/${photo.albumId}/photos/${photo.id}`);
    }


    function deleteClicked() {
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(copyPhoto)
        };

        fetch(`http://localhost:3000/photos/${copyPhoto.id}`, requestOptions)
            .then(() => {
                setPhotos(photos.filter(currentPhotos => currentPhotos.id !== photo.id));
            })
            .catch((error) => {
                console.error('There was an error!', error);
            });
    }

    function resetEdit() {
        setCopyPhoto(photo);
        setEditState(false);
        navigate(`/home/users/${user.id}/albums/${photo.albumId}/photos`);
    }

    return (
        <div className='photo'>
            <p>{photo.id}.<input
                className='photoInput'
                name="title"
                disabled={!editState}
                value={copyPhoto.title}
                onChange={handleChange} />
                <label>photo url:
                    <input
                        className='photoInput'
                        name="url"
                        disabled={!editState}
                        value={copyPhoto.url}
                        onChange={handleChange} />
                </label></p>

            <img src={copyPhoto.thumbnailUrl} />

            {(!editState) && <button className='delete' onClick={editClicked}>Edit</button>}
            <button className='delete' onClick={deleteClicked}>Delete</button>

            {editState && <><button className='delete' onClick={handleSubmit}>Save photo</button>
                <button className='delete' onClick={resetEdit}>Reset edits</button></>}
        </div>
    )
}
export default Photo;