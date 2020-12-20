import React from "react";
import { StatusBar } from "react-native";
import { StyleSheet, Text, View, Image } from "react-native";
import { Header } from "react-native-elements";
import { colors, mock } from "../theme/variables.js";

export default function HeaderLayout() {
  return (
    <View style={styles.header}>
      <View style={styles.header__left}>
        <Image
          style={styles.header__menuIcon}
          source={require("../assets/menu/menu-icon.png")}
        ></Image>
      </View>
      <View style={styles.header__center}>
        <Text style={styles.header__title}>{mock.ORGANISATION_NAME}</Text>
      </View>
      <View style={styles.header__right}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    marginTop: StatusBar.currentHeight,
    flexDirection: "row",
    justifyContent: "center",
    flex: 1,
    height: 50,
    alignSelf: "flex-start",
    alignItems: "center",
    width: "100%",
    backgroundColor: colors.ELEMENT_BACKGROUND,
  },

  header__title: {
    color: colors.TEXT_PRIMARY,
    fontWeight: "bold",
    fontSize: 20,
  },

  header__menuIcon: {
    marginLeft: 20,
    width: 25,
    height: 20,
  },

  header__left: {
    flex: 1,
    justifyContent: "center",
  },

  header__center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  header__right: {
    flex: 1,
    justifyContent: "center",
  },
});
