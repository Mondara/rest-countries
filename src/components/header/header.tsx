import React from "react";
import { Outlet } from "react-router-dom";
import "./header.scss";

import { FaMoon } from "react-icons/fa";

const Header = () => {
  return (
    <>
      <div className="header">
        <h1 className="title">Where in the world?</h1>
        <div className="dark-mode-container">
          <button className="btn-dark-mode">
            <FaMoon className="dark-mode-icon" />
          </button>
          <p className="dark-mode-label">Dark Mode</p>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Header;
