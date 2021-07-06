import React, { useEffect, useState } from "react";
import { RefreshControl, SafeAreaView } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import { Dimensions, FlatList } from "react-native";
import { TouchableOpacity } from "react-native";
import BarTapContent from "../../component/BarTapContent";

import BarTapStackHeader from "../../component/BarTapStackHeader";
import * as api from "../../service/BarApiService.js";
import { ThemeContext } from "../../theme/ThemeManager";
import { theme, mock } from "../../theme/variables.js";

export default function DrinkCategoriesScreen({ route, navigation }) {
  const { theme } = React.useContext(ThemeContext);
  const [categories, setCategories] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if(isLoading) {
      api
      .getCategories()
      .then((json) => {
        setCategories(json.sort(function (a, b) {
          return b.id < a.id;
        }),
      );
        setLoading(false);
      })
      .catch((error) => {
        alert(error)
        setLoading(false);
      });
    }
  }, [isLoading]);

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

  const handleOnPress = (navigation, category, billId, sessionId) => {
    navigation.navigate("Add Drink", {
      category,
      billId,
      sessionId,
    });
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: "column",
      backgroundColor: theme.BARTAP_BLACK,
      alignItems: "center",
      justifyContent: "flex-start",
    },
    content: {
      flex: 1,
      width: "100%",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: 10,
    },
    itemInvisible: {
      backgroundColor: "transparent",
    },
    category: {
      flex: 1,
      flexDirection: "column",
      backgroundColor: theme.BARTAP_WHITE,
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
      fontWeight: "bold",
      color: theme.BARTAP_BLACK,
    },
    categories: {
      marginVertical: 10,
      width: "100%",
    },
  });

  const categoryListItem = (navigation, category, billId, sessionId) => {
    return (
      <TouchableOpacity
        onPress={() => handleOnPress(navigation, category, billId, sessionId)}
      >
        <View style={styles.category}>
          <Text style={styles.category__name}>{category.name}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <BarTapContent navigation={navigation} title={"Add product"}>
      <View style={styles.categories}>
          <FlatList
            refreshControl={
              <RefreshControl onRefresh={() => setLoading(true)} refreshing={isLoading} tintColor="white" />
            }
            data={formatData(categories, 2)}
            renderItem={({ item }) => {
              if (item.empty === true) {
                return <View style={[styles.category, styles.itemInvisible]} />;
              } else {
                return categoryListItem(navigation, item, billId, sessionId)
              }
            }}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            columnWrapperStyle={styles.categories__row}
          />
        </View>
    </BarTapContent>
  );
}
