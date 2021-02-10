import React from "react";
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
  const { customer, sessionId } = route.params;
  const bill = api.getBillBySessionIdAndCustomerId(sessionId, customer.id);

  return (
    <SafeAreaView style={styles.container}>
      <StackHeaderLayout navigation={navigation} />
      <Text style={styles.title}>Bill {customer.name}</Text>
      <View style={styles.content}>
        <FlatList
          keyExtractor={(item) => item.id}
          style={styles.list}
          data={bill.orders}
          renderItem={({ item }) => listItem(item)}
          ListFooterComponent={footerListItem(bill)}
        />
      </View>
    </SafeAreaView>
  );
}

function listItem(order) {
  const timestamp = new Date(order.timestamp);
  return (
    <View style={styles.listItemOrder}>
      <Text style={styles.listItem__timestamp}>{timestamp.getHours()}:{timestamp.getMinutes()}</Text>
      <FlatList 
        keyExtractor={(item) => item.product.id}
        style={styles.list}
        data={order.orderlines}
        renderItem={({ item }) => orderLineListItem(item)}
        />
      
    </View>
  );
}

function orderLineListItem(orderLine) {
  return(
    <View style={styles.listItemOrderLine}>
      <Text style={styles.listItemOrderLine__name}>{orderLine.product.name}</Text>
      <Text style={styles.listItemOrderLine__amount}>{orderLine.amount} x</Text>
      <Text style={styles.listItemOrderLine__price}>€{orderLine.product.price.toFixed(2)}</Text>
    </View>
  );
}

function footerListItem(bill) {
  return (
    <View style={styles.listItem__footer}>
      <Text style={styles.listItem__timestamp}></Text>
      <Text style={styles.listItem__footer__text}>€{bill.totalPrice}</Text>
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
    alignItems: "center",
    justifyContent: "flex-start",
    height: "auto",
    backgroundColor: colors.BACKGROUND,
    borderBottomColor: colors.ELEMENT_BACKGROUND,
    borderBottomWidth: 2,
    width: "95%",
  },
  listItemOrderLine: {
    alignSelf: "center",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    height: 30,
    backgroundColor: colors.BACKGROUND,
    borderBottomWidth: 2,
    width: "95%",
  },
  listItem__name: {
    fontSize: 20,
    color: colors.TEXT_PRIMARY,
    marginRight: 10,
  },

  listItem__timestamp: {
    fontSize: 20,
    color: colors.TEXT_SECONDARY,
    marginRight: 10,
  },
  listItemOrderLine__name: {
    fontSize: 15,
    color: colors.TEXT_PRIMARY,
    marginRight: 10,
  },
  listItemOrderLine__amount: {
    fontSize: 15,
    color: colors.TEXT_SECONDARY,
    marginLeft: "auto",
  },
  listItemOrderLine__price: {
    fontSize: 15,
    color: colors.TEXT_SECONDARY,
    fontWeight: "bold",
    marginLeft: 10,
  },
  listItem__price: {
    fontSize: 20,
    color: colors.TEXT_PRIMARY,
    fontWeight: "bold",
    marginLeft: "auto",
  },
  listItem__footer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    color: colors.TEXT_PRIMARY,
  },
  listItem__footer__text: {
    marginLeft: "auto",
    color: colors.TEXT_PRIMARY,
    fontSize: 30,
    fontWeight: "bold",
  },
});
