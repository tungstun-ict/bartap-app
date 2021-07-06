import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native";
import { StyleSheet, Text, View, Image } from "react-native";
import variables, { theme, mock } from "../../theme/variables.js";
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
import { ThemeContext } from "../../theme/ThemeManager.js";
import BarTapContent from "../../component/BarTapContent/index.js";

export default function AddCategoryScreen({ navigation }) {
  const { theme } = React.useContext(ThemeContext);

  const [name, setName] = useState("");
  const [type, setType] = useState("");

  const createCategory = (name) => {
    if (name !== "") {
      api
        .createCategory(name, type)
        .then(() => {
          navigation.navigate("Stock Overview");
        })
        .catch((error) => {
          alert(error);
        });
    }
  };

  const styles = StyleSheet.create({
    picker: {
      height: 60,
      borderColor: theme.BARTAP_WHITE,
      borderWidth: 1,
      backgroundColor: theme.BARTAP_DARK_GREY,
      color: theme.BARTAP_WHITE,
      borderRadius: 5,
      justifyContent: "center",
      width: "100%",
    },
    picker__item: {
      height: 50,
      color: theme.BARTAP_WHITE,
    },
    input: {
      width: "100%",
      color: theme.BARTAP_WHITE,
      borderColor: theme.BARTAP_WHITE,
      borderWidth: 1,
      borderRadius: 5,
      paddingLeft: 10,
      height: 50,
    },
    button: {
      marginTop: 10,
    }
  });

  return (
    <BarTapContent navigation={navigation} title={"New Category"}>
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
    </BarTapContent>
  );
}
