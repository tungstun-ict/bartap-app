import { NavigationContainer } from "@react-navigation/native";
import React from "react";

const DrawerNavigator = createDrawerNavigator();

export default function CustomerPath() {
  return (
    <NavigationContainer>
      <DrawerNavigator
        overlayColor="transparent"
        drawerType="slide"
        drawerContent={(props) => <BarTapDrawer {...props} />}
      >
          <DrawerNavigator.Screen 
          name="Session"
          component={}
          options={{
            drawerIcon: () => (
              <DrawerIcon source={require("../../assets/session-icon.png")} />
            ),
          }}/>
      </DrawerNavigator>
    </NavigationContainer>
  );
}
