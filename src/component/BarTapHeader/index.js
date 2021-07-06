import React from "react";
import { StatusBar } from "react-native";
import { StyleSheet, Text, View, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { mock } from "../../theme/variables.js";
import Constants from 'expo-constants';
import { ThemeContext } from "../../theme/ThemeManager.js";

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
      backgroundColor: theme.BARTAP_DARK_GREY,
    },
  
    header__title: {
      color: theme.BARTAP_WHITE,
      fontWeight: "bold",
      fontSize: 20,
    },
  
    header__menuIcon: {
      marginLeft: 20,
      width: 25,
      height: 20,
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
            source={require("../../assets/menu/menu-icon.png")}
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
