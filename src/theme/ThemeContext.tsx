import React from "react";

interface IThemeContext {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

export const initialThemeState: IThemeContext = {
  theme: (typeof window !== "undefined" && window?.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light',
  toggleTheme: () => { }
}

const ThemeContext = React.createContext<IThemeContext>(initialThemeState);
export default ThemeContext;
