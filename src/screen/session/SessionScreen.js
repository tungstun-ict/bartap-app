import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native";
import { StyleSheet, Text, View, Image } from "react-native";
import * as api from "../../service/BarApiService.js";
import variables, { colors, mock } from "../../theme/variables.js";
import { Button, Dimensions, ActivityIndicator } from "react-native";
import HeaderLayout from "../../layout/HeaderLayout";
import BottomBarLayout from "../../layout/SessionBottomBarLayout";
import { FlatList } from "react-native";
import { TouchableOpacity } from "react-native";

export default function SessionScreen({ route, navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [session, setSession] = useState({});

  useEffect(() => {
    if (route.params !== null) {
      console.log("GREAT PARTY")
      api
        .getCurrentSession()
        .then((response) => response.json())
        .then((json) => {setSession(json);setLoading(false);})
        .catch((error) => {alert(error); setLoading(false)});
    } else {
      api
        .getSessionById(route.params.sessionId)
        .then((response) => response.json())
        .then((json) => {setSession(json);setLoading(false);})
        .catch((error) => alert(error));
    }
  }, [isLoading]);

  return (
    <SafeAreaView style={styles.container}>
      <HeaderLayout navigation={navigation} />
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <View style={styles.session}>
          <Text style={styles.session__title}>{session.name}</Text>
          <View style={styles.session__customers}>
            <FlatList
              style={styles.list}
              data={session.bills}
              renderItem={({ item }) =>
                customerListItem(navigation, item, session.id)
              }
              keyExtractor={(item) => item.id.toString()}
              numColumns={2}
              columnWrapperStyle={styles.customers__row}
              refreshing={isLoading}
              onRefresh={() => setLoading(true)}
            />
          </View>
        </View>
      )}
      <BottomBarLayout sessionId={session.id}></BottomBarLayout>
    </SafeAreaView>
  );
}

function customerListItem(navigation, bill, sessionId) {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Drink Categories", {bill, sessionId})}
      onLongPress={() =>
        navigation.navigate("Session Bill", { bill, sessionId })
      }
    >
      <View style={styles.customer}>
        <Text style={styles.customer__name}>{bill.customer.name}</Text>
        <Text style={styles.customer__total}>
          €{bill.totalPrice.toFixed(2)}
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
  list: {
    height: "100%",
  },
  customer: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: colors.ELEMENT_BACKGROUND_LIGHT,
    marginVertical: 10,
    height: Dimensions.get("window").height / 7,
    width: Dimensions.get("window").width / 2 - 30,
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
  addCustomer: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: colors.ELEMENT_BACKGROUND_SELECTED,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    height: 50,
    borderRadius: 5,
  },
  addCustomer__text: {
    fontSize: 30,
  },
});
