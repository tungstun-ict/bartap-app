import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import BarTapDrawer, { DrawerIcon } from "../../component/BarTapDrawer";
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
          name="Session"
          component={CurrentBillScreen}
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
