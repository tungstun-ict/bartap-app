import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { DrawerItem, DrawerItemList } from "@react-navigation/drawer";
import { SafeAreaView } from "react-native";
import { StatusBar } from "react-native";
import { colors, mock } from "../theme/variables";

export default function BottomBarLayout({ navigation }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button}><Text>1</Text></TouchableOpacity>
      <TouchableOpacity style={styles.button}><Text>2</Text></TouchableOpacity>
      <TouchableOpacity style={styles.button}><Text>3</Text></TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 100,
    backgroundColor: colors.ELEMENT_BACKGROUND,
    justifyContent: "center", 
    alignItems: "center",
    width: "100%",
  },

  button: {
    marginHorizontal: 20,
    flex: 1,
    height: 70,
    width: 70,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.ELEMENT_BACKGROUND_LIGHT,
  }
});
