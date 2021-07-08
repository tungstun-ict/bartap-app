import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { TextInput } from "react-native";
import * as api from "../../service/BarApiService.js";
import BarTapButton from "../../component/BarTapButton/index.js";
import BarTapTitle from "../../component/BarTapTitle/index.js";
import BarTapContent from "../../component/BarTapContent/index.js";
import { ThemeContext } from "../../theme/ThemeManager.js";

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
        alert(error);
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
          alert(error);
        });
    }
  };

  const styles = StyleSheet.create({
    input: {
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

  return (
    <BarTapContent navigation={navigation} title={"Edit " + category.name}>
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
    </BarTapContent>
  );
}
