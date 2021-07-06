import React, { useState, useEffect } from "react";
import { KeyboardAvoidingView, SafeAreaView, ScrollView } from "react-native";
import { StyleSheet, Text, View, Image } from "react-native";
import variables, { darkTheme, mock } from "../../theme/variables.js";
import BarTapHeader from "../../component/BarTapHeader";
import BarTapStackHeader from "../../component/BarTapStackHeader";
import { TextInput } from "react-native";
import * as api from "../../service/BarApiService.js";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ceil } from "react-native-reanimated";
import { Picker } from "@react-native-picker/picker";
import BarTapButton from "../../component/BarTapButton/index.js";
import BarTapTitle from "../../component/BarTapTitle/index.js";

export default function AddProductStockScreen({ navigation }) {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [isFavourite, setFavourite] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [sellingPrice, setSellingPrice] = useState(null);
  const [size, setSize] = useState(0);

  useEffect(() => {
    api
      .getCategories()
      .then((json) => {
        setCategories(json);
        setSelectedCategory(json[0]);
      })
      .catch((error) => {
        alert(error);
      });
  }, []);

  const createProduct = () => {
    if (
      name !== "" &&
      selectedCategory !== null &&
      sellingPrice !== null &&
      brand !== "" &&
      size > 0
    ) {
      api
        .createProduct(
          name,
          brand,
          selectedCategory.id,
          isFavourite,
          sellingPrice,
          size,
        )
        .then(() =>
          navigation.navigate("Category Overview", selectedCategory),
        )
        .catch((error) => alert(error));
    } else {
      alert("HOT DAMN, no goeie invoer");
    }
  };

  let pickerItems = categories.map((category) => {
    return (
      <Picker.Item label={category.name} value={category} key={category.id} />
    );
  });

  return (
    <SafeAreaView style={styles.container}>
      <BarTapStackHeader navigation={navigation} title="New product" />
      <ScrollView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.content}
      >
        <BarTapTitle text={"Name"} level={2} />
        <TextInput
          autoCompleteType={"name"}
          onChangeText={setName}
          multiline={false}
          style={styles.input}
        />
        <BarTapTitle text={"Brand"} level={2} />
        <TextInput
          autoCompleteType={"name"}
          onChangeText={setBrand}
          multiline={false}
          style={styles.input}
        />
        <BarTapTitle text={"Category"} level={2} />
        <Picker
          style={styles.picker}
          selectedValue={selectedCategory}
          itemStyle={styles.picker__item}
          onValueChange={(itemValue) => {
            setSelectedCategory(itemValue);
          }}
        >
          {pickerItems}
        </Picker>
        <BarTapTitle text={"Selling price"} level={2} />
        <TextInput
          onChangeText={setSellingPrice}
          multiline={false}
          keyboardType={"numeric"}
          style={styles.input}
        />
        <BarTapTitle text={"Size (ml)"} level={2} />
        <TextInput
          onChangeText={setSize}
          multiline={false}
          keyboardType={"numeric"}
          style={styles.input}
        />
        <BarTapButton style={styles.button} onPress={() => createProduct()} text={"Submit"} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: darkTheme.BARTAP_BLACK,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  content: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 10,
  },
  picker: {
    height: 60,
    borderColor: darkTheme.BARTAP_WHITE,
    borderWidth: 1,
    backgroundColor: darkTheme.BARTAP_DARK_GREY,
    color: darkTheme.BARTAP_WHITE,
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
    color: darkTheme.BARTAP_WHITE,
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 5,
    height: 50,
  },
  button: {
    marginTop: 10,
  }
});
