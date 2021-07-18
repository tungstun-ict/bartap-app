import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";

import BarTapDrawer, { DrawerIcon } from "../../component/BarTapDrawer";
import CustomerNoBarsScreen from "../customer/bar/CustomerNoBarsScreen";
import CustomerCurrentSessionScreen from "../customer/session/CustomerCurrentSessionScreen";
import CurrentBillScreen from "../employee/session/CurrentBillScreen";

const DrawerNavigator = createDrawerNavigator();

export default function CustomerPath() {
  return (
    <NavigationContainer>
      <DrawerNavigator.Navigator
        overlayColor="transparent"
        drawerType="slide"
        drawerContent={(props) => <BarTapDrawer {...props} />}
      >
        <DrawerNavigator.Screen
          name="Current"
          component={CustomerCurrentSessionScreen}
          options={{
            drawerIcon: () => (
              <DrawerIcon source={require("../../assets/session-icon.png")} />
            ),
          }}
        />
        <DrawerNavigator.Screen
          name="No bars"
          component={CustomerNoBarsScreen}
          options={{
            drawerIcon: () => (
              <DrawerIcon source={require("../../assets/session-icon.png")} />
            ),
          }}
        />
      </DrawerNavigator.Navigator>
    </NavigationContainer>
  );
}
