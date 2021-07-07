import React from "react";
import { StyleSheet, Text, View } from "react-native";

import { ThemeContext } from "../../theme/ThemeManager";
import { theme } from "../../theme/variables";

export default function BarTapBottomSheet({ height, style, children }) {
  const { theme } = React.useContext(ThemeContext);

  const styles = StyleSheet.create({
    sheet: {
      width: "100%",
      backgroundColor: theme.BACKGROUND_SLIDE_SHEET,
      alignItems: "center",
      flexDirection: "column",
      paddingHorizontal: 20,
    },
    line: {
      marginTop: 10,
      height: 2,
      width: 50,
      borderRadius: 100,
      backgroundColor: theme.LINE_PRIMARY,
    },
    content: {
      flex: 1,
      height: "100%",
      width: "100%",
      marginHorizontal: 50,
      margin: 20,
    },
  });
  
  return (
    <View style={[styles.sheet, { height: height }, style]}>
      <View style={styles.line}></View>
      <View style={styles.content}>
        {children}
      </View>
    </View>
  );
}


