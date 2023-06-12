import logo from "../images/logo.svg";
import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import NavBar from "./NavBar";
import ProtectedRouteElement from "./ProtectedRoute";

function Header(props) {
  return (
    <header className="header">
      <img
        className="header__logo"
        src={logo}
        alt="Логотип социальной сети Mesto"
      />
      <Routes>
      <Route path="/sign-in" 
      element={ <Link to="/sign-up" className="header__link"> 
      Регистрация </Link> } 
      />
      <Route path="/sign-up" 
        element={ <Link to="/sign-in" className="header__link"> 
        Войти </Link> } 
      />
      <Route path="/" 
      element={<NavBar
           emailUser={props.emailUser}
           isLoggedIn={props.isLoggedIn}
           />}
           />
      </Routes>
    </header>
  );
}
export default Header;
