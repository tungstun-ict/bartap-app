import React from "react";
import { StatusBar } from "react-native";
import { Image, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import { ThemeContext } from "../../theme/ThemeManager.js";
import { theme } from "../../theme/variables.js";

export default function BarTapStackHeader({ navigation, title }) {
  const { theme } = React.useContext(ThemeContext);
  
  const navigateBack = () => {
    navigation.goBack();
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
      fontWeight: "bold",
      fontSize: 20,
    },
  
    header__menuIcon: {
      marginLeft: 20,
      width: 25,
      height: 20,
      tintColor: theme.BACKGROUND_IMAGE_LIGHT,
    },
    header__button: {
      width: 75,
      height: "100%",
      justifyContent: "center",
    },
  
    header__left: {
      flex: 0.5,
      justifyContent: "center",
    },
  
    header__center: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
  
    header__right: {
      flex: 0.5,
      justifyContent: "center",
    },
  });

  return (
    <View style={styles.header}>
      <View style={styles.header__left}>
        <TouchableOpacity 
        style={styles.header__button}
        onPress={navigateBack}>
          <Image
            style={styles.header__menuIcon}
            source={require("../../assets/back-icon.png")}
          ></Image>
        </TouchableOpacity>
      </View>
      <View style={styles.header__center}>
        <Text style={styles.header__title} numberOfLines={1}>{title}</Text>
      </View>
      <View style={styles.header__right}></View>
    </View>
  );
}
