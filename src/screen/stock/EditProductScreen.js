import { Picker } from "@react-native-picker/picker";
import React, { useEffect, useState } from "react";
import { KeyboardAvoidingView, SafeAreaView, ScrollView } from "react-native";
import { Image, StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ceil } from "react-native-reanimated";

import BarTapButton from "../../component/BarTapButton/index.js";
import BarTapHeader from "../../component/BarTapHeader";
import BarTapStackHeader from "../../component/BarTapStackHeader";
import BarTapTitle from "../../component/BarTapTitle/index.js";
import * as api from "../../service/BarApiService.js";
import variables, { colors, mock } from "../../theme/variables.js";

export default function EditProductScreen({ route, navigation }) {
  const productId = route.params;
  const [isLoading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [isFavourite, setFavourite] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [sellingPrice, setSellingPrice] = useState(0);
  const [size, setSize] = useState(0);

  useEffect(() => {
    api
      .getCategories()
      .then((json) => {
        json.unshift({ name: "Please select", id: null, type: "OTHER" });
        setCategories(
          json.sort(function (a, b) {
            return b.id < a.id;
          }),
        );
        setLoading(false);
      })
      .catch((error) => {
        alert(error);
      });
  }, []);

  useEffect(() => {
    if (!isLoading) {
      api
        .getProductById(productId)
        .then((json) => {
          setName(json.name);
          setBrand(json.brand);
          setSellingPrice(json.price);
          setSize(json.size);
          console.log(json.category);
          setSelectedCategory(json.category);
          setLoading(false);
        })
        .catch((error) => {
          alert(error);
        });
    }
  }, [isLoading]);

  const updateProduct = () => {
    if (
      name !== "" &&
      selectedCategory !== null &&
      sellingPrice !== null &&
      brand !== "" &&
      size > 0
    ) {
      api
        .updateProduct(
          productId,
          name,
          brand,
          selectedCategory,
          isFavourite,
          sellingPrice,
          size,
        )
        .then(() => navigation.navigate("Stock Overview"))
        .catch((error) => alert(error));
    } else {
      alert("SHEEESSH, no goeie invoer");
    }
  };

  let pickerItems = categories
    .sort(function (a, b) {
      return b.id < a.id;
    })
    .map((category) => {
      return (
        <Picker.Item
          label={category.name}
          value={category.id}
          key={category.id}
        />
      );
    });

  return (
    <SafeAreaView style={styles.container}>
      <BarTapStackHeader navigation={navigation} title="Edit product" />
      <ScrollView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.content}
      >
        <BarTapTitle text={"Name"} level={2} />
        <TextInput
          autoCompleteType={"name"}
          onChangeText={setName}
          multiline={false}
          value={name}
          style={styles.input}
        />
        <BarTapTitle text={"Brand"} level={2} />
        <TextInput
          autoCompleteType={"name"}
          onChangeText={setBrand}
          multiline={false}
          value={brand}
          style={styles.input}
        />
        <BarTapTitle text={"Category"} level={2} />
        <Picker
          style={styles.picker}
          selectedValue={selectedCategory}
          itemStyle={styles.picker__item}
          value={selectedCategory}
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
          value={sellingPrice.toString()}
          keyboardType={"numeric"}
          style={styles.input}
        />
        <BarTapTitle text={"Size (ml)"} level={2} />
        <TextInput
          onChangeText={setSize}
          multiline={false}
          value={size.toString()}
          keyboardType={"numeric"}
          style={styles.input}
        />
        <BarTapButton
          style={styles.button}
          onPress={() => updateProduct()}
          text={"Submit"}
        />
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
  },
});
