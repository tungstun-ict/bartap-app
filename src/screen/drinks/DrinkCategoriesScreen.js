import React from "react";
import { SafeAreaView } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import { colors, mock } from "../../theme/variables.js";
import StackHeaderLayout from "../../layout/StackHeaderLayout";
import { FlatList } from "react-native";
import { TouchableOpacity } from "react-native";

export default function DrinkCategoriesScreen({ route, navigation }) {
  const { customer } = route.params;
  return (
    <SafeAreaView style={styles.container}>
      <StackHeaderLayout navigation={navigation} title="Add drink" />
      <View style={styles.content}>
        <View style={styles.categories}>
          <FlatList
            //Connect to API
            data={mock.DRINKS_CATEGORIES}
            renderItem={({ item }) => categoryListItem(navigation, customer, item)}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            columnWrapperStyle={styles.categories__row}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

function categoryListItem(navigation, customer, category) {
  return (
    <TouchableOpacity
      onPress={() => handleOnPress(navigation, customer, category)}
    >
      <View style={styles.category}>
        <Text style={styles.category__name}>{category.name}</Text>
      </View>
    </TouchableOpacity>
  );
}

function handleOnPress(navigation, customer, category) {
  navigation.navigate("Add Drink", {
    customer,
    category
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
    height: 100,
    width: 150,
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
