import { BrowserRouter, Routes, Route } from "react-router-dom"
import { createContext, useState } from 'react';
import LogIn from './components/LogIn'
import SignUp from './components/SignUp'
import HomePage from './components/HomePage'
import UserDetails from './components/UserDetails'
import Info from "./components/Info"
import Todos from "./components/Todos"
import Posts from "./components/Posts"
import Albums from "./components/Albums"
import Logout from "./components/Logout"

export const UserContext = createContext(null);

function App() {

  const [user, setUser] = useState({
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
  });

  return (
    <BrowserRouter basename="/">
      <UserContext.Provider value={{ user, setUser }}>
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/userdetails" element={<UserDetails />} />
        <Route path="/home" element={<HomePage />}>
          <Route path="info" element={<Info />} />
          {/* <Route path="info/:id" element={<Info />} /> */}
          <Route path="todos" element={<Todos />} />
          <Route path="posts" element={<Posts />} />
          <Route path="albums" element={<Albums />} />
          <Route path="logout" element={<Logout />} />
        </Route>
      </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  )
}

export default App
