import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth";
import "./Header.css";
import { useSelector } from "react-redux";
const Header = () => {
  const dispatch = useDispatch();
  const premium = useSelector((state) => state.Premium.check);
  const deleteHandler = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("Token");
    dispatch(authActions.convert());
  };

  return (
    <header className="header">
      <NavLink to="/ExpenseForm" className="link">
        <h3>🏠Expense Calculator</h3>
      </NavLink>
      <NavLink to="/Profile" className="link1">
        <h3>👤User Profile</h3>
      </NavLink>
      {premium && (
        <NavLink to="/Premium" className="link1">
          <h3>Premium Subcription</h3>
        </NavLink>
      )}
      <button onClick={deleteHandler} className="button3">
        User Logout
      </button>
    </header>
  );
};

export default Header;
