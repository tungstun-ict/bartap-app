import React from "react";
import { SafeAreaView } from "react-native";
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

export default function AddCustomerScreen({ navigation }) {
  
  let name = "";
  let phone = "";
  
  return (
    <SafeAreaView style={styles.container}>
      <StackHeaderLayout navigation={navigation} title="Add Customer" />
      <View style={styles.content}>
        <Text style={styles.input__label}>Name</Text>
        <TextInput
          autoCompleteType={"name"}
          onChangeText={given => name = given}
          multiline={false}
          style={styles.input}
        />
        <Text style={styles.input__label}>Phone number</Text>
        <TextInput
          autoCompleteType={"tel"}
          onChangeText={given => phone = given}
          keyboardType={"phone-pad"}
          multiline={false}
          style={styles.input}
        />
        <TouchableOpacity 
          onPress={() => createCustomer(name, phone, navigation)}
        style={styles.button__wrapper}>
          <View style={styles.button__submit}>
            <Text style={styles.button__text}>Submit</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
  
  
}
function createCustomer(name, phone, navigation) {
  if(name !== "") {
    let id = api.createCustomer(name, phone);
    navigation.navigate("Customer overview", id)
  }
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
    justifyContent: "center",
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
