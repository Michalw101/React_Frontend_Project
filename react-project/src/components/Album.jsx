import React from 'react'

const Album = ({album , setAlbums, albums}) => {
  return (
    <div><h3>{album.id}</h3>
    <p>{album.title}</p>
    </div>
  )
}

export default Album