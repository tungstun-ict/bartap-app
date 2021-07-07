import React, { useState } from "react";
import { StyleSheet, TextInput } from "react-native";
import * as api from "../../service/BarApiService.js";
import BarTapButton from "../../component/BarTapButton/index.js";
import BarTapTitle from "../../component/BarTapTitle/index.js";
import BarTapContent from "../../component/BarTapContent/index.js";
import { ThemeContext } from "../../theme/ThemeManager.js";

export default function AddCustomerScreen({ navigation }) {
  const { theme } = React.useContext(ThemeContext);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const createCustomer = (name, phone) => {
    if (name !== "" && phone !== "") {
      api
        .createCustomer(name, phone)
        .then(() => {
          navigation.navigate("Customers");
        })
        .catch((error) => alert(error));
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
    <BarTapContent navigation={navigation} title="Add Customer">
      <BarTapTitle text={"Name"} level={2} />
      <TextInput
        autoCompleteType={"name"}
        onChangeText={setName}
        multiline={false}
        style={styles.input}
      />
      <BarTapTitle text={"Phone number"} level={2} />
      <TextInput
        autoCompleteType={"tel"}
        onChangeText={setPhone}
        keyboardType={"phone-pad"}
        multiline={false}
        style={styles.input}
      />
      <BarTapButton
        onPress={() => createCustomer(name, phone)}
        text={"Submit"}
        style={styles.button}
      />
    </BarTapContent>
  );
}
