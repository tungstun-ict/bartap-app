import React from "react";
import { SafeAreaView } from "react-native";
import { StyleSheet, Text, View, Image } from "react-native";
import variables, { colors, mock } from "../theme/variables.js";
import { Button } from "react-native";
import HeaderLayout from "../layout/HeaderLayout";

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <HeaderLayout navigation={navigation}></HeaderLayout>
      <Text style={styles.text}>Sessions screen</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: colors.BACKGROUND,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  text: {
    color: colors.TEXT_PRIMARY,
  },
});