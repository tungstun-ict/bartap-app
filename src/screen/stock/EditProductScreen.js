import { Picker } from "@react-native-picker/picker";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, TextInput } from "react-native";

import BarTapButton from "../../component/BarTapButton/index.js";
import BarTapContent from "../../component/BarTapContent/index.js";
import BarTapTitle from "../../component/BarTapTitle/index.js";
import * as api from "../../service/BarApiService.js";
import { ThemeContext } from "../../theme/ThemeManager.js";

export default function EditProductScreen({ route, navigation }) {
  const { theme } = React.useContext(ThemeContext);

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

  const styles = StyleSheet.create({
    content: {
      width: "100%",
      height: "100%",
    },
    picker: {
      height: 60,
      borderWidth: 1,
      borderRadius: 5,
      justifyContent: "center",
      width: "100%",
    },
    picker__item: {
      height: 50,
      color: theme.TEXT_PRIMARY,
      backgroundColor: theme.BACKGROUND_PICKER,
    },
    input: {
      marginBottom: 10,
      width: "100%",
      color: theme.TEXT_PRIMARY,
      borderColor: theme.LINE_DARKMODE,
      backgroundColor: theme.BACKGROUND_INPUT,
      borderWidth: 1,
      borderRadius: 5,
      paddingLeft: 10,
      height: 50,
    },
    button: {
      marginTop: "auto",
      width: "100%",
    },
  });

  let pickerItems = categories
    .sort(function (a, b) {
      return b.id < a.id;
    })
    .map((category) => {
      return (
        <Picker.Item
          style={styles.picker__item}
          label={category.name}
          value={category.id}
          key={category.id}
        />
      );
    });

  return (
    <BarTapContent navigation={navigation} title={"Edit " + brand + " " + name}>
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
      </ScrollView>
      <BarTapButton
          style={styles.button}
          onPress={() => updateProduct()}
          text={"Submit"}
        />
    </BarTapContent>
  );
}
