import React, { useState } from "react";
import { StyleSheet, TextInput } from "react-native";
import Snackbar from 'react-native-snackbar';

import BarTapButton from "../../../component/BarTapButton/index.js";
import BarTapContent from "../../../component/BarTapContent/index.js";
import BarTapInput from "../../../component/BarTapInput/index.js";
import BarTapTitle from "../../../component/BarTapTitle/index.js";
import * as api from "../../../service/BarApiService.js";
import { ThemeContext } from "../../../theme/ThemeManager.js";

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
        .catch((error) => Snackbar.show({text: error.message, duration: Snackbar.LENGTH_SHORT}));
    }
  };

  const styles = StyleSheet.create({
    button: {
      marginTop: "auto",
      width: "100%",
    },
  });

  return (
    <BarTapContent navigation={navigation} title="Add Customer">
      <BarTapTitle text={"Name"} level={2} />
      <BarTapInput
        autoCompleteType={"name"}
        onChangeText={setName}
      />
      <BarTapTitle text={"Phone number"} level={2} />
      <BarTapInput
        autoCompleteType={"tel"}
        onChangeText={setPhone}
        keyboardType={"phone-pad"}
      />
      <BarTapButton
        onPress={() => createCustomer(name, phone)}
        text={"Submit"}
        style={styles.button}
      />
    </BarTapContent>
  );
}
