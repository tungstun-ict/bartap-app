import React, { useEffect, useState } from "react";
import { Button, FlatList, Image, RefreshControl, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ceil } from "react-native-reanimated";

import BarTapListItem from "../../component/BarTapListItem/index.js";
import BarTapStackHeader from "../../component/BarTapStackHeader";
import BarTapTitle from "../../component/BarTapTitle/index.js";
import * as api from "../../service/BarApiService.js";
import variables, { colors, mock, sizes } from "../../theme/variables.js";

export default function AddDrinksScreen({ route, navigation }) {
  const [drinks, setDrinks] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const { category, billId, sessionId } = route.params;

  useEffect(() => {
    if (isLoading) {
      api
        .getDrinksByCategory(category.id)
        .then((json) => {
          setDrinks(json);
          setLoading(false);
        })
        .catch((error) => {
          alert(error);
          setLoading(false);
        });
    }
  }, [isLoading]);

  return (
    <SafeAreaView style={styles.container}>
      <BarTapStackHeader navigation={navigation} title="Add product" />
      <View style={styles.content}>
        <BarTapTitle text={category.name} level={1} />
        <FlatList
          refreshControl={
            <RefreshControl
              onRefresh={() => setLoading(true)}
              refreshing={isLoading}
              tintColor="white"
            />
          }
          keyExtractor={(item) => item.id.toString()}
          style={styles.list}
          data={drinks}
          renderItem={({ item }) =>
            listItem(navigation, item, billId, sessionId)
          }
        />
      </View>
    </SafeAreaView>
  );
}

function listItem(navigation, drink, billId, sessionId) {
  return (
    <BarTapListItem
      onPress={() => handlePress(navigation, drink, billId, sessionId)}
      name={`${drink.brand} ${drink.name}`}
      price={drink.price.toFixed(2)}
    />
  );
}

function handlePress(navigation, drink, billId, sessionId) {
  api
    .addDrink(billId, drink.id, sessionId)
    .catch((error) => alert(error))
    .then(() => {
      navigation.navigate("Session");
    });
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: colors.BARTAP_BLACK,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  content: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 10,
  },
  list: {
    flex: 1,
    flexDirection: "column",
    alignSelf: "center",
    width: "100%",
  },
});
