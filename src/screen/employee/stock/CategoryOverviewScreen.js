import React, { useEffect, useState } from "react";
import { FlatList, RefreshControl, StyleSheet, View } from "react-native";
import Snackbar from 'react-native-snackbar';

import BarTapButton from "../../../component/BarTapButton/index.js";
import BarTapContent from "../../../component/BarTapContent/index.js";
import BarTapListItem from "../../../component/BarTapListItem/index.js";
import BarTapTitle from "../../../component/BarTapTitle/index.js";
import * as api from "../../../service/BarApiService.js";
import * as Utils from "../../../service/Utils.js";
import { ThemeContext } from "../../../theme/ThemeManager.js";
import { colors } from "../../../theme/variables.js";

export default function CategoryOverviewScreen({ route, navigation }) {
  const { theme } = React.useContext(ThemeContext);

  const [drinks, setDrinks] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const category = route.params;

  useEffect(() => {
    if (isLoading) {
      api
        .getDrinksByCategory(category.id)
        .then((json) => {
          json.sort((a, b) => Utils.sortListItemString(a.brand, b.brand));
          setDrinks(json);
          setLoading(false);
        })
        .catch((error) => {
          Snackbar.show({text: error.message, duration: Snackbar.LENGTH_SHORT});
          setLoading(false);
        });
    }
  }, [isLoading]);

  const styles = StyleSheet.create({
    list: {
      flex: 1,
      flexDirection: "column",
      alignSelf: "center",
      width: "105%",
    },
    button: {
      width: "100%",
    },
  });

  const listItem = (drink) => {
    return (
      <BarTapListItem
        onPress={() => {
          navigation.navigate("Edit Product", drink.id);
        }}
        name={`${drink.brand} ${drink.name}`}
        price={drink.price.toFixed(2)}
      />
    );
  };

  return (
    <BarTapContent navigation={navigation} title={"Category " + category.name}>
      <BarTapTitle text={category.name} level={1} />
      <FlatList
        refreshControl={
          <RefreshControl
            onRefresh={() => setLoading(true)}
            refreshing={isLoading}
            tintColor={theme.LOADING_INDICATOR}
          />
        }
        keyExtractor={(item) => item.id.toString()}
        style={styles.list}
        data={drinks}
        renderItem={(item) => listItem(item.item)}
      />
      <BarTapButton
        style={styles.button}
        onPress={() => navigation.navigate("Edit Category", category.id)}
        text={"Edit"}
      />
    </BarTapContent>
  );
}
