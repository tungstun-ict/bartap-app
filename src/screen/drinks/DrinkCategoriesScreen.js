import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import { colors, mock } from "../../theme/variables.js";
import StackHeaderLayout from "../../layout/StackHeaderLayout";
import { FlatList, Dimensions } from "react-native";
import { TouchableOpacity } from "react-native";
import * as api from "../../service/BarApiService.js";

export default function DrinkCategoriesScreen({ route, navigation }) {
  const [categories, setCategories ] = useState([])
  
  useEffect(()=> {
    api.getCategories()
    .then((json) => setCategories(json))
    .catch((error) => alert(error));;
  }, [])

  const { bill } = route.params;
  const customer = bill.customer;
  return (
    <SafeAreaView style={styles.container}>
      <StackHeaderLayout navigation={navigation} title="Add drink" />
      <View style={styles.content}>
        <View style={styles.categories}>
          <FlatList
            data={categories}
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
    height: Dimensions.get('window').height / 7 ,
    width: Dimensions.get('window').width / 2 -30,
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
