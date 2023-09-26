import React, { useState } from "react";
import ThemeContext, { initialThemeState } from "./ThemeContext";


const ThemeProvider: React.FC = ({ children }) => {
  const [theme, setTheme] = useState(initialThemeState.theme);
  const toggleTheme = () => {
    if (theme === 'dark') {
      setTheme('light')
    } else {
      setTheme('dark');
    }
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }} >
      <div className={`theme theme--${theme}`}>{children}</div>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;