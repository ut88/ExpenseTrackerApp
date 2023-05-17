import Login from './Components/Login';
import './App.css';
import Welcome from './Components/Welcome';
import { useState } from 'react';
// import { Routes,Route } from 'react-router-dom';
function App() {
  const[log,setLog]=useState(false)
  return (
    <>
      {!log && <Login  setLog={setLog}/>}
      {log &&<Welcome setLog={setLog}/>}
    </>
  );
}

export default App;
