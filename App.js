import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import CurrentSessionScreen from "./src/screen/CurrentSessionScreen";
import CustomersScreen from "./src/screen/CustomersScreen";
import AddCustomerScreen from "./src/screen/AddCustomerScreen";
import DrawerLayout from "./src/layout/DrawerLayout";
import { colors, mock } from "./src/theme/variables";
import { StyleSheet } from "react-native";
import CustomerOverviewScreen from "./src/screen/CustomerOverviewScreen";

const DrawerNavigator = createDrawerNavigator();
const CustomersNavigator = createStackNavigator();

export function CustomersStack() {
  return (
    <CustomersNavigator.Navigator
      headerMode="none"
      initialRouteName="Customers"
    >
      <CustomersNavigator.Screen name="Customers" component={CustomersScreen} />
      <CustomersNavigator.Screen
        name="Add new customer"
        component={AddCustomerScreen}
      />
      <CustomersNavigator.Screen name="Customer overview" component={CustomerOverviewScreen} />
    </CustomersNavigator.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <DrawerNavigator.Navigator
        sceneContainerStyle={{ backgroundColor: "black" }}
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
        <DrawerNavigator.Screen name="Session" component={CurrentSessionScreen} />
        <DrawerNavigator.Screen name="Customers" component={CustomersStack} />
      </DrawerNavigator.Navigator>
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
