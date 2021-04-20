import React, { useEffect, useState } from "react";
import * as api from "../../service/BarApiService.js";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  FlatList,
  RefreshControl,
} from "react-native";
import variables, { colors, mock, sizes } from "../../theme/variables.js";
import BarTapStackHeader from "../../component/BarTapStackHeader";
import { TouchableOpacity } from "react-native-gesture-handler";
import BarTapButton from "../../component/BarTapButton/index.js";
import BarTapListItem from "../../component/BarTapListItem/index.js";
import BarTapTitle from "../../component/BarTapTitle/index.js";

export default function CategoryOverviewScreen({ route, navigation }) {
  const [drinks, setDrinks] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const category = route.params;

  useEffect(() => {
    if (isLoading) {
      api
        .getDrinksByCategory(category.id)
        .then((json) => {
          setDrinks(
            json.sort(function (a, b) {
              return a.id - b.id;
            }),
          );
          setLoading(false);
        })
        .catch((error) => {
          alert(error);
          setLoading(false);
        });
    }
  }, [isLoading]);

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
    <SafeAreaView style={styles.container}>
      <BarTapStackHeader navigation={navigation} />
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
          renderItem={(item) => listItem(item.item)}
        />
        <BarTapButton
          onPress={() => navigation.navigate("Edit Category", category.id)}
          text={"Edit"}
        />
      </View>
    </SafeAreaView>
  );
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
