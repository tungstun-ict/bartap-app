import React from "react";
import { SafeAreaView } from "react-native";
import { StyleSheet, Text, View, Image } from "react-native";
import { Grid } from "react-native-grid-component";
import HeaderLayout from "../layout/HeaderLayout.js";
import variables, { colors, mock } from "../theme/variables.js";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <HeaderLayout />
      <Grid style={styles.session} numColums={3}>
        <Text style={styles.session__title}></Text>
      </Grid>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: colors.BACKGROUND,
    alignItems: "center",
    justifyContent: "center",
  },

  session: {},

  session__title: {},
});
