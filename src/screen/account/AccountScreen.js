import React, {useContext, useEffect, useState} from "react";
import { SafeAreaView } from "react-native";
import { StyleSheet, Text, View, Image } from "react-native";
import variables, { colors, mock, sizes } from "../../theme/variables.js";
import { Button, TextInput, TouchableOpacity } from "react-native";
import HeaderLayout from "../../layout/HeaderLayout";
import * as api from "../../service/BarApiService.js";
import { AuthContext } from "../../service/Context.js";
import { Picker } from "@react-native-picker/picker";
import { Value } from "react-native-reanimated";
import { StackActions } from '@react-navigation/native';
import { useFocusEffect } from "@react-navigation/core";
import * as storage from "../../service/BarStorageService.js";

export default function AccountScreen({ navigation }) {
  const [selectedBar, setSelectedBar] = useState(storage.getActiveBar().catch((error) => alert(error)));
  const [bars, setBars] = useState([]);

  const { signOut } = useContext(AuthContext);
  const _logout = () => {
    signOut();
  }

  useEffect(() => {
    console.log("Getting all bars!")
    api.getBars()
    .then((json) => setBars(json))
    .catch((error) => alert(error));
  }, []);

  useEffect(() => {
    storage.storeActiveBar(selectedBar.toString()).catch((error) => error)
  }, [selectedBar])

  let pickerItems = bars.map((bar) => {
    return <Picker.Item label={bar.name} value={bar.id}/>
  })

  return (
    <SafeAreaView style={styles.container}>
      <HeaderLayout navigation={navigation} />
      <Text style={styles.title}>Account</Text>
      <View style={styles.content}>
        <View style={styles.barsView}>
          <Picker
          style={styles.picker}
          selectedValue={selectedBar}
          itemStyle={styles.picker__item}
          
          onValueChange={(itemValue, itemIndex) => {
            setSelectedBar(itemValue);
          }}>
          {
            pickerItems
          }</Picker>
        </View>
      <TouchableOpacity 
          onPress={() => _logout()}
          style={styles.button__wrapper}>
          <View style={styles.button__submit}>
            <Text style={styles.button__text}>Log out</Text>
          </View>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
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
  picker: {
    borderColor: colors.TEXT_PRIMARY,
    borderWidth: 5,
    color: colors.TEXT_PRIMARY,
    backgroundColor: colors.ELEMENT_BACKGROUND,
    borderRadius: 5,
    marginVertical: 10,
  },
  picker__item: {
    color: "black"
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
  barsView: {
    width: "100%",
    height: "auto",
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
