import { useState } from 'react';
import './App.css';
import WelcomePage from './WelcomePage';
import AuthPage from './AuthPage';

function App() {
    const [username, setUsername]=useState('')

    function handleUsernameOnSuccesfulLogin(name){
      setUsername(name)
    }

    function handleLogout(){
      setUsername('')
    }

    if(username){
      return(
        <>
          <WelcomePage username={username} logout={handleLogout}/>
        </>
      )
    }
    else{
      return(
        <>
          <AuthPage succesfulLogin={handleUsernameOnSuccesfulLogin} />
        </>
      )
    }
}

export default App;
