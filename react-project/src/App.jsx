import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { createContext, useState, useEffect } from 'react';
import LogIn from './pages/LogIn'
import SignUp from './pages/SignUp'
import HomePage from './pages/HomePage'
import UserDetails from './pages/UserDetails'
import Info from "./pages/Info"
import Todos from "./pages/Todos"
import Posts from "./pages/Posts"
import Albums from "./pages/Albums"
import Logout from "./pages/Logout"
import Comments from "./pages/Comments";
import Photos from "./pages/Photos";
import './App.css'

export const UserContext = createContext(null);

function App() {

  const [user, setUser] = useState(
    {
      id: "",
      name: "",
      username: "",
      email: "",
      address: {
        street: "",
        suite: "",
        city: "",
        zipcode: "",
        geo: {
          lat: "",
          lng: ""
        }
      },
      phone: "",
      website: "",
      company: {
        name: "",
        catchPhrase: "",
        bs: ""
      }
    }
  );

  useEffect(() => {
    if ( localStorage.getItem('currentUser') != null) {
      const currentUser = localStorage.getItem('currentUser');
      const userFromLocalStorage = JSON.parse(localStorage.getItem(currentUser));
      setUser(userFromLocalStorage);
    }
  }, [])

  return (
    <UserContext.Provider value={user}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LogIn setUser={setUser} />} />
          <Route path="/register" element={<SignUp setUser={setUser} />} />
          <Route path="/user-details" element={<UserDetails setUser={setUser} />} />
          <Route path="/home" element={<HomePage />}>
            <Route path="users/:userId/info" element={<Info />} />
            <Route path="users/:userId/todos" element={<Todos />} />
            <Route path="users/:userId/todos/:todoId" element={<Todos />} />
            <Route path="users/:userId/posts" element={<Posts />} />
            <Route path="users/:userId/posts/:postId" element={<Posts />}>
              <Route path="comments" element={<Comments />} />
              <Route path="comments/:commentId" element={<Comments />} />
            </Route>
            <Route path="users/:userId/albums" element={<Albums />} />
            <Route path="users/:userId/albums/:albumId" element={<Albums />} />
            <Route path="users/:userId/albums/:albumId/photos" element={<Photos />} />
            <Route path="users/:userId/albums/:albumId/photos/:photoId" element={<Photos />} />
            <Route path="logout" element={<Logout setUser={setUser} />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  )
}

export default App
