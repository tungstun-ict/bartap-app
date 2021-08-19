import { Picker } from "@react-native-picker/picker";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, TextInput } from "react-native";
import Snackbar from 'react-native-snackbar';

import BarTapButton from "../../../component/BarTapButton/index.js";
import BarTapContent from "../../../component/BarTapContent/index.js";
import BarTapInput from "../../../component/BarTapInput/index.js";
import BarTapPicker from "../../../component/BarTapPicker/index.js";
import BarTapTitle from "../../../component/BarTapTitle/index.js";
import * as api from "../../../service/BarApiService.js";
import { ThemeContext } from "../../../theme/ThemeManager.js";

export default function AddProductStockScreen({ navigation }) {
  const { theme } = React.useContext(ThemeContext);

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
        Snackbar.show({text: error.message, duration: Snackbar.LENGTH_SHORT});
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
        .catch((error) => Snackbar.show({text: error.message, duration: Snackbar.LENGTH_SHORT}));
    } else {
      alert("HOT DAMN, no goeie invoer");
    }
  };

  const styles = StyleSheet.create({
    content: {
      minWidth: "100%",
      maxHeight: "100%",
      flex: 1,
    },
    picker: {
      height: 60,
      borderRadius: 5,
      justifyContent: "center",
      width: "100%",
      
    },
    picker__item: {
      width: "100%",
      height: 50,
      backgroundColor: theme.BACKGROUND_PICKER,
      color: theme.TEXT_PRIMARY,
    },
    button: {
      marginTop: "auto",
      width: "100%",
    }
  });

  let pickerItems = categories.map((category) => {
    return (
      <Picker.Item label={category.name} value={category} key={category.id} style={styles.picker__item} />
    );
  });

  return (
    <BarTapContent navigation={navigation} title={"New Product"}>
      <ScrollView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.content}
      >
        <BarTapTitle text={"Name"} level={2} />
        <BarTapInput
          autoCompleteType={"name"}
          onChangeText={setName}
        />
        <BarTapTitle text={"Brand"} level={2} />
        <BarTapInput
          autoCompleteType={"name"}
          onChangeText={setBrand}
        />
        <BarTapTitle text={"Category"} level={2} />
        <BarTapPicker
          style={styles.picker}
          selectedValue={selectedCategory}
          itemStyle={styles.picker__item}
          onValueChange={(itemValue) => {
            setSelectedCategory(itemValue);
          }}
        >
          {pickerItems}
        </BarTapPicker>
        <BarTapTitle text={"Selling price"} level={2} />
        <BarTapInput
          onChangeText={setSellingPrice}
          keyboardType={"numeric"}
        />
        <BarTapTitle text={"Size (ml)"} level={2} />
        <BarTapInput
          onChangeText={setSize}
          keyboardType={"numeric"}
        />
      </ScrollView>
      <BarTapButton style={styles.button} onPress={() => createProduct()} text={"Submit"} />
    </BarTapContent>
  );
}
