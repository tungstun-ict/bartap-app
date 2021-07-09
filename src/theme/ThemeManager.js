import React from "react";
import { Appearance } from 'react-native';
import { StatusBar } from "expo-status-bar";
import { darkTheme, lightTheme } from "./variables";

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
      <StatusBar style="light" backgroundColor={theme.STATUSBAR_BACKGROUND}/>
    </ThemeContext.Provider>
  );
};
