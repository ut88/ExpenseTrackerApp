import Login from './Components/Login';
import './App.css';
import Welcome from './Components/Welcome';
import { useEffect, useState } from 'react';
function App() {
  const[log,setLog]=useState(false)
  useEffect(()=>{
    if(localStorage.getItem("email")!==null){
      setLog(true)
    }else{
      setLog(false)
    }
  })
  return (
    <>
     {!log &&<Login />}
     {log && <Welcome />}
    </>
  );
}

export default App;
