import React, { useState, useEffect } from "react";
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
import HeaderLayout from "../../layout/HeaderLayout";
import * as api from "../../service/BarApiService.js";
import * as storage from "../../service/BarStorageService.js";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ceil } from "react-native-reanimated";
import SwipeableFlatList from "react-native-swipeable-list";

export default function CustomersScreen({ navigation }) {
  const [customers, setCustomers] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setLoading(true);
      setCustomers([]);
    });
    return unsubscribe;
  });

  useEffect(() => {
    if(isLoading) {
      api
      .getAllCustomersByBarId()
      .then((json) => {
        setCustomers(json);
        setLoading(false);
      })
      .catch((error) => {
        alert(error);
        setLoading(false);
      });
    }
  }, [isLoading]);

  const listItem = (customer) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("Customer overview", customer.id)}
      >
        <View style={styles.listItem}>
          <Text style={styles.listItem__name}>{customer.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderLayout navigation={navigation} />
      <Text style={styles.title}>Customers</Text>
      <View style={styles.content}>
        <FlatList
          refreshControl={
            <RefreshControl onRefresh={() => setLoading(true)} refreshing={isLoading} tintColor="white" />
          }
          keyExtractor={(item) => item.id.toString()}
          style={styles.list}
          data={customers}
          renderItem={(item) => listItem(item.item)}
          refreshing={isLoading}
          onRefresh={() => setLoading(true)}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate("Add new customer")}
          style={styles.button__wrapper}
        >
          <View style={styles.button}>
            <Text style={styles.button__text}>Add a new customer</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: colors.BACKGROUND,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  content: {
    flex: 1,
    width: "100%",
    height: "100%",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  title: {
    height: 40,
    margin: 10,
    color: colors.TEXT_PRIMARY,
    fontSize: sizes.TITLE,
    fontWeight: "bold",
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
  button: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "95%",
    backgroundColor: colors.TEXT_PRIMARY,
    borderRadius: 5,
    marginTop: 0,
    alignSelf: "center",
  },
  button__wrapper: {
    flex: 1,
    maxHeight: 40,
    minWidth: "100%",
    marginVertical: 10,
  },
  button__text: {
    color: colors.TEXT_SECONDARY,
    fontSize: 20,
    fontWeight: "bold",
  },
});
