import React, { useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import { FaMoon } from "react-icons/fa";

import ThemeContext from "../../theme/ThemeContext";
import "./Header.scss";


export const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <>
      <div className="header">
        <Link to="/" className="title-link">
          <h1 className="title">Where in the world?</h1>
        </Link>
        <div className="dark-mode-container" onClick={toggleTheme}>
          <button className="btn-dark-mode">
            <FaMoon className="dark-mode-icon" />
            <p className="dark-mode-label">Dark Mode</p>
          </button>
        </div>
      </div>
      <Outlet />
    </>
  );
};
