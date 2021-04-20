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
        json.unshift({"name": "Please select", "id": null, "type": "OTHER"})
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
    if(!isLoading) {
      api
        .getProductById(productId)
        .then((json) => {
          setName(json.name);
          setBrand(json.brand);
          setSellingPrice(json.price);
          setSize(json.size);
          console.log(json.category)
          setSelectedCategory(json.category);
          setLoading(false);
        })
        .catch((error) => {
          alert(error);
        });
    }
  }, [isLoading])

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
        .finally(() => navigation.navigate("Stock Overview"))
        .catch((error) => alert(error));
    } else {
      alert("HOT DAMN, no goeie invoer");
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
        <Text style={styles.input__label}>Name</Text>
        <TextInput
          autoCompleteType={"name"}
          onChangeText={setName}
          multiline={false}
          value={name}
          style={styles.input}
        />
        <Text style={styles.input__label}>Brand</Text>
        <TextInput
          autoCompleteType={"name"}
          onChangeText={setBrand}
          multiline={false}
          value={brand}
          style={styles.input}
        />
        <Text style={styles.input__label}>Category</Text>
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
        <Text style={styles.input__label}>Selling price</Text>
        <TextInput
          onChangeText={setSellingPrice}
          multiline={false}
          value={sellingPrice.toString()}
          keyboardType={"numeric"}
          style={styles.input}
        />
        <Text style={styles.input__label}>Size (ml)</Text>
        <TextInput
          onChangeText={setSize}
          multiline={false}
          value={size.toString()}
          keyboardType={"numeric"}
          style={styles.input}
        />
        <TouchableOpacity
          onPress={() => updateProduct()}
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
    color: "white",
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
