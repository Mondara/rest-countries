import React, { useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import { FaMoon, FaSun } from "react-icons/fa";

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
        <div className="theme-toggle-container" onClick={toggleTheme}>
          <button className="btn-theme-toggle">
            {theme === "dark" ? <FaSun className="theme-toggle-icon" /> : <FaMoon className="theme-toggle-icon" />}
            <p className="theme-toggle-label">{theme === "dark" ? "Light Mode" : "Dark Mode"}</p>
          </button>
        </div>
      </div>
      <Outlet />
    </>
  );
};
