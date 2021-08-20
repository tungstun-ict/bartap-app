import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { TextInput } from "react-native";
import Snackbar from 'react-native-snackbar';

import BarTapButton from "../../../component/BarTapButton/index.js";
import BarTapContent from "../../../component/BarTapContent/index.js";
import BarTapInput from "../../../component/BarTapInput/index.js";
import BarTapTitle from "../../../component/BarTapTitle/index.js";
import * as api from "../../../service/BarApiService.js";
import { ThemeContext } from "../../../theme/ThemeManager.js";

export default function NewSessionScreen({ navigation }) {
  const { theme } = React.useContext(ThemeContext);

  const [name, setName] = useState("");

  const createSession = () => {
    if (name !== "") {
      api
        .createSession(name)
        .catch((error) => Snackbar.show({text: error.message, duration: Snackbar.LENGTH_SHORT}))
        .then(() => {
          navigation.navigate("Session");
        })
    } else {
      alert("Name cannot be empty");
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
    },
    button: {
      marginTop: "auto",
      width: "100%",
    },
  });

  return (
    <BarTapContent>
      <BarTapTitle text={"Name"} level={2} />
        <BarTapInput
          autoCompleteType={"name"}
          onChangeText={setName}
          multiline={false}
          style={styles.input}
        />
        <BarTapButton
          style={styles.button}
          onPress={() => createSession()}
          text={"Submit"}
        />
    </BarTapContent>
  );
}
