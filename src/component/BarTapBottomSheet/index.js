import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { darkTheme } from "../../theme/variables";

export default function BarTapBottomSheet({ height, style, children }) {
  return (
    <View style={[styles.sheet, { height: height }, style]}>
      <View style={styles.line}></View>
      <View style={styles.content}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sheet: {
    width: "100%",
    backgroundColor: darkTheme.BARTAP_GREY,
    alignItems: "center",
    flexDirection: "column",
    paddingHorizontal: 20,
  },
  line: {
    marginTop: 10,
    height: 2,
    width: 50,
    borderRadius: 100,
    backgroundColor: darkTheme.BARTAP_WHITE,
  },
  content: {
    flex: 1,
    height: "100%",
    width: "100%",
    marginHorizontal: 50,
    margin: 20,
  },
});
