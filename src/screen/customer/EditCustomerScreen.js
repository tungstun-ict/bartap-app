import React, { useState } from "react";
import { StyleSheet, TextInput } from "react-native";

import BarTapButton from "../../component/BarTapButton/index.js";
import BarTapContent from "../../component/BarTapContent/index.js";
import BarTapInput from "../../component/BarTapInput/index.js";
import BarTapTitle from "../../component/BarTapTitle/index.js";
import * as api from "../../service/BarApiService.js";
import { ThemeContext } from "../../theme/ThemeManager.js";

export default function EditCustomerScreen({ navigation, route }) {
  const { theme } = React.useContext(ThemeContext);
  const customer = route.params;
  const [name, setName] = useState(customer.name);
  const [phone, setPhone] = useState((customer.phoneNumber).toString());

  const updateCustomer = (name, phone) => {
    if (name !== "" && phone !== "" && phone.length === 10) {
      api
        .updateCustomer(customer.id, name, phone)
        .then(() => {
          navigation.navigate("Customer overview", { id: customer.id });
        })
        .catch((error) => alert(error));
    }
  };

  const styles = StyleSheet.create({
    button: {
      marginTop: "auto",
      width: "100%",
    },
  });

  return (
    <BarTapContent navigation={navigation} title={"Edit " + name}>
      <BarTapTitle text={"Name"} level={2} />
      <BarTapInput
        value={name}
        autoCompleteType={"name"}
        onChangeText={setName}
      />
      <BarTapTitle text={"Phone number"} level={2} />
      <BarTapInput
        value={phone}
        autoCompleteType={"tel"}
        onChangeText={setPhone}
        keyboardType={"phone-pad"}
      />
      <BarTapButton
        onPress={() => {
          updateCustomer(name, phone);
        }}
        text={"Submit"}
        style={styles.button}
      />
    </BarTapContent>
  );
}
