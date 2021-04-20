import React, { useEffect, useState } from "react";
import { RefreshControl, SafeAreaView } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import { colors, mock } from "../../theme/variables.js";
import BarTapStackHeader from "../../component/BarTapStackHeader";
import { FlatList, Dimensions } from "react-native";
import { TouchableOpacity } from "react-native";
import * as api from "../../service/BarApiService.js";

export default function DrinkCategoriesScreen({ route, navigation }) {
  const [categories, setCategories] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if(isLoading) {
      api
      .getCategories()
      .then((json) => {
        console.log(json[0])
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

  return (
    <SafeAreaView style={styles.container}>
      <BarTapStackHeader navigation={navigation} title="Add product" />
      <View style={styles.content}>
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
      </View>
    </SafeAreaView>
  );
}

function categoryListItem(navigation, category, billId, sessionId) {
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

function handleOnPress(navigation, category, billId, sessionId) {
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
    backgroundColor: colors.BARTAP_BLACK,
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
    backgroundColor: colors.BARTAP_WHITE,
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
  },
  categories: {
    marginVertical: 10,
    width: "100%",
  },
});
