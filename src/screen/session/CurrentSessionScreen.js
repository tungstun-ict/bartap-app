import React from "react";
import { SafeAreaView } from "react-native";
import { StyleSheet, Text, View, Image } from "react-native";
import * as api from "../../service/BarApiService.js";
import variables, { colors, mock } from "../../theme/variables.js";
import { Button } from "react-native";
import HeaderLayout from "../../layout/HeaderLayout";
import BottomBarLayout from "../../layout/CurrentSessionBottomBarLayout";
import { FlatList } from "react-native";
import { TouchableOpacity } from "react-native";

export default function CurrentSessionScreen({ navigation }) {
  const session = api.getCurrentSession();
  return (
    <SafeAreaView style={styles.container}>
      <HeaderLayout navigation={navigation} />
      <View style={styles.session}>
        <Text style={styles.session__title}>{session.name}</Text>
        <View style={styles.session__customers}>
          <FlatList
            //Connect to API
            data={session.customers}
            renderItem={({ item }) => customerListItem(navigation, item, session.id)}
            keyExtractor={(item) => item.id}
            numColumns={2}
            columnWrapperStyle={styles.customers__row}
          />
        </View>
      </View>
      <BottomBarLayout></BottomBarLayout>
    </SafeAreaView>
  );
}

function customerListItem(navigation, customer, sessionId) {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Drink Categories", { customer })}
      onLongPress={() => navigation.navigate("Session Bill", { customer, sessionId })}
    >
      <View style={styles.customer}>
        <Text style={styles.customer__name}>{customer.name}</Text>
        <Text style={styles.customer__total}>
          €{customer.currentBill.total.toFixed(2)}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: colors.BACKGROUND,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  session: {
    flex: 1,
    width: "100%",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    padding: 10,
  },
  session__customers: {
    marginVertical: 10,
    width: "100%",
  },
  customers__row: {
    flex: 1,
    justifyContent: "space-around",
  },
  session__title: {
    color: colors.TEXT_PRIMARY,
    fontSize: 25,
    fontWeight: "bold",
  },
  text: {
    color: colors.TEXT_TERTIARY,
    fontSize: 50,
    fontWeight: "bold",
  },
  customer: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: colors.ELEMENT_BACKGROUND_LIGHT,
    marginVertical: 10,
    height: 100,
    width: 150,
    borderRadius: 5,
  },
  customer__name: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 5,
  },
  customer__total: {
    width: "100%",
    fontWeight: "bold",
    fontSize: 35,
    marginTop: "auto",
    textAlign: "right",
    paddingRight: 10,
  },
});
