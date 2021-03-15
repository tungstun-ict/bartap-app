import React, { useState, useEffect } from "react";
import { KeyboardAvoidingView, SafeAreaView, ScrollView } from "react-native";
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
import { CheckBox } from "@react-native-community/checkbox";

export default function AddProductStockScreen({ navigation }) {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [isFavourite, setFavourite] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [sellingPrice, setSellingPrice] = useState(null);
  const [size, setSize] = useState(0);
  const [productType, setProductType] = useState("Drink");

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
      size > 0 &&
      productType !== ""
    ) {
      api.createProduct(
        name,
        brand,
        selectedCategory.id,
        isFavourite,
        sellingPrice,
        productType,
        size
      ).finally(() => navigation.navigate("Category Overview", selectedCategory)).catch(error => alert(error.response.toString()));
      
    } else {
      alert("HOT DAMN, no goeie invoer");
      console.log(`${name} ${brand} ${isFavourite} ${selectedCategory.id} ${sellingPrice} ${size} ${productType} `)
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
      <StackHeaderLayout navigation={navigation} title="Add Drink" />
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
        <Text style={styles.input__label}>Type</Text>
        <Picker
          style={styles.picker}
          selectedValue={productType}
          itemStyle={styles.picker__item}
          onValueChange={(itemValue) => {
            setProductType(itemValue);
          }}
        >
          <Picker.Item label="Drink" value="DRINK" key={0} />
          <Picker.Item label="Food" value="FOOD" key={1} />
          <Picker.Item label="Other" value="OTHER" key={2} />
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
    backgroundColor: colors.BACKGROUND,
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
    color: colors.TEXT_TERTIARY,
    fontSize: 50,
    fontWeight: "bold",
  },
  picker: {
    borderColor: colors.TEXT_PRIMARY,
    borderWidth: 5,
    color: colors.TEXT_PRIMARY,
    backgroundColor: colors.ELEMENT_BACKGROUND,
    borderRadius: 5,
    marginVertical: 10,
    width: "100%",
  },
  picker__item: {
    color: "black",
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
