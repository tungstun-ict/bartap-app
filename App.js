import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import HomeScreen from "./src/screen/HomeScreen";
import CustomersScreen from "./src/screen/CustomersScreen";
import DrawerLayout from "./src/layout/DrawerLayout";
import { colors, mock } from "./src/theme/variables";
import { StyleSheet } from "react-native";

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Session"
        drawerStyle={styles.drawer}
        drawerContentOptions={{
          activeTintColor: colors.TEXT_PRIMARY,
          activeBackgroundColor: colors.ELEMENT_BACKGROUND_SELECTED,
          inactiveTintColor: colors.TEXT_PRIMARY,
          labelStyle: {
            fontSize: 30,
            fontWeight: "bold",
          },
        }}
      >
        <Drawer.Screen name="Session" component={HomeScreen} />
        <Drawer.Screen name="Customers" component={CustomersScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  drawer: {
    backgroundColor: colors.ELEMENT_BACKGROUND,
    width: 240,
  },
  drawerItem: {},
});
