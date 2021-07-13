import { DrawerContentScrollView, DrawerItem, DrawerItemList } from "@react-navigation/drawer";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import * as api from "../../service/BarApiService.js";
import * as storage from "../../service/BarStorageService.js";
import { AuthContext } from "../../service/Context.js";
import { ThemeContext } from "../../theme/ThemeManager";

export default function BarTapDrawer(props) {
  const { theme, toggleTheme } = React.useContext(ThemeContext);
  const { signOut } = React.useContext(AuthContext);

  const [bar, setBar] = React.useState({ name: "Bartap" });

  React.useEffect(() => {
    storage.getActiveBar().then((id) =>
      api
        .getBarById(id)
        .then((bar) => setBar(bar))
        .catch(() => {
          setBar({ name: "Bartap" });
        })
        .catch((error) => setBar({ name: "Bartap" })),
    );
  }, []);

  const styles = StyleSheet.create({
    container: {
      // marginTop: StatusBar.currentHeight + 50,
      backgroundColor: theme.BACKROUND_DRAWER,
      flex: 1,
    },
    drawerItem: {
      color: theme.TEXT_PRIMARY,
    },
    bottomDrawerItem: {},
    drawerItemLabel: {
      color: theme.TEXT_PRIMARY,
      fontFamily: theme.FONT_MEDIUM,
      fontSize: 20,
    },
    bottomDrawerItemLabel: {
      color: theme.TEXT_PRIMARY,
      fontFamily: theme.FONT_MEDIUM,
      fontSize: 5,
    },
    drawerHeader: {
      width: "100%",
      borderBottomWidth: 2,
      borderBottomColor: theme.LINE_LIGHTMODE,
      marginBottom: 10,
      justifyContent: "center",
      padding: 10,
      height: 46,
    },
    drawerHeader__title: {
      fontSize: 20,
      fontFamily: theme.FONT_MEDIUM,
      color: theme.TEXT_PRIMARY,
    },
    icon: {
      height: 40,
      width: 40,
      margin: 0,
      padding: 0,
      tintColor: theme.BACKGROUND_IMAGE,
    },
    bottomBar: {
      // borderColor: theme.LINE_LIGHTMODE,
      // borderTopWidth: 2,
      height: 100,
      flexDirection: "row",
      justifyContent: "center",
    },
    bottomBarButton: {
      height: 100,
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    bottomBarButtonImage: {
      width: 50,
      height: 50,
      tintColor: theme.BACKGROUND_IMAGE,
    },
  });

  return (
    <View style={styles.container}>
      <DrawerContentScrollView>
        <View style={styles.drawerHeader}>
          <Text style={styles.drawerHeader__title}>{bar.name}</Text>
        </View>
        <DrawerItemList
          {...props}
          activeTintColor={theme.BRAND}
          labelStyle={styles.drawerItemLabel}
        ></DrawerItemList>
      </DrawerContentScrollView>
      <View style={styles.bottomBar}>
        <TouchableOpacity
          onPress={() => {
            signOut();
          }}
          style={styles.bottomBarButton}
        >
          <Image
            source={require("../../assets/sign-out-icon.png")}
            style={styles.bottomBarButtonImage}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bottomBarButton}
          onPress={() => toggleTheme()}
        >
          {theme.mode === "light" ? (
            <Image
              source={require("../../assets/dark-mode-icon.png")}
              style={styles.bottomBarButtonImage}
            />
          ) : (
            <Image
              source={require("../../assets/light-mode-icon.png")}
              style={styles.bottomBarButtonImage}
            />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

export function DrawerIcon({ source }) {
  const { theme } = React.useContext(ThemeContext);
  return (
    <Image
      source={source}
      style={{ tintColor: theme.BACKGROUND_IMAGE, height: 40, width: 40 }}
    />
  );
}
