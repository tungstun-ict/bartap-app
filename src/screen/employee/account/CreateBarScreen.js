import React, { useState } from "react";
import { StyleSheet } from "react-native";
import Snackbar from 'react-native-snackbar';

import BarTapButton from "../../../component/BarTapButton/index.js";
import BarTapContent from "../../../component/BarTapContent/index.js";
import BarTapInput from "../../../component/BarTapInput/index.js";
import BarTapTitle from "../../../component/BarTapTitle/index.js";
import * as api from "../../../service/BarApiService.js";
import { ThemeContext } from "../../../theme/ThemeManager.js";

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
        .catch((error) => Snackbar.show({text: error.message, duration: Snackbar.LENGTH_SHORT}));
    } else {
      alert("Input fields are not filled in correctly");
    }
  };

  const styles = StyleSheet.create({
    button: {
      marginTop: "auto",
      width: "100%",
    }
  });

  return (
    <BarTapContent navigation={navigation} title="New Bar">
      <BarTapTitle text={"Name"} level={2} />
        <BarTapInput
          autoCompleteType={"name"}
          onChangeText={setName}
        />
        <BarTapTitle text={"Adress"} level={2} />
        <BarTapInput
          autoCompleteType={"street-address"}
          onChangeText={setAdress}
        />
        <BarTapTitle text={"Email"} level={2} />
        <BarTapInput
          autoCompleteType={"email"}
          onChangeText={setMail}
          keyboardType={"email-address"}
        />
        <BarTapTitle text={"Phone number"} level={2} />
        <BarTapInput
          autoCompleteType={"tel"}
          onChangeText={setPhone}
          keyboardType={"phone-pad"}
        />
        <BarTapButton onPress={() => createBar()} text={"Create"} style={styles.button} />
    </BarTapContent>
  );
}
