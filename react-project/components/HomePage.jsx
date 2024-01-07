import React, { useState } from 'react'
import {  Link, Outlet } from 'react-router-dom';
import '../src/HomePage.css'

const HomePage = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const user =  JSON.parse(localStorage.getItem(currentUser));
  return (
    <div>
      <nav>
        <Link to="info" >Info</Link>
        <Link to="todos">Todos</Link>
        <Link to="posts">Posts</Link>
        <Link to="albums">Albums</Link>
        <Link to="logout">Logout</Link>
      </nav>
      <p className='title'>Welcome to  {user.name}</p>
      <Outlet />
      

    </div>
  )
}

export default HomePage