import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router"
import LogIn from '../components/LogIn'
import SignUp from '../components/SignUp'
import './App.css'


function App() {

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  return (

    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} /> 
        
      </Routes>
      <Link to="/login" >Already have an account? Sign in</Link>
      <Link to="/register" >Dont have an account? Sign up</Link>
    </BrowserRouter>

  )
}

export default App
