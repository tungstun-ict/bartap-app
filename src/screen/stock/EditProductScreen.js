import { Picker } from "@react-native-picker/picker";
import React, { useEffect, useState } from "react";
import { KeyboardAvoidingView, SafeAreaView, ScrollView } from "react-native";
import { Image, StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ceil } from "react-native-reanimated";

import BarTapButton from "../../component/BarTapButton/index.js";
import BarTapContent from "../../component/BarTapContent/index.js";
import BarTapHeader from "../../component/BarTapHeader";
import BarTapStackHeader from "../../component/BarTapStackHeader";
import BarTapTitle from "../../component/BarTapTitle/index.js";
import * as api from "../../service/BarApiService.js";
import { ThemeContext } from "../../theme/ThemeManager.js";
import variables, { theme, mock } from "../../theme/variables.js";

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
      color: "white",
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
    },
  });

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
        <BarTapButton
          style={styles.button}
          onPress={() => updateProduct()}
          text={"Submit"}
        />
      </ScrollView>
    </BarTapContent>
  );
}
