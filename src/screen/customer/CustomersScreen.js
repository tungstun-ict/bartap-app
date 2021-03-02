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
import variables, { colors, mock, sizes } from "../../theme/variables.js";
import HeaderLayout from "../../layout/HeaderLayout";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ceil } from "react-native-reanimated";

export default function CustomersScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <HeaderLayout navigation={navigation} />
      <Text style={styles.title}>Customers</Text>
      <View style={styles.content}>
        <FlatList
          keyExtractor={(item) => item.id.toString()}
          style={styles.list}
          data={mock.CUSTOMERS}
          renderItem={({ item }) => listItem(navigation, item)}
          ListFooterComponent={listFooterItem(navigation)}
        />
      </View>
    </SafeAreaView>
  );
}

function listItem(navigation, customer) {
  return (
    <TouchableOpacity onPress={() => navigation.navigate("Customer overview", customer.id)}>
      <View style={styles.listItem}>
        <Text style={styles.listItem__name}>{customer.name}</Text>
      </View>
    </TouchableOpacity>
  );
}

const listFooterItem = (navigation) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate("Add new customer", )}>
      <View style={styles.listItem__footer}>
        <Text style={styles.listItem__footer__text}>Add a new customer</Text>
      </View>
    </TouchableOpacity>
  );
};

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
    color: colors.TEXT_PRIMARY,
  },
  listItem__footer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    width: "95%",
    backgroundColor: colors.ELEMENT_BACKGROUND,
    borderRadius: 5,
    marginTop: 10,
    alignSelf: "center",
  },
  listItem__footer__text: {
    color: colors.TEXT_SECONDARY,
    fontSize: 20,
    fontWeight: "bold",
  },
});
