import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from "../App.jsx"

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
            body: JSON.stringify(copyPhoto)
        };
        fetch(`http://localhost:3000/photos/${copyPhoto.id}`, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                let i, updatePhotos;
                photos.map((p, index) => {
                    if (p.id === data.id) {
                        i = index;
                    }
                    return p;
                });
                updatePhotos = [...photos];
                updatePhotos[i] = data;
                setPhotos(updatePhotos);
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
                let i, updatePhotos;
                photos.map((p, index) => {
                    if (p.id === copyPhoto.id) {
                        i = index;
                    }
                    return p;
                });
                updatePhotos = [...photos]
                updatePhotos.splice(i, 1);
                setPhotos(updatePhotos);
            })
            .catch((error) => {
                console.error('There was an error!', error);
            });
    }

    function resetEdit() {
        navigate(`/home/users/${user.id}/albums/${photo.albumId}/photos`);
        setEditState(false);
    }

    return (
        <div>
            <p>ID: {photo.id}</p>
            <label>photo title<input
                name="title"
                disabled={!editState}
                value={copyPhoto.title}
                onChange={handleChange} />
            </label>
            <label>photo url
                <input
                    name="url"
                    disabled={!editState}
                    value={copyPhoto.url}
                    onChange={handleChange} />
            </label>
            <label>
                <input
                    name="thumbnailUrl"
                    disabled={!editState}
                    value={copyPhoto.thumbnailUrl}
                    onChange={handleChange} />
            </label>
            <img src={photo.thumbnailUrl}></img>

            {(!editState) && <button onClick={editClicked}>Edit</button>}
            <button onClick={deleteClicked}>🚽</button>

            {editState && <><button onClick={handleSubmit}>Save photo</button>
                <button onClick={resetEdit}>Reset edits</button></>}
        </div>
    )
}
export default Photo;