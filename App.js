import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import HomeScreen from "./src/screen/HomeScreen";
import CustomersScreen from "./src/screen/CustomersScreen";
import HeaderLayout from "./src/layout/HeaderLayout";

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Session">
        <Drawer.Screen name="Session" component={HomeScreen} />
        <Drawer.Screen name="Customers" component={CustomersScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
