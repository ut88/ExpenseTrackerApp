import Login from './Components/Login';
import './App.css';
import Welcome from './Components/Welcome';
import { useState } from 'react';
function App() {
  const[log,setLog]=useState(false)
 
  return (
    <>
     {!log &&<Login  setLog={setLog}/>}
     {log && <Welcome />}
    </>
  );
}

export default App;
