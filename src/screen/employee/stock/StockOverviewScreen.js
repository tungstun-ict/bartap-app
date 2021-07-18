import React, { useEffect, useState } from "react";
import { FlatList, RefreshControl, SafeAreaView } from "react-native";
import { Image, Modal, StyleSheet, Text, View } from "react-native";
import { Button, TouchableOpacity } from "react-native";
import QRCode from "react-native-qrcode-svg";

import BarTapButton from "../../../component/BarTapButton/index.js";
import BarTapContent from "../../../component/BarTapContent/index.js";
import BarTapHeader from "../../../component/BarTapHeader";
import BarTapListItem from "../../../component/BarTapListItem/index.js";
import BarTapStackHeader from "../../../component/BarTapStackHeader";
import BarTapTitle from "../../../component/BarTapTitle/index.js";
import * as api from "../../../service/BarApiService.js";
import * as Utils from "../../../service/Utils.js";
import { ThemeContext } from "../../../theme/ThemeManager.js";
import variables, { colors, mock, theme } from "../../../theme/variables.js";

export default function StockOverviewScreen({ navigation }) {
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
          json.sort((a, b) => Utils.sortListItemString(a.name, b.name));
          setCategories(json);
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
      flexDirection: "row",
      marginTop: 10,
      justifyContent: "space-between",
      width: "100%",
    },
    button: {
      flex: 0.485,
      alignSelf: "center",
      marginVertical: 5,
    },
    list: {
      flexDirection: "column",
      alignSelf: "center",
      width: "105%",
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
            tintColor={theme.LOADING_INDICATOR}
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
