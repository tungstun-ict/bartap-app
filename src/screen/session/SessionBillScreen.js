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
} from "react-native";
import variables, { colors, mock, sizes } from "../../theme/variables.js";
import StackHeaderLayout from "../../layout/StackHeaderLayout";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function SessionBillScreen({ route, navigation }) {
  const { billId, sessionId } = route.params;
  const [bill, setBill] = useState({"customer": {"name": ""}, "totalPrice": 0});
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setLoading(true);
      setBill({"customer": {"name": ""}, "totalPrice": 0});
    });
    return unsubscribe;
  });

  useEffect(() => {
    if (route.params !== null && isLoading) {
      api
        .getBillByBillIdAndSessionId(billId, sessionId)
        .then((json) => {
          setBill(json);
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
      console.log(bill);
    }
  }, [isLoading]);

  return (
    <SafeAreaView style={styles.container}>
      <StackHeaderLayout navigation={navigation} />
          <Text style={styles.title}>Bill {bill.customer.name}</Text>
          <View style={styles.content}>
            <FlatList
              keyExtractor={(item) => item.id.toString()}
              style={styles.list}
              data={bill.orders}
              renderItem={({ item }) => listItem(item)}
              //ListFooterComponent={footerListItem(bill)}
              refreshing={isLoading}
              onRefresh={() => setLoading(true)}
            />
            <View style={styles.listItem__footer}>
            <Text style={styles.listItem__footer__text}>
                Total:
              </Text>
              <Text style={styles.listItem__footer__text__price}>
                €{bill.totalPrice.toFixed(2)}
              </Text>
              
            </View>
          </View>
    </SafeAreaView>
  );
}

function listItem(order) {
  const timestamp = new Date(order.creationDate);
  return (
    <View style={styles.listItemOrder}>
      <Text style={styles.listItem__timestamp}>
        {timestamp.getHours() < 10
          ? "0" + timestamp.getHours()
          : timestamp.getHours()}
        :
        {timestamp.getMinutes() < 10
          ? "0" + timestamp.getMinutes()
          : timestamp.getMinutes()}
      </Text>
      <Text style={styles.listItemOrderLine__name}>{order.product.name}</Text>
      <Text style={styles.listItemOrderLine__amount}>{order.amount} x</Text>
      <Text style={styles.listItemOrderLine__price}>
        €{(order.product.price * order.amount).toFixed(2)}
      </Text>
    </View>
  );
}

function footerListItem(bill) {
  return (
    <View style={styles.listItem__footer}>
      <Text style={styles.listItem__timestamp}></Text>
      <Text style={styles.listItem__footer__text}>
        €{bill.totalPrice.toFixed(2)}
      </Text>
    </View>
  );
}

function handlePress(navigation, drink, customer) {
  api.addDrink(customer, drink);

  navigation.navigate("Current Session");
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
  },
  title: {
    height: 40,
    margin: 10,
    color: colors.TEXT_PRIMARY,
    fontSize: sizes.TITLE,
    fontWeight: "bold",
  },
  text: {
    color: colors.TEXT_TERTIARY,
    fontSize: 50,
    fontWeight: "bold",
  },
  list: {
    flex: 4,
    flexDirection: "column",
    alignSelf: "center",
    width: "100%",
    height: "100%",
  },
  listItem: {
    alignSelf: "center",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    height: 50,
    backgroundColor: colors.BACKGROUND,
    borderBottomColor: colors.ELEMENT_BACKGROUND,
    borderBottomWidth: 2,
    width: "95%",
  },
  listItemOrder: {
    alignSelf: "center",
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    backgroundColor: colors.BACKGROUND,
    borderBottomColor: colors.ELEMENT_BACKGROUND,
    borderBottomWidth: 2,
    width: "95%",
    height: 50,
  },
  listItemOrderLine: {
    alignSelf: "center",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    backgroundColor: colors.BACKGROUND,
    borderBottomWidth: 2,
    width: "95%",
  },
  listItem__name: {
    fontSize: 20,
    color: colors.TEXT_PRIMARY,
    alignSelf: "center",
    marginRight: 10,
  },
  listItem__timestamp: {
    fontSize: 20,
    color: colors.TEXT_SECONDARY,
    alignSelf: "center",
    marginRight: 10,
  },
  listItemOrderLine__name: {
    fontSize: 15,
    color: colors.TEXT_PRIMARY,
    alignSelf: "center",
    marginRight: 10,
  },
  listItemOrderLine__amount: {
    fontSize: 15,
    color: colors.TEXT_SECONDARY,
    alignSelf: "center",
    marginLeft: "auto",
  },
  listItemOrderLine__price: {
    fontSize: 15,
    color: colors.TEXT_SECONDARY,
    fontWeight: "bold",
    alignSelf: "center",
    marginLeft: 10,
  },
  listItem__price: {
    fontSize: 20,
    color: colors.TEXT_PRIMARY,
    fontWeight: "bold",
    marginLeft: "auto",
  },
  listItem__footer: {
    zIndex: 5,
    height: "auto",
    flexDirection: "row",
    alignItems: "center",
    color: colors.TEXT_PRIMARY,
  },
  listItem__footer__text__price: {
    marginLeft: "auto",
    color: colors.TEXT_PRIMARY,
    fontSize: 30,
    alignSelf: "center",
    height: "auto",
    fontWeight: "bold",
  },
  listItem__footer__text: {
    marginLeft: 10,
    color: colors.TEXT_PRIMARY,
    fontSize: 30,
    alignSelf: "center",
    height: "auto",
    fontWeight: "bold",
  },
});
