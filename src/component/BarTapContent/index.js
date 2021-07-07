import React from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";

import { ThemeContext } from "../../theme/ThemeManager";
import BarTapHeader from "../BarTapHeader";
import BarTapStackHeader from "../BarTapStackHeader";

export default function BarTapContent({ children, navigation, title, noHeader, padding = 10 }) {
  const { theme } = React.useContext(ThemeContext);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column",
      backgroundColor: theme.BACKGROUND_PRIMARY,
      alignItems: "center",
      justifyContent: "flex-start",
    },
    content: {
      flex: 1,
      width: "100%",
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "flex-start",
      padding: padding,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      {!noHeader && (title ? (<BarTapStackHeader navigation={navigation} title={title} />) : (<BarTapHeader navigation={navigation} />))}
      <View style={styles.content}>{children}</View>
    </SafeAreaView>
  );
};
