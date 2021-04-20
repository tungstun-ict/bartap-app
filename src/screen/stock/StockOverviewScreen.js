import React, { useState, useEffect } from "react";
import { FlatList, RefreshControl, SafeAreaView } from "react-native";
import * as api from "../../service/BarApiService.js";
import { StyleSheet, Text, View, Image, Modal } from "react-native";
import variables, { colors, mock } from "../../theme/variables.js";
import { Button, TouchableOpacity } from "react-native";
import BarTapStackHeader from "../../component/BarTapStackHeader";
import QRCode from "react-native-qrcode-svg";
import BarTapHeader from "../../component/BarTapHeader";
import SearchBar from "react-native-elements/dist/searchbar/SearchBar-ios";

export default function StockOverviewScreen({ route, navigation }) {
  const [categories, setCategories] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setLoading(true);
    });
    return unsubscribe;
  });

  useEffect(() => {
    if (isLoading) {
      api
        .getCategories()
        .then((json) => {
          setCategories(
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

  const listItem = (category) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Category Overview", category);
        }}
      >
        <View style={styles.listItem}>
          <Text style={styles.listItem__name}>{category.name}</Text>
          {/* <Text style={styles.listItem__price}>
            €{category.price.toFixed(2)}
          </Text> */}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <BarTapHeader navigation={navigation} title="Stock" />
      <View style={styles.content}>
        <Text style={styles.title}>Categories</Text>
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
          data={categories}
          renderItem={(item) => listItem(item.item)}
          refreshing={isLoading}
          onRefresh={() => setLoading(true)}
        />
        <View style={styles.bottomButtons}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Add Category")}
            style={styles.button__wrapper}
          >
            <View style={styles.button}>
              <Text style={styles.button__text}>New category</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Add Product")}
            style={styles.button__wrapper}
          >
            <View style={styles.button}>
              <Text style={styles.button__text}>New product</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: colors.BACKGROUND,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
  },
  list: {
    flexDirection: "column",
    alignSelf: "center",
    width: "100%",
  },
  searchBar: {
    backgroundColor: colors.BACKGROUND,
  },
  bottomButtons: {
    flexDirection: "row",
    marginTop: 10,
  },
  button: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.TEXT_PRIMARY,
    borderRadius: 5,
    width: "100%",
    alignSelf: "center",
  },
  button__wrapper: {
    backgroundColor: colors.ELEMENT_BACKGROUND,
    marginHorizontal: 10,
    flex: 1,
    minHeight: 50,
    marginBottom: 10,
  },
  button__text: {
    color: colors.TEXT_SECONDARY,
    fontSize: 20,
    fontWeight: "bold",
  },
  information: {
    backgroundColor: colors.ELEMENT_BACKGROUND,
    padding: 20,
    borderRadius: 5,
    marginTop: 10,
    width: "95%",
  },
  table: {
    flexDirection: "row",
  },
  column: {
    flex: 1,
  },
  list: {
    flexDirection: "column",
    alignSelf: "center",
    width: "100%",
  },
  listItem: {
    alignSelf: "center",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    backgroundColor: colors.BACKGROUND,
    borderBottomColor: colors.ELEMENT_BACKGROUND,
    borderBottomWidth: 2,
    width: "95%",
  },
  listItem__name: {
    fontSize: 20,
    color: colors.TEXT_PRIMARY,
  },
  listItem__price: {
    fontSize: 20,
    marginLeft: "auto",
    textAlign: "right",
    color: colors.TEXT_PRIMARY,
  },
  title: {
    color: colors.TEXT_PRIMARY,
    fontWeight: "bold",
    alignSelf: "flex-start",
    marginHorizontal: 10,
    marginTop: 10,
    fontSize: 25,
  },
  name: {
    color: colors.TEXT_PRIMARY,
    textAlign: "left",
    fontSize: 15,
    fontWeight: "normal",
  },
  attribute: {
    color: colors.TEXT_PRIMARY,
    textAlign: "right",
    fontSize: 15,
    fontWeight: "normal",
  },
});
