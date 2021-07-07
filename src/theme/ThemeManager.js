import React from "react";
import { Appearance } from 'react-native';
import { lightTheme, darkTheme } from "./variables";

export const ThemeContext = React.createContext();

export const ThemeProvider = ({ children }) => {
  const osColorScheme = Appearance.getColorScheme();
  const [theme, setTheme] = React.useState(osColorScheme === 'dark' ? darkTheme : lightTheme);

  Appearance.addChangeListener(({ newTheme }) => {
    console.log(newTheme)
    setTheme(newTheme === 'dark' ? (darkTheme) : (lightTheme))
  });

  const toggleTheme = () => {
    if (theme.mode === "light") {
      setTheme(darkTheme);
    } else {
      setTheme(lightTheme);
    }
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
