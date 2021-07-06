import React, { useState, useEffect } from "react";
import { FlatList, RefreshControl, SafeAreaView } from "react-native";
import * as api from "../../service/BarApiService.js";
import { StyleSheet, Text, View, Image, Modal } from "react-native";
import variables, { theme, mock } from "../../theme/variables.js";
import { Button, TouchableOpacity } from "react-native";
import BarTapStackHeader from "../../component/BarTapStackHeader";
import QRCode from "react-native-qrcode-svg";
import BarTapHeader from "../../component/BarTapHeader";
import SearchBar from "react-native-elements/dist/searchbar/SearchBar-ios";
import BarTapButton from "../../component/BarTapButton/index.js";
import BarTapListItem from "../../component/BarTapListItem/index.js";
import BarTapTitle from "../../component/BarTapTitle/index.js";
import BarTapContent from "../../component/BarTapContent/index.js";
import { ThemeContext } from "../../theme/ThemeManager.js";

export default function StockOverviewScreen({ route, navigation }) {
  const { theme } = React.useContext(ThemeContext);
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

  const styles = StyleSheet.create({
    bottomButtons: {
      flexDirection: "column",
      marginTop: 10,
    },
    button: {
      width: "50%",
      alignSelf: "center",
      marginVertical: 5,
    },
    list: {
      flexDirection: "column",
      alignSelf: "center",
      width: "100%",
    },
  });

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
    <BarTapContent navigation={navigation}>
      <BarTapTitle text={"Categories"} level={1} />
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
    </BarTapContent>
  );
}
