import React, { useState } from "react";
import { StyleSheet, TextInput } from "react-native";
import * as api from "../../service/BarApiService.js";
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
      borderRadius: 5,
      justifyContent: "center",
      width: "100%",
    },
    picker__item: {
      width: "100%",
      height: 50,
      borderRadius: 5,
      backgroundColor: theme.BACKGROUND_PICKER,
      color: theme.TEXT_PRIMARY,
    },
    input: {
      width: "100%",
      color: theme.TEXT_PRIMARY,
      backgroundColor: theme.BACKGROUND_INPUT,
      borderColor: theme.LINE_DARKMODE,
      borderWidth: 1,
      borderRadius: 5,
      paddingLeft: 10,
      height: 50,
    },
    button: {
      width: "100%",
      marginTop: "auto",
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
          <Picker.Item label="Drink" value={"Drink"} key={0} style={styles.picker__item}/>
          <Picker.Item label="Food" value="Food" key={1} style={styles.picker__item}/>
          <Picker.Item label="Other" value="Other" key={2} style={styles.picker__item}/>
        </Picker>
        <BarTapButton style={styles.button} onPress={() => createCategory(name)} text={"Submit"} />
    </BarTapContent>
  );
}
