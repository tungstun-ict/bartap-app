import React from "react";
import { SafeAreaView } from "react-native";
import { StyleSheet, Text, View, Image } from "react-native";
import variables, { colors, mock } from "../theme/variables.js";
import { Button } from "react-native";
import HeaderLayout from "../layout/HeaderLayout";

export default function LoginScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <HeaderLayout navigation={navigation}></HeaderLayout>
      <View style={styles.content}>
        <Text style={styles.text}>Login screen</Text>
      </View>
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
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: colors.TEXT_PRIMARY,
    fontSize: 50,
  },
});
