import React, { useEffect, useState } from "react";
import { RefreshControl, SafeAreaView } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import { colors, mock } from "../../theme/variables.js";
import StackHeaderLayout from "../../layout/StackHeaderLayout";
import { FlatList, Dimensions } from "react-native";
import { TouchableOpacity } from "react-native";
import * as api from "../../service/BarApiService.js";

export default function DrinkCategoriesScreen({ route, navigation }) {
  const [categories, setCategories] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    api
      .getCategories()
      .then((json) => {
        setCategories(json);
        setLoading(false);
      })
      .catch((error) => {
        alert(error)
        setLoading(false);
      });
  }, []);

  const { billId, sessionId } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <StackHeaderLayout navigation={navigation} title="Add drink" />
      <View style={styles.content}>
        <View style={styles.categories}>
          <FlatList
            refreshControl={
              <RefreshControl onRefresh={() => setLoading(true)} refreshing={isLoading} tintColor="white" />
            }
            data={categories}
            renderItem={({ item }) =>
              categoryListItem(navigation, item, billId, sessionId)
            }
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
    backgroundColor: colors.BACKGROUND,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  content: {
    flex: 1,
    width: "100%",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 10,
  },
  category: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: colors.ELEMENT_BACKGROUND_LIGHT,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    height: Dimensions.get("window").height / 7,
    width: Dimensions.get("window").width / 2 - 30,
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
