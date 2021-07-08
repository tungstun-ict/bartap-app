import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { ThemeContext } from "../../theme/ThemeManager.js";

export default function BarTapButton({ onPress, text, colour, textColour, style }) {
  const { theme } = React.useContext(ThemeContext);
  
  const buttonColor = colour ? { backgroundColor: colour, } : { backgroundColor: theme.BACKGROUND_BUTTON_PRIMARY }
  const textColor = textColour ? { color: textColour, } : { color: theme.TEXT_BUTTON_PRIMARY }
  
  const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        borderRadius: 5,
        maxHeight: 50,
        minHeight: 50,
        backgroundColor: theme.BACKGROUND_BUTTON_PRIMARY,
        alignItems: "center",
        justifyContent: "center",
      },
      button: {
        height: 50,
        width: "100%",
        marginVertical: 10,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
      },
      text: {
        fontSize: 15,
        fontWeight: "bold",
        color: theme.TEXT_BUTTON_PRIMARY,
      },
})

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.wrapper, buttonColor, style]}
    >
      <View style={styles.button}>
        <Text style={[styles.text, textColor]}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
}
