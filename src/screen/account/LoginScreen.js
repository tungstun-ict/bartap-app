import React from "react";
import { SafeAreaView } from "react-native";
import { StyleSheet, Text, View, Image } from "react-native";
import variables, { colors, mock, sizes } from "../../theme/variables.js";
import { Button, TextInput, TouchableOpacity } from "react-native";
import HeaderLayout from "../../layout/HeaderLayout";
import * as api from "../../service/BarApiService.js";

export default function LoginScreen({ navigation }) {

  let email = "";
  let password = "";

  return (
    <SafeAreaView style={styles.container}>
      <HeaderLayout navigation={navigation} />
      <Text style={styles.title}>Log in</Text>
      <View style={styles.content}>
        <Text style={styles.input__label}>Email</Text>
        <TextInput
          autoCompleteType={"email"}
          onChangeText={(given) => (email = given)}
          keyboardType={"email-address"}
          multiline={false}
          style={styles.input}
        />
        <Text style={styles.input__label}>Password</Text>
        <TextInput
          autoCompleteType={"password"}
          onChangeText={(given) => (password = given)}
          keyboardType={"default"}
          multiline={false}
          style={styles.input}
          secureTextEntry={true}
        />
        <TouchableOpacity 
          onPress={() => login(email, password, navigation)}
        style={styles.button__wrapper}>
          <View style={styles.button__submit}>
            <Text style={styles.button__text}>Submit</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

function login(email, password, navigation) {
  let credentials = api.login(email, password)
  // if(credentials.bars in credentials) {
  //   navigation.navigate("Session", credentials.bars[0]);
  // }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: colors.BACKGROUND,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  content: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 10,
  },
  title: {
    height: 40,
    margin: 10,
    color: colors.TEXT_PRIMARY,
    fontSize: sizes.TITLE,
    fontWeight: "bold",
  },
  text: {
    color: colors.TEXT_TERTIARY,
    fontSize: 50,
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    marginVertical: 10,
    color: colors.TEXT_PRIMARY,
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    height: 50,
  },
  input__label: {
    color: colors.TEXT_PRIMARY,
    alignSelf: "flex-start",
    fontWeight: "bold",
    fontSize: 20,
    marginTop: 10,
  },
  button__submit: {
    height: 50,
    width: "100%",
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  button__wrapper: {
    minWidth: "100%",
    backgroundColor: colors.ELEMENT_BACKGROUND_LIGHT,
    borderRadius: 5,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  button__text: {
    fontSize: 15,
    fontWeight: "bold",
  },
});
