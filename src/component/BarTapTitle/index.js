import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { ThemeContext } from "../../theme/ThemeManager";
import { darkTheme } from "../../theme/variables";

export default function BarTapTitle({ level, text, children }) {
  const { theme } = React.useContext(ThemeContext);

  const styles = StyleSheet.create({
    container: {
    height: "auto",
    width: "100%",
    flexDirection: "row",
    },
    title: {
      marginBottom: 10,
      alignItems: "center",
      color: theme.TEXT_PRIMARY,
      fontWeight: "bold",
    },
    right: {
      flex: 1,
      justifyContent: "center",
      alignItems: "flex-end"
    }
  });

  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.title,
          level === 1 && { fontSize: 30 },
          level === 2 && { fontSize: 20 },
        ]}
      >
        {text}
      </Text>
      <View style={styles.right}>
        {children}
      </View>
    </View>
  );
}
