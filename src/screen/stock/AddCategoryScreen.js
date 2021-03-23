import React, {useState, useEffect} from "react";
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
import { Picker } from "@react-native-picker/picker";

export default function AddCategoryScreen({ navigation }) {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  
 const createCategory = (name) => {
  if(name !== "") {
    api.createCategory(name, type)
    .finally(() => {
      navigation.navigate("Stock Overview");
    })
    .catch((error) => {
      alert(error);
    })
    
  }
}

  return (
    <SafeAreaView style={styles.container}>
      <StackHeaderLayout navigation={navigation} title="New Category" />
      <View style={styles.content}>
        <Text style={styles.input__label}>Name</Text>
        <TextInput
          autoCompleteType={"name"}
          onChangeText={setName}
          multiline={false}
          style={styles.input}
        />
         <Text style={styles.input__label}>Type</Text>
        <Picker
          style={styles.picker}
          selectedValue={type}
          itemStyle={styles.picker__item}
          onValueChange={(itemValue) => {
            setType(itemValue);
          }}>
            <Picker.Item label="Drink" value={"Drink"} key={0}/>
            <Picker.Item label="Food" value="Food" key={1}/>
            <Picker.Item label="Other" value="Other" key={2}/>
          </Picker>
        <TouchableOpacity 
          onPress={() => createCategory(name)}
          style={styles.button__wrapper}>
          <View style={styles.button__submit}>
            <Text style={styles.button__text}>Submit</Text>
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
    alignItems: "center",
    justifyContent: "flex-start",
  },
  content: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 10,
  },
  text: {
    color: colors.TEXT_TERTIARY,
    fontSize: 50,
    fontWeight: "bold",
  },
  picker: {
    height: 60,
    borderColor: colors.TEXT_PRIMARY,
    borderWidth: 1,
    backgroundColor: colors.ELEMENT_BACKGROUND,
    color: colors.TEXT_PRIMARY,
    borderRadius: 5,
    justifyContent: "center",
    marginVertical: 10,
    width: "100%",
  },
  picker__item: {
    height: 50,
    color: "white"
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
