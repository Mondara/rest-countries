import React, { useState, useEffect } from "react";
import ThemeContext, { initialThemeState } from "./ThemeContext";


const ThemeProvider: React.FC = ({ children }) => {
  const [theme, setTheme] = useState(initialThemeState.theme);
  const toggleTheme = () => {
    if(theme === 'dark') {
      setTheme('light')
    } else {
      setTheme('dark');
    }
  }
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }} >
      <div className={`theme--${theme}`}>{children}</div>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;