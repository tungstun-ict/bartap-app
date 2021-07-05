import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { colors } from "../../theme/variables.js"

export default function BarTapButton({ onPress, text, colour, textColour, style }) {
  const buttonColor = colour ? { backgroundColor: colour, } : { backgroundColor: colors.BARTAP_WHITE }
  const textColor = textColour ? { color: textColour, } : { color: colors.BARTAP_BLACK }
  
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

const styles = StyleSheet.create({
    wrapper: {
        minWidth: "100%",
        borderRadius: 5,
        height: 50,
        backgroundColor: colors.BARTAP_WHITE,
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
        color: colors.BARTAP_BLACK,
      },
})
