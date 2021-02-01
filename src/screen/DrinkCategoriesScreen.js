import React from "react";
import { SafeAreaView } from "react-native";
import { StyleSheet, Text, View, Image } from "react-native";
import variables, { colors, mock } from "../theme/variables.js";
import { Button } from "react-native";
import StackHeaderLayout from "../layout/StackHeaderLayout";
import BottomBarLayout from "../layout/CurrentSessionBottomBarLayout";
import { FlatList } from "react-native";
import { TouchableOpacity } from "react-native";

export default function DrinkCategoriesScreen({ navigation }) {
  return(
    <SafeAreaView style={styles.container}>
      <StackHeaderLayout navigation={navigation} title="Add drink"/>
      <View style={styles.content}>
        <Text>Add drinks screen</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: colors.BACKGROUND,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  content: {
    flex: 1,
    width: "100%",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 10,
  },
});