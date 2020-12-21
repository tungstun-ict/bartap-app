import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { DrawerItem, DrawerItemList } from "@react-navigation/drawer";
import { SafeAreaView } from "react-native";
import { StatusBar } from "react-native";
import { colors, mock } from "../theme/variables";

export default function DrawerLayout({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <DrawerItem
        style={styles.drawerItem}
        label="Current session"
        onPress={() => {
          navigation.navigate("Session");
        }}
      />
      <DrawerItem
        style={styles.drawerItem}
        label="Customers"
        onPress={() => {
          navigation.navigate("Customers");
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight + 50,
    backgroundColor: colors.ELEMENT_BACKGROUND,
  },
  drawerItem: {
    color: colors.TEXT_PRIMARY,
    fontSize: 50,
  },
});
