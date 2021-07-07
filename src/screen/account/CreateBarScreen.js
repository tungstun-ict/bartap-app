import React, { useState } from "react";
import { KeyboardAvoidingView, SafeAreaView } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import { theme } from "../../theme/variables.js";
import { TextInput } from "react-native";
import * as api from "../../service/BarApiService.js";
import { TouchableOpacity } from "react-native-gesture-handler";
import BarTapStackHeader from "../../component/BarTapStackHeader";
import BarTapButton from "../../component/BarTapButton/index.js";
import { color } from "react-native-reanimated";
import BarTapTitle from "../../component/BarTapTitle/index.js";
import BarTapContent from "../../component/BarTapContent/index.js";
import { ThemeContext } from "../../theme/ThemeManager.js";

export default function CreateBarScreen({ navigation }) {
  const { theme } = React.useContext(ThemeContext);

  const [name, setName] = useState("");
  const [adress, setAdress] = useState("");
  const [mail, setMail] = useState("");
  const [phone, setPhone] = useState(null);

  const createBar = () => {
    if (name !== "") {
      api
        .createBar(name, adress, mail, phone)
        .then(() => {
          navigation.navigate("Account");
        })
        .catch((error) => alert(error));
    } else {
      alert("Input fields are not filled in correctly");
    }
  };

  const styles = StyleSheet.create({
    input: {
      width: "100%",
      color: theme.TEXT_PRIMARY,
      borderColor: theme.LINE_DARKMODE,
      backgroundColor: theme.BACKGROUND_INPUT,
      borderWidth: 1,
      borderRadius: 5,
      paddingLeft: 10,
      height: 50,
      marginBottom: 10,
    },
    button: {
      marginTop: 10,
    }
  });

  return (
    <BarTapContent navigation={navigation} title="New Bar">
      <BarTapTitle text={"Name"} level={2} />
        <TextInput
          autoCompleteType={"name"}
          onChangeText={setName}
          multiline={false}
          style={styles.input}
        />
        <BarTapTitle text={"Adress"} level={2} />
        <TextInput
          autoCompleteType={"street-address"}
          onChangeText={setAdress}
          multiline={false}
          style={styles.input}
        />
        <BarTapTitle text={"Email"} level={2} />
        <TextInput
          autoCompleteType={"email"}
          onChangeText={setMail}
          keyboardType={"email-address"}
          multiline={false}
          style={styles.input}
        />
        <BarTapTitle text={"Phone number"} level={2} />
        <TextInput
          autoCompleteType={"tel"}
          onChangeText={setPhone}
          multiline={false}
          keyboardType={"phone-pad"}
          style={styles.input}
        />
        <BarTapButton onPress={() => createBar()} text={"Create"} style={styles.button} />
    </BarTapContent>
  );
}
