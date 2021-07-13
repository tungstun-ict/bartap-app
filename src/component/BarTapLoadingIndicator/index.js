import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

import { ThemeContext } from "../../theme/ThemeManager";

export default function BarTapLoadingIndicator({ style }) {
  const { theme } = React.useContext(ThemeContext);

  const styles = StyleSheet.create({
    container: {
        width: 75,
        height: 75,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.BACKGROUND_LOADING_INDICATOR,
    }
  })

  return (
    <View style={[styles.container, style]}>
      <ActivityIndicator size="large" color={theme.LOADING_INDICATOR} />
    </View>
  );
}
