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
import BarTapButton from "../../component/BarTapButton/index.js";
import BarTapListItem from "../../component/BarTapListItem/index.js";

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
      <BarTapListItem
        onPress={() => {
          navigation.navigate("Category Overview", category);
        }}
        name={category.name}
      />
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
          <BarTapButton
            onPress={() => navigation.navigate("Add Category")}
            text={"New Category"}
            style={styles.button}
          />
          <BarTapButton
            onPress={() => navigation.navigate("Add Product")}
            text={"New Product"}
            style={styles.button}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: colors.BARTAP_BLACK,
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
    backgroundColor: colors.BARTAP_BLACK,
  },
  bottomButtons: {
    flexDirection: "column",
    marginTop: 10,
  },
  button: {
    width: "50%",
    alignSelf: "center",
    marginVertical: 5,
  },
  information: {
    backgroundColor: colors.BARTAP_DARK_GREY,
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
    paddingHorizontal: 10,
  },
  title: {
    color: colors.BARTAP_WHITE,
    fontWeight: "bold",
    alignSelf: "flex-start",
    marginHorizontal: 10,
    marginTop: 10,
    fontSize: 25,
  },
  name: {
    color: colors.BARTAP_WHITE,
    textAlign: "left",
    fontSize: 15,
    fontWeight: "normal",
  },
  attribute: {
    color: colors.BARTAP_WHITE,
    textAlign: "right",
    fontSize: 15,
    fontWeight: "normal",
  },
});
