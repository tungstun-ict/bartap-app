import React from "react";
import { StyleSheet } from "react-native";
import { DrawerItem } from "@react-navigation/drawer";
import { SafeAreaView } from "react-native";
import { StatusBar } from "react-native";
import { ThemeContext } from "../../theme/ThemeManager";

export default function BarTapDrawer({ navigation }) {
  const { theme } = React.useContext(ThemeContext);

  const styles = StyleSheet.create({
    container: {
      marginTop: StatusBar.currentHeight + 50,
      backgroundColor: theme.BARTAP_DARK_GREY,
    },
  });

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
