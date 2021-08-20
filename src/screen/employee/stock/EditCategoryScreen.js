import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { TextInput } from "react-native";
import Snackbar from 'react-native-snackbar';

import BarTapButton from "../../../component/BarTapButton/index.js";
import BarTapContent from "../../../component/BarTapContent/index.js";
import BarTapInput from "../../../component/BarTapInput/index.js";
import BarTapTitle from "../../../component/BarTapTitle/index.js";
import * as api from "../../../service/BarApiService.js";
import { ThemeContext } from "../../../theme/ThemeManager.js";

export default function EditCategoryScreen({ route, navigation }) {
  const { theme } = React.useContext(ThemeContext);

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
        Snackbar.show({text: error.message, duration: Snackbar.LENGTH_SHORT});
        setLoading(false);
      });
  }, []);

  const updateCategory = () => {
    if (name !== "") {
      api
        .updateCategory(categoryId, name, category.type)
        .then(() => {
          navigation.navigate("Stock Overview");
        })
        .catch((error) => {
          Snackbar.show({text: error.message, duration: Snackbar.LENGTH_SHORT});
        });
    }
  };

  const styles = StyleSheet.create({
    button: {
      marginTop: "auto",
      width: "100%",
    },
  });

  return (
    <BarTapContent navigation={navigation} title={"Edit " + category.name}>
      <BarTapTitle text={"Name"} level={2} />
        <BarTapInput
          autoCompleteType={"name"}
          onChangeText={setName}
          value={name}
        />
        <BarTapButton
          style={styles.button}
          onPress={() => updateCategory()}
          text={"Submit"}
        />
    </BarTapContent>
  );
}
