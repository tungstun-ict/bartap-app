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

export default function CategoryOverviewScreen({ route, navigation }) {
  const [drinks, setDrinks] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const category = route.params;

  useEffect(() => {
    if (isLoading) {
      api
        .getDrinksByCategory(category.id)
        .then((json) => {
          setDrinks(json.sort(function(a, b) {
            return a.id - b.id;
        }));
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
      <TouchableOpacity
        onPress={() => {navigation.navigate("Edit Product", drink.id)}}>
        <View style={styles.listItem}>
          <Text style={styles.listItem__name}>
            {drink.brand} {drink.name}
          </Text>
          <Text style={styles.listItem__price}>€{drink.price.toFixed(2)}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <BarTapStackHeader navigation={navigation} />
      <Text style={styles.title}>{category.name}</Text>
      <View style={styles.content}>
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
          text={"Edit"}/>
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
  title: {
    height: 40,
    margin: 10,
    color: colors.BARTAP_WHITE,
    fontSize: sizes.TITLE,
    fontWeight: "bold",
  },
  list: {
    flex: 1,
    flexDirection: "column",
    alignSelf: "center",
    width: "100%",
  },
  listItem: {
    alignSelf: "center",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: colors.BARTAP_BLACK,
    borderBottomColor: colors.BARTAP_DARK_GREY,
    borderBottomWidth: 2,
    paddingVertical: 10,
    width: "100%",
  },
  listItem__name: {
    fontSize: 20,
    color: colors.BARTAP_WHITE,
    width: "80%",
  },
  listItem__price: {
    fontSize: 20,
    color: colors.BARTAP_WHITE,
    fontWeight: "bold",
    marginLeft: "auto",
  },
  listItem__footer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    width: "100%",
    backgroundColor: colors.BARTAP_DARK_GREY,
    borderRadius: 5,
    marginTop: 10,
    alignSelf: "center",
  },
  listItem__footer__text: {
    color: colors.BARTAP_LIGHT_GREY,
    fontSize: 20,
    fontWeight: "bold",
  },
});
