import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import LogIn from '../components/LogIn'
import SignUp from '../components/SignUp'
import './App.css'


function App() {
  const [state, setState] = useState("login");

  return (
    <BrowserRouter>
    <div className='registration'>
      <Routes>     
        <Route path="/register" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} /> 
      </Routes>
      {state=="signup" &&  <Link className='link' to="/login" onClick={()=>setState("login")}>Already have an account? Sign in</Link>}  
      {state=="login" &&  <Link className='link' to="/register" onClick={()=>setState("signup")}>Dont have an account? Sign up</Link>}      
      
    </div>
    </BrowserRouter>

  )
}

export default App
