import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView, TextInput } from "react-native";
import * as api from "../../service/BarApiService.js";
import { Picker } from "@react-native-picker/picker";
import BarTapButton from "../../component/BarTapButton/index.js";
import BarTapTitle from "../../component/BarTapTitle/index.js";
import BarTapContent from "../../component/BarTapContent/index.js";
import { ThemeContext } from "../../theme/ThemeManager.js";

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
    input: {
      width: "100%",
      color: theme.TEXT_PRIMARY,
      backgroundColor: theme.BACKGROUND_INPUT,
      borderColor: theme.LINE_DARKMODE,
      borderWidth: 1,
      borderRadius: 5,
      height: 50,
      marginBottom: 10,
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
      </ScrollView>
      <BarTapButton style={styles.button} onPress={() => createProduct()} text={"Submit"} />
    </BarTapContent>
  );
}
