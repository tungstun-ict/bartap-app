import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { ThemeContext } from "../../theme/ThemeManager";
import { darkTheme } from "../../theme/variables";


export default function BarTapTitle({ level, text }) {
  const { theme } = React.useContext(ThemeContext);

  const styles = StyleSheet.create({
    title: {
      marginBottom: 10,
      alignItems: 'center',
      color: theme.TEXT_PRIMARY,
      fontWeight: "bold",
    },
  });
 
  return <Text style={[
    styles.title, level === 1 && {fontSize: 30}, level === 2 && {fontSize: 20} ]}>{text}</Text>;
}
