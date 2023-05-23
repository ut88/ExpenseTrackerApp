import Login from './Components/Login';
import './App.css';
import Welcome from './Components/Welcome';
import ExpenseForm from './Components/ExpenseForm';
import {useSelector} from 'react-redux'
import Header from './Components/Header';
import { Fragment } from 'react';
import Premium from './Components/Premium';
import { Routes,Route } from 'react-router-dom';
function App() {
  // const[log,setLog]=useState(false)
  const auth=useSelector(state=>state.auth.isAuthenticated)
  console.log(auth);
  // const[home,setHome]=useState(false);
  return (
    <>
      {!auth && <Login />}
      {auth && (
      <Fragment>
      <Header />
      <Routes>
        <Route path="/Profile" element={<Welcome/>}></Route>
        <Route path="/ExpenseForm" element={<ExpenseForm />}></Route>
        <Route path="/Premium" element={<Premium />}></Route>
        <Route path="*" element={<Welcome/>}></Route>
      </Routes>
      </Fragment>
      )}
    </>
  );
}

export default App;
