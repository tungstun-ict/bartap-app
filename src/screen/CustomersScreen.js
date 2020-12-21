import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  Button,
} from "react-native";
import variables, { colors, mock } from "../theme/variables.js";
import HeaderLayout from "../layout/HeaderLayout";

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <HeaderLayout navigation={navigation}></HeaderLayout>
      <Text style={styles.text}>Customers screen</Text>
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
