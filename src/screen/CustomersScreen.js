import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  FlatList,
} from "react-native";
import variables, { colors, mock, sizes } from "../theme/variables.js";
import HeaderLayout from "../layout/HeaderLayout";

export default function HomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <HeaderLayout navigation={navigation}></HeaderLayout>
      <Text style={styles.title}>Customers</Text>
      <View style={styles.content}>
        <FlatList
          keyExtractor={(item) => item.id}
          style={styles.list}
          data={mock.CUSTOMERS}
          renderItem={({ item }) => renderItem(item)}
        />
      </View>
    </SafeAreaView>
  );
}

function renderItem(customer) {
  console.log(customer);
  return (
    <View style={styles.listItem}>
      <Text style={styles.listItem__name}>{customer.name}</Text>
    </View>
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
  },
  title: {
    height: 40,
    margin: 10,
    color: colors.TEXT_PRIMARY,
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
    height: 50,
    backgroundColor: colors.BACKGROUND,
    borderBottomColor: colors.ELEMENT_BACKGROUND,
    borderBottomWidth: 2,
    width: "95%",
  },
  listItem__name: {
    fontSize: 20,
    color: colors.TEXT_SECONDARY,
  },
});
