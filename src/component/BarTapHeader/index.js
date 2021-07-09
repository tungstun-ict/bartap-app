import Constants from 'expo-constants';
import React from "react";
import { StatusBar } from "react-native";
import { Image, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import { ThemeContext } from "../../theme/ThemeManager.js";
import { mock } from "../../theme/variables.js";

export default function BarTapHeader({ navigation }) {
  const { theme } = React.useContext(ThemeContext);

  const openDrawer = () => {
    navigation.openDrawer();
  };

  const styles = StyleSheet.create({
    header: {
      marginTop: StatusBar.currentHeight,
      flexDirection: "row",
      justifyContent: "center",
      flex: 1,
      maxHeight: 50,
      alignSelf: "flex-start",
      alignItems: "center",
      width: "100%",
      backgroundColor: theme.BACKGROUND_SECONDARY,
    },
  
    header__title: {
      color: theme.TEXT_SECONDARY,
      fontSize: 20,
      fontFamily: theme.FONT_MEDIUM,
    },
  
    header__menuIcon: {
      marginLeft: 20,
      width: 25,
      height: 20,
      tintColor: theme.BACKGROUND_IMAGE_LIGHT,
    },
  
    header__left: {
      flex: 1,
      maxWidth: 75,
      justifyContent: "center",
    },
  
    header__center: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    header__button: {
      width: "100%",
      height: "100%",
      justifyContent: "center",
    },
    header__right: {
      maxWidth: 75,
      flex: 1,
      justifyContent: "center",
    },
  });

  return (
    <View style={styles.header}>
      <View style={styles.header__left}>
        <TouchableOpacity onPress={openDrawer}
          style={styles.header__button}>
          <Image
            style={styles.header__menuIcon}
            source={require("../../assets/menu-icon.png")}
          ></Image>
        </TouchableOpacity>
      </View>
      <View style={styles.header__center}>
        <Text style={styles.header__title} numberOfLines={1}>{mock.ORGANISATION_NAME + " v" + Constants.manifest.version}</Text>
      </View>
      <View style={styles.header__right}></View>
    </View>
  );
}
