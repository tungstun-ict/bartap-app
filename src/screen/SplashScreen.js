import React from "react";
import { SafeAreaView } from "react-native";
import { StyleSheet, Text } from "react-native";
import { TouchableOpacity } from "react-native";

import { ThemeContext } from "../theme/ThemeManager.js";
import { darkTheme } from "../theme/variables.js";

export default function SplashScreen({ route, navigation }) {
  const { theme } = React.useContext(ThemeContext);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column",
      backgroundColor: darkTheme.BARTAP_BLACK,
      alignItems: "center",
      justifyContent: "center",
    },
    text: {
      color: darkTheme.BARTAP_GREY,
      fontSize: 50,
      fontFamily: theme.FONT_MEDIUM,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Loading</Text>
      {/* <Image source={require("../../assets/icon.png")}/> */}
    </SafeAreaView>
  );
}
