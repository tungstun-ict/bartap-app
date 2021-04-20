import React, { useState } from "react";
import { KeyboardAvoidingView, SafeAreaView } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../../theme/variables.js";
import { TextInput } from "react-native";
import * as api from "../../service/BarApiService.js";
import { TouchableOpacity } from "react-native-gesture-handler";
import BarTapStackHeader from "../../component/BarTapStackHeader";
import BarTapButton from "../../component/BarTapButton/index.js";
import { color } from "react-native-reanimated";

export default function CreateBarScreen({ navigation }) {
  const [name, setName] = useState("");
  const [adress, setAdress] = useState("");
  const [mail, setMail] = useState("");
  const [phone, setPhone] = useState(null);

  const createBar = () => {
    if (name !== "") {
      api
        .createBar(name, adress, mail, phone)
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
      <BarTapStackHeader navigation={navigation} title="New Bar" />
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
        <BarTapButton 
          onPress={() => createBar()}
          text={"Create"}
          
          />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: colors.BARTAP_BLACK,
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
    color: colors.BARTAP_GREY,
    fontSize: 50,
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    marginVertical: 10,
    color: colors.BARTAP_WHITE,
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    height: 50,
  },
  input__label: {
    color: colors.BARTAP_WHITE,
    alignSelf: "flex-start",
    fontWeight: "bold",
    fontSize: 20,
    marginTop: 10,
  },
});
