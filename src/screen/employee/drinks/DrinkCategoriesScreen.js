import React, { useEffect, useState } from "react";
import { RefreshControl, StyleSheet, Text, View } from "react-native";
import { Dimensions, FlatList, Image, TextInput, TouchableOpacity } from "react-native";

import BarTapContent from "../../../component/BarTapContent";
import BarTapSearchBar from "../../../component/BarTapSearchBar";
import * as api from "../../../service/BarApiService.js";
import { ThemeContext } from "../../../theme/ThemeManager";

export default function DrinkCategoriesScreen({ route, navigation }) {
  const { theme } = React.useContext(ThemeContext);

  const [searchString, setSearchString] = useState("");
  const [categories, setCategories] = useState([]);
  const [isCategoriesLoading, setCategoriesLoading] = useState(true);

  useEffect(() => {
    if (isCategoriesLoading) {
      api
        .getCategories()
        .then((json) => {
          json.sort(function (a, b) {
            return b.id < a.id;
          });
          json.unshift({ name: "Favourites", id: -1, productType: "FAVOURITES" });

          setCategories(json);
          setCategoriesLoading(false);
        })
        .catch((error) => {
          alert(error);
          setCategoriesLoading(false);
        });
    }
  }, [isCategoriesLoading]);

  const { billId, sessionId } = route.params;

  const formatData = (data, numColumns) => {
    const numberOfFullRows = Math.floor(data.length / numColumns);

    let numberOfElementsLastRow = data.length - numberOfFullRows * numColumns;
    while (
      numberOfElementsLastRow !== numColumns &&
      numberOfElementsLastRow !== 0
    ) {
      data.push({
        id: `blank-${numberOfElementsLastRow}`,
        empty: true,
        name: "WOW",
        productType: "OTHER",
      });
      numberOfElementsLastRow++;
    }

    return data;
  };

  const search = (string) => {
    if (string.length === 0) {
      return;
    }
    let category = { id: 1, name: string, productType: "SEARCH" };
    console.log(category);
    navigation.navigate("Add Drink", {
      category,
      billId,
      sessionId,
    });
  };

  const handleOnPress = (navigation, category, billId, sessionId) => {
    navigation.navigate("Add Drink", {
      category,
      billId,
      sessionId,
    });
  };

  const styles = StyleSheet.create({
    itemInvisible: {
      backgroundColor: "transparent",
    },
    category: {
      flex: 1,
      flexDirection: "column",
      backgroundColor: theme.BACKGROUND_BUTTON_BIG,
      justifyContent: "center",
      alignItems: "center",
      marginVertical: 10,
      maxHeight: Dimensions.get("window").height / 7,
      maxWidth: Dimensions.get("window").width / 2 - 30,
      minHeight: Dimensions.get("window").height / 7,
      minWidth: Dimensions.get("window").width / 2 - 30,
      borderRadius: 5,
    },
    categories__row: {
      flex: 1,
      justifyContent: "space-around",
    },
    category__name: {
      textAlign: "center",
      fontSize: 20,
      fontFamily: theme.FONT_MEDIUM,
      color: theme.TEXT_DARK,
    },
    categories: {
      marginVertical: 10,
      width: "100%",
      flex: 1,
    },
    searchBar__container: {
      height: 50,
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
      padding: 10,
      marginTop: 10,
    },
    list: {
      flexDirection: "column",
      alignSelf: "center",
      width: "100%",
      maxHeight: "100%",
    },
    favouriteIcon: {
      height: 50,
      width: 50,
    },
  });

  const CategoriesContent = () => {
    return (
      <View style={styles.categories}>
        <FlatList
          refreshControl={
            <RefreshControl
              onRefresh={() => setCategoriesLoading(true)}
              refreshing={isCategoriesLoading}
              tintColor={theme.LOADING_INDICATOR}
            />
          }
          data={formatData(categories, 2)}
          renderItem={({ item }) => {
            if (item.empty === true) {
              return <View style={[styles.category, styles.itemInvisible]} />;
            } else {
              return categoryListItem(navigation, item, billId, sessionId);
            }
          }}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={styles.categories__row}
        />
      </View>
    );
  };

  const categoryListItem = (navigation, category, billId, sessionId) => {
    return (
      <TouchableOpacity
        onPress={() => handleOnPress(navigation, category, billId, sessionId)}
      >
        <View style={styles.category}>
          {category.name === "Favourites" && (
            <Image
              style={styles.favouriteIcon}
              source={require("../../../assets/favourite-icon.png")}
            />
          )}
          {category.name !== "Favourites" && (
            <Text style={styles.category__name}>{category.name}</Text>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <BarTapContent navigation={navigation} title={"Add product"}>
      <View style={styles.searchBar__container}>
        <BarTapSearchBar
          placeholder={"Search all products..."}
          onPress={(string) => search(string)}
          isEmpty={() => search("")}
        />
      </View>
      <CategoriesContent />
    </BarTapContent>
  );
}
