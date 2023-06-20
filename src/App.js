import Login from './Components/Login/Login';
import './App.css';
import Welcome from './Components/welcome/Welcome';
import ExpenseForm from './Components/ExpenseCalculator/ExpenseForm';
import { useSelector } from 'react-redux'
import Header from './Components/ExpenseCalculator/Header';
import { Fragment } from 'react';
import Premium from './Components/ExpenseCalculator/Premium';
import { Routes, Route } from 'react-router-dom';
function App() {

  const auth = useSelector(state => state.auth.isAuthenticated)
  return (
    <>
      {!auth && <Login />}
      {auth && (
        <Fragment>
          <Header />
          <Routes>
            <Route path="/Profile" element={<Welcome />}></Route>
            <Route path="/ExpenseForm" element={<ExpenseForm />}></Route>
            <Route path="/Premium" element={<Premium />}></Route>
            <Route path="*" element={<Welcome />}></Route>
          </Routes>
        </Fragment>
      )}
    </>
  );
}

export default App;
