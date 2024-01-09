import React, { useContext } from 'react'
import {  Link, Outlet } from 'react-router-dom';
import { UserContext } from "../App.jsx"
import '../HomePage.css'

const HomePage = () => {
  const { user } = useContext(UserContext);
  return user && (<div>
    <nav>
      <Link to="info" >Info</Link>
      <Link to="todos">Todos</Link>
      <Link to="posts">Posts</Link>
      <Link to="albums">Albums</Link>
      <Link to="logout">Logout</Link>
    </nav>
    <p className='title'>Welcome to  {user.name}</p>
    <Outlet />
  </div>) || <h1>Loading...</h1>
    
}

export default HomePage