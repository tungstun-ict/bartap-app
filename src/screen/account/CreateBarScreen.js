import React, { useState, useEffect } from "react";
import { KeyboardAvoidingView, SafeAreaView } from "react-native";
import { StyleSheet, Text, View, Image } from "react-native";
import variables, { colors, mock } from "../../theme/variables.js";
import { Button } from "react-native";
import HeaderLayout from "../../layout/HeaderLayout";
import StackHeaderLayout from "../../layout/StackHeaderLayout.js";
import { TextInput } from "react-native";
import { Dimensions } from "react-native";
import * as api from "../../service/BarApiService.js";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ceil } from "react-native-reanimated";
import { apisAreAvailable } from "expo";

export default function CreateBarScreen({ navigation }) {
  const [name, setName] = useState("");
  const [adress, setAdress] = useState("");
  const [mail, setMail] = useState("");
  const [phone, setPhone] = useState(null);

  const createBar = () => {
    if (name !== "") {
      api
        .createBar(name, adress, mail, phone)
        .then((session) => { console.log(session)})
        .finally(() => {
          navigation.navigate("Account");
        })
        .catch((error) => alert(error));
    }else {
      alert("Input fields are not filled in correctly");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StackHeaderLayout navigation={navigation} title="New Bar" />
      <KeyboardAvoidingView style={styles.content}>
        <Text style={styles.input__label}>Name</Text>
        <TextInput
          autoCompleteType={"name"}
          onChangeText={setName}
          multiline={false}
          style={styles.input}
        />
        <Text style={styles.input__label}>Adress</Text>
        <TextInput
          autoCompleteType={"street-address"}
          onChangeText={setAdress}
          multiline={false}
          style={styles.input}
        />
        <Text style={styles.input__label}>Email</Text>
        <TextInput
          autoCompleteType={"email"}
          onChangeText={setMail}
          keyboardType={"email-address"}
          multiline={false}
          style={styles.input}
        />
        <Text style={styles.input__label}>Phone number</Text>
        <TextInput
          autoCompleteType={"tel"}
          onChangeText={setPhone}
          multiline={false}
          keyboardType={"phone-pad"}
          style={styles.input}
        />

        <TouchableOpacity
          onPress={() => createBar()}
          style={styles.button__wrapper}
        >
          <View style={styles.button__submit}>
            <Text style={styles.button__text}>Submit</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
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
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 10,
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
    backgroundColor: colors.ELEMENT_BACKGROUND_LIGHT,
    width: "100%",
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  button__wrapper: {
    minWidth: "100%",
    backgroundColor: colors.ELEMENT_BACKGROUND,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  button__text: {
    fontSize: 15,
    fontWeight: "bold",
  },
});
