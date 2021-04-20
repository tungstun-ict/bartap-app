import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native";
import { StyleSheet, Text, View, Image } from "react-native";
import variables, { colors, mock } from "../../theme/variables.js";
import { Button } from "react-native";
import BarTapHeader from "../../component/BarTapHeader";
import BarTapStackHeader from "../../component/BarTapStackHeader";
import { TextInput } from "react-native";
import { Dimensions } from "react-native";
import * as api from "../../service/BarApiService.js";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ceil } from "react-native-reanimated";
import { apisAreAvailable } from "expo";
import { Picker } from "@react-native-picker/picker";
import BarTapButton from "../../component/BarTapButton/index.js";
import BarTapTitle from "../../component/BarTapTitle/index.js";

export default function EditCategoryScreen({ route, navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [category, setCategory] = useState({});
  const [name, setName] = useState(null);
  const categoryId = route.params;

  useEffect(() => {
    api
      .getCategoryById(categoryId)
      .then((json) => {
        setCategory(json);
        setName(json.name);
        setLoading(false);
      })
      .catch((error) => {
        alert(error);
        setLoading(false);
      });
  }, []);

  const updateCategory = () => {
    if (name !== "") {
      api
        .updateCategory(categoryId, name, category.type)
        .finally(() => {
          navigation.navigate("Stock Overview");
        })
        .catch((error) => {
          alert(error);
        });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <BarTapStackHeader navigation={navigation} title="" />
      <View style={styles.content}>
        <BarTapTitle text={"Name"} level={2} />
        <TextInput
          autoCompleteType={"name"}
          onChangeText={setName}
          value={name}
          multiline={false}
          style={styles.input}
        />
        <BarTapButton
          style={styles.button}
          onPress={() => updateCategory()}
          text={"Submit"}
        />
      </View>
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
    marginVertical: 10,
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
