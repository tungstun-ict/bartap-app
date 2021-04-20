import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native";
import { StyleSheet, Text, View, Image } from "react-native";
import variables, { colors, mock } from "../../theme/variables.js";
import { Button } from "react-native";
import BarTapHeader from "../../component/BarTapHeader";
import BarTapStackHeader from "../../component/BarTapStackHeader";
import { TextInput } from "react-native";
import { Dimensions } from "react-native";
import * as api from "../../service/BarApiService.js";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ceil } from "react-native-reanimated";
import { apisAreAvailable } from "expo";
import { Picker } from "@react-native-picker/picker";
import BarTapButton from "../../component/BarTapButton/index.js";
import BarTapTitle from "../../component/BarTapTitle/index.js";

export default function AddCategoryScreen({ navigation }) {
  const [name, setName] = useState("");
  const [type, setType] = useState("");

  const createCategory = (name) => {
    if (name !== "") {
      api
        .createCategory(name, type)
        .finally(() => {
          navigation.navigate("Stock Overview");
        })
        .catch((error) => {
          alert(error);
        });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <BarTapStackHeader navigation={navigation} title="New Category" />
      <View style={styles.content}>
        <BarTapTitle text={"Name"} level={2} />
        <TextInput
          autoCompleteType={"name"}
          onChangeText={setName}
          multiline={false}
          style={styles.input}
        />
        <BarTapTitle text={"Type"} level={2} />
        <Picker
          style={styles.picker}
          selectedValue={type}
          itemStyle={styles.picker__item}
          onValueChange={(itemValue) => {
            setType(itemValue);
          }}
        >
          <Picker.Item label="Drink" value={"Drink"} key={0} />
          <Picker.Item label="Food" value="Food" key={1} />
          <Picker.Item label="Other" value="Other" key={2} />
        </Picker>
        <BarTapButton style={styles.button} onPress={() => createCategory(name)} text={"Submit"} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: colors.BARTAP_BLACK,
  },
  content: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 10,
  },
  picker: {
    height: 60,
    borderColor: colors.BARTAP_WHITE,
    borderWidth: 1,
    backgroundColor: colors.BARTAP_DARK_GREY,
    color: colors.BARTAP_WHITE,
    borderRadius: 5,
    justifyContent: "center",
    width: "100%",
  },
  picker__item: {
    height: 50,
    color: "white",
  },
  input: {
    width: "100%",
    color: colors.BARTAP_WHITE,
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    height: 50,
  },
  button: {
    marginTop: 10,
  }
});
