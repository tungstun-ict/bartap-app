import React from "react";
import { SafeAreaView } from "react-native";
import { StyleSheet, Text, View, Image } from "react-native";
import { colors } from "../theme/variables.js";
import { Dimensions } from "react-native";

import { TouchableOpacity } from "react-native";

export default function SplashScreen({ route, navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Loading</Text>
      {/* <Image source={require("../assets/icon.png")}/> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: colors.BARTAP_BLACK,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: colors.BARTAP_GREY,
    fontSize: 50,
    fontWeight: "bold",
  },
});
