import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { ThemeContext } from "../../theme/ThemeManager";

export default function BarTapTitle({ level, text, children }) {
  const { theme } = React.useContext(ThemeContext);

  const styles = StyleSheet.create({
    container: {
      height: "auto",
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 10,
    },
    title: {
      alignItems: "center",
      color: theme.TEXT_PRIMARY,
      fontFamily: theme.FONT_MEDIUM,
    },
    right: {
      flex: 1,
      justifyContent: "center",
      alignItems: "flex-end",
    },
  });

  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.title,
          level === 1 && { fontSize: 30 },
          level === 2 && { fontSize: 23 },
        ]}
      >
        {text}
      </Text>
      <View style={styles.right}>{children}</View>
    </View>
  );
}
