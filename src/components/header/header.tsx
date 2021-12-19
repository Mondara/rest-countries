import React, { useContext } from "react";
import { Outlet, Link } from "react-router-dom";
import { FaMoon } from "react-icons/fa";

import ThemeContext from "../../theme/ThemeContext";
import "./header.scss";


const Header = () => {
  const { theme, setTheme } = useContext(ThemeContext)

  const handleThemeChange = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }

  }


  return (
    <>
      <div className="header">
        <Link to="/" className="title-link">
          <h1 className="title">Where in the world?</h1>
        </Link>
        <div className="dark-mode-container" onClick={handleThemeChange}>
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

export default Header;
