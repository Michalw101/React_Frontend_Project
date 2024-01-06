import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import LogIn from '../components/LogIn'
import SignUp from '../components/SignUp'
import HomePage from '../components/HomePage'
import UserDetails from '../components/UserDetails'
import './App.css'


function App() {

  return (
    <BrowserRouter basename="/">
        <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/userdetails" element={<UserDetails />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App
