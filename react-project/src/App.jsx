import { useState } from 'react'
import LogIn from '../components/LogIn'
import './App.css'
import SignUp from '../components/SignUp'


function App() {

  const [state, setState] = useState("signUp");
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className='body'>
      <div className="registration" >
          {state == "signUp" && <><SignUp/><a className="link" onClick={() => setState("logIn")}>Already have an account? Sign in</a><br /><br /></>}
          {state == "logIn" && <><LogIn userName={userName} setUserName={setUserName} password={password} setPassword={setPassword} /><a className="link" onClick={() => setState("signUp")}>Don't have an account? Create account</a><br /><br /></>}
      </div>
      {state == "homePage" && <HomePage/>}
    </div>
  )
}

export default App
