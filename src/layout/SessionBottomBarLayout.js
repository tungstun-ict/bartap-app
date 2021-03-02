import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { DrawerItem, DrawerItemList } from "@react-navigation/drawer";
import { SafeAreaView } from "react-native";
import { StatusBar } from "react-native";
import * as api from "../service/BarApiService.js";
import { colors, data, mock } from "../theme/variables";
import { Alert } from "react-native";

export default function BottomBarLayout({ sessionId }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.button__text}>1</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button}>
        <Image
          style={styles.button__image}
          source={require("../assets/stats.png")}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleLockSession(sessionId)}
      >
        <Image
          style={styles.button__image}
          source={require("../assets/close.png")}
        />
      </TouchableOpacity>
    </View>
  );
}

function handleLockSession(sessionId2) {
  Alert.alert(
    'Are you sure?',
    'You are about to lock this session. This process is not reversable',
    [
      {
        text: 'Yes',
        onPress: () => api.lockSession(sessionId2),
      },
      {
        text: 'No',
        onPress: () => console.log('User canceled locking this session'),
        style: 'cancel'
      },
    ],
    { cancelable: false }
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 100,
    backgroundColor: colors.ELEMENT_BACKGROUND,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },

  button: {
    marginHorizontal: 20,
    flex: 1,
    height: 70,
    width: 70,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.ELEMENT_BACKGROUND_LIGHT,
  },
  button__image: {
    height: 40,
    width: 40,
  },
  button__text: {
    color: colors.TEXT_SECONDARY,
  },
});
