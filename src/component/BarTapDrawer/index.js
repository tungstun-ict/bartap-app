import { DrawerContentScrollView, DrawerItem, DrawerItemList } from "@react-navigation/drawer";
import React from "react";
import { StatusBar, StyleSheet, Text, View } from "react-native";

import { ThemeContext } from "../../theme/ThemeManager";

export default function BarTapDrawer(props) {
  const { theme, toggleTheme } = React.useContext(ThemeContext);

  const styles = StyleSheet.create({
    container: {
      // marginTop: StatusBar.currentHeight + 50,
      backgroundColor: theme.BACKROUND_DRAWER,
      flex: 1,
    },
    drawerItem: {
      color: theme.TEXT_PRIMARY,
    },
    drawerItemLabel: {
      color: theme.TEXT_PRIMARY, 
      fontWeight: "bold"
    }
  });

  return (
    <View style={styles.container}>
      <DrawerContentScrollView>
        <DrawerItemList {...props} activeTintColor={theme.BRAND} labelStyle={styles.drawerItemLabel}>

        </DrawerItemList>
      </DrawerContentScrollView>
      <DrawerItem 
        labelStyle={styles.drawerItemLabel}
        style={styles.drawerItem} onPress={() => toggleTheme()} label={`Switch to ${theme.mode === "light" ? "dark" : "light"}`} />
      <DrawerItem  
        labelStyle={styles.drawerItemLabel}
        style={styles.drawerItem} label="Sign out"/>
    </View>
  );
}
