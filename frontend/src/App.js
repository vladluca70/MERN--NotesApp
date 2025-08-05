import { useState } from 'react';
import './App.css';
import WelcomePage from './WelcomePage';
import AuthPage from './AuthPage';

function App() {
    const [username, setUsername]=useState('')

    if(username)
    {
      <WelcomePage username={username}/>
    }
    else
    {
      <AuthPage/>
    }
}

export default App;
