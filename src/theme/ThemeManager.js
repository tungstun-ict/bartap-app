import { StatusBar } from "expo-status-bar";
import React from "react";
import { Appearance, useColorScheme } from "react-native-appearance";

import { darkTheme, lightTheme } from "./variables";

export const ThemeContext = React.createContext();

export const ThemeProvider = ({ children }) => {
  const osColorScheme = useColorScheme();
  const [theme, setTheme] = React.useState(
    osColorScheme === "dark" ? darkTheme : lightTheme,
  );

  let subscription = Appearance.addChangeListener(({ colorScheme }) => {
    if (colorScheme === "dark") {
      setTheme(darkTheme);
    } else {
      setTheme(lightTheme);
    }
  });

  subscription.remove();


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
      {theme.mode === "light" ? (
        <StatusBar
          style={"dark"}
          backgroundColor={theme.STATUSBAR_BACKGROUND}
        />
      ) : (
        <StatusBar
          style={"light"}
          backgroundColor={theme.STATUSBAR_BACKGROUND}
        />
      )}
    </ThemeContext.Provider>
  );
};
