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
  RefreshControl,
} from "react-native";
import SwipeableFlatList from "react-native-swipeable-list";
import variables, { colors, mock, sizes } from "../../theme/variables.js";
import BarTapStackHeader from "../../component/BarTapStackHeader";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Alert } from "react-native";
import BarTapListItem from "../../component/BarTapListItem/index.js";
import BarTapTitle from "../../component/BarTapTitle/index.js";

export default function SessionBillScreen({ route, navigation }) {
  const { billId, sessionId } = route.params;
  const [bill, setBill] = useState({ customer: { name: "" }, totalPrice: 0 });
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setLoading(true);
      setBill({ customer: { name: "" }, totalPrice: 0 });
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

  const handleDeleteBill = () => {
    Alert.alert(
      "Are you sure?",
      "You are about to delete this bill. This process is not reversable",
      [
        {
          text: "Yes",
          onPress: () => {
            api
              .deleteBill(sessionId, billId)
              .finally(() => {
                navigation.goBack();
              })
              .catch((error) => {
                if (error.response.status === 409) {
                  alert(
                    "Session is locked. You must unlock first before editing anything.",
                  );
                } else {
                  alert(error);
                }
              });
          },
        },
        {
          text: "No",
          onPress: () => console.log("User canceled locking this session"),
          style: "cancel",
        },
      ],
      { cancelable: false },
    );
  };

  const swipeableView = (item) => {
    return (
      <View style={styles.qaContainer}>
        <View style={styles.qaButton}>
          <TouchableOpacity
            onPress={() => {
              api
                .deleteOrderFromBill(sessionId, billId, item.item.id)
                .finally(() => setLoading(true))
                .catch((error) => {
                  if (error.response.status === 409) {
                    alert(
                      "Session is locked. You must unlock first before editing anything.",
                    );
                  } else {
                    alert(error);
                  }
                });
            }}
          >
            <Text style={[styles.qaButton__text]}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <BarTapStackHeader navigation={navigation} title="Bill" />
      <View style={styles.content}>
        <View style={styles.header}>
          <BarTapTitle text={bill.customer.name} level={1} />
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => handleDeleteBill()}
          >
            <Image
              source={require("../../assets/trashbin.png")}
              style={styles.deleteButton__image}
              resizeMode={"contain"}
            />
          </TouchableOpacity>
        </View>
        <SwipeableFlatList
          keyExtractor={(item) => item.id.toString()}
          style={styles.list}
          data={bill.orders}
          renderItem={({ item }) => listItem(item)}
          refreshControl={
            <RefreshControl
              onRefresh={() => setLoading(true)}
              refreshing={isLoading}
              tintColor="white"
            />
          }
          refreshing={isLoading}
          onRefresh={() => setLoading(true)}
          maxSwipeDistance={88}
          renderQuickActions={(item) => swipeableView(item)}
          shouldBounceOnMount={true}
        />
        <View style={styles.listItem__footer}>
          <Text style={styles.listItem__footer__text}>Total:</Text>
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
    <BarTapListItem
      timestamp={timestamp}
      name={order.product.name}
      multiplier={order.amount}
      price={(order.product.price * order.amount).toFixed(2)}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: colors.BARTAP_BLACK,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  content: {
    flex: 1,
    width: "100%",
    height: "100%",
    paddingHorizontal: 10,
  },
  qaContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  qaButton: {
    width: 80,
    alignItems: "center",
    justifyContent: "center",
  },
  qaButton__text: {
    fontWeight: "bold",
    color: "red",
  },
  list: {
    flex: 4,
    flexDirection: "column",
    alignSelf: "center",
    width: "100%",
    height: "100%",
  },
  deleteButton: {
    marginLeft: "auto",
  },
  deleteButton__image: {
    height: 30,
    width: 25,
    tintColor: "white",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    maxHeight: 60,
    flex: 1,
  },
  listItem__footer: {
    zIndex: 5,
    height: "auto",
    flexDirection: "row",
    alignItems: "center",
    color: colors.BARTAP_WHITE,
    marginBottom: 10,
    marginHorizontal: 10,
    backgroundColor: colors.BARTAP_DARK_GREY,
    borderRadius: 5,
  },
  listItem__footer__text__price: {
    marginLeft: "auto",
    color: colors.BARTAP_WHITE,
    fontSize: 30,
    alignSelf: "center",
    height: "auto",
    margin: 10,
    fontWeight: "bold",
  },
  listItem__footer__text: {
    margin: 10,
    color: colors.BARTAP_WHITE,
    fontSize: 30,
    alignSelf: "center",
    height: "auto",
    fontWeight: "bold",
  },
});
