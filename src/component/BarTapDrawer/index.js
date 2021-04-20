import React from "react";
import { StyleSheet } from "react-native";
import { DrawerItem } from "@react-navigation/drawer";
import { SafeAreaView } from "react-native";
import { StatusBar } from "react-native";
import { colors } from "../../theme/variables";

export default function BarTapDrawer({ navigation }) {
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
    backgroundColor: colors.BARTAP_DARK_GREY,
  },
});
