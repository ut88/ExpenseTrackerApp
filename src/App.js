import Login from './Components/Login';
import './App.css';
import Welcome from './Components/Welcome';
import { useState } from 'react';
import ExpenseForm from './Components/ExpenseForm';
// import { Routes,Route } from 'react-router-dom';
function App() {
  const[log,setLog]=useState(false)
  const[home,setHome]=useState(false);
  return (
    <>
      {(!log && !localStorage.getItem("email")) &&<Login  setLog={setLog}/>}
      {(log && localStorage.getItem("email") && !home) && <Welcome setLog={setLog} setHome={setHome} />}
      {(home||localStorage.getItem("home")) && <ExpenseForm />}
    </>
  );
}

export default App;
