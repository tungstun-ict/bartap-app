import React, { useState, useEffect } from "react";
import { KeyboardAvoidingView, SafeAreaView, ScrollView } from "react-native";
import { StyleSheet, Text, View, Image } from "react-native";
import variables, { colors, mock } from "../../theme/variables.js"; 
import BarTapHeader from "../../component/BarTapHeader";
import BarTapStackHeader from "../../component/BarTapStackHeader";
import { TextInput } from "react-native";
import * as api from "../../service/BarApiService.js";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ceil } from "react-native-reanimated";
import { Picker } from "@react-native-picker/picker";

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
      api.createProduct(
        name,
        brand,
        selectedCategory.id,
        isFavourite,
        sellingPrice,
        size
      )
      .finally(() => navigation.navigate("Category Overview", selectedCategory)).catch(error => alert(error));
    } else {
      alert("HOT DAMN, no goeie invoer");
    }
  };

  let pickerItems = categories.map((category) => {
    return (
      <Picker.Item
        label={category.name}
        value={category}
        key={category.id}
      />
    );
  });

  return (
    <SafeAreaView style={styles.container}>
      <BarTapStackHeader navigation={navigation} title="New product" />
      <ScrollView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.content}
      >
        <Text style={styles.input__label}>Name</Text>
        <TextInput
          autoCompleteType={"name"}
          onChangeText={setName}
          multiline={false}
          style={styles.input}
        />
        <Text style={styles.input__label}>Brand</Text>
        <TextInput
          autoCompleteType={"name"}
          onChangeText={setBrand}
          multiline={false}
          style={styles.input}
        />
        <Text style={styles.input__label}>Category</Text>
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
        <Text style={styles.input__label}>Selling price</Text>
        <TextInput
          onChangeText={setSellingPrice}
          multiline={false}
          keyboardType={"numeric"}
          style={styles.input}
        />
        <Text style={styles.input__label}>Size (ml)</Text>
        <TextInput
          onChangeText={setSize}
          multiline={false}
          keyboardType={"numeric"}
          style={styles.input}
        />
        <TouchableOpacity
          onPress={() => createProduct()}
          style={styles.button__wrapper}
        >
          <View style={styles.button__submit}>
            <Text style={styles.button__text}>Submit</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: colors.BARTAP_BLACK,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  content: {
    flex: 1,
    // justifyContent: "flex-start",
    // alignItems: "center",
    width: "100%",
    paddingHorizontal: 10,
  },
  text: {
    color: colors.BARTAP_GREY,
    fontSize: 50,
    fontWeight: "bold",
  },
  picker: {
    height: 60,
    borderColor: colors.BARTAP_WHITE,
    borderWidth: 1,
    backgroundColor: colors.BARTAP_DARK_GREY,
    color: colors.BARTAP_WHITE,
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
    color: colors.BARTAP_WHITE,
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    height: 50,
  },
  input__label: {
    color: colors.BARTAP_WHITE,
    alignSelf: "flex-start",
    fontWeight: "bold",
    fontSize: 20,
    marginTop: 10,
  },
  button__submit: {
    height: 50,
    backgroundColor: colors.BARTAP_DARK_GREY_LIGHT,
    width: "100%",
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  button__wrapper: {
    minWidth: "100%",
    backgroundColor: colors.BARTAP_DARK_GREY,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  button__text: {
    fontSize: 15,
    fontWeight: "bold",
  },
});
