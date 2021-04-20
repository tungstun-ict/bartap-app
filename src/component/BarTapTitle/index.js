import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { colors } from "../../theme/variables";


export default function BarTapTitle({ level, text }) {
  return <Text style={[
    styles.title, level === 1 && {fontSize: 30}, level === 2 && {fontSize: 20} ]}>{text}</Text>;
}

const styles = StyleSheet.create({
  title: {
    marginVertical: 10,
    alignItems: 'center',
    color: colors.BARTAP_WHITE,
    fontWeight: "bold",
  },
});
