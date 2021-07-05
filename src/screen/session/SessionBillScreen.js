import React, { useEffect, useState } from "react";
import { Button, FlatList, Image, RefreshControl, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Alert } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import SwipeableFlatList from "react-native-swipeable-list";

import BarTapButton from "../../component/BarTapButton/index.js";
import BarTapListItem from "../../component/BarTapListItem/index.js";
import BarTapStackHeader from "../../component/BarTapStackHeader";
import BarTapTitle from "../../component/BarTapTitle/index.js";
import * as api from "../../service/BarApiService.js";
import variables, { colors, mock, sizes } from "../../theme/variables.js";

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
    }
  }, [isLoading]);

  const payBill = () => {
    api
      .payBill(sessionId, billId)
      .then(() => setLoading(true))
      .catch(() => alert("Could not pay bill."));
  };

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
              .then(() => {
                navigation.goBack();
              })
              .catch((error) => {
                if (error.response.status === 409) {
                  console.error("Something went wrong")
                } else {
                  alert(error);
                }
              });
          },
        },
        {
          text: "No",
          onPress: () => console.log("User canceled deleting this bill"),
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
                .then(() => setLoading(true))
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
        <View style={styles.footer}>
          {bill.payed && (
            <Image
              style={styles.footerCheck}
              source={require("../../assets/check.png")}
            />
          )}
          {!bill.payed && (
            <BarTapButton
              style={styles.footerButton}
              text={"Confirm payment"}
              onPress={payBill}
            />
          )}
          <View style={styles.footerText}>
            <Text style={styles.footerTotal}>Total:</Text>
            <Text style={styles.footerPrice}>
              €{bill.totalPrice.toFixed(2)}
            </Text>
          </View>
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
  footer: {
    zIndex: 5,
    height: "auto",
    flexDirection: "column",
    alignItems: "center",
    color: colors.BARTAP_WHITE,
    marginBottom: 10,
    marginHorizontal: 10,
    padding: 10,
    backgroundColor: colors.BARTAP_DARK_GREY,
    borderRadius: 5,
  },
  footerText: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  footerPrice: {
    marginLeft: "auto",
    color: colors.BARTAP_WHITE,
    fontSize: 30,
    alignSelf: "center",
    height: "auto",
    fontWeight: "bold",
  },
  footerTotal: {
    color: colors.BARTAP_WHITE,
    fontSize: 30,
    alignSelf: "center",
    height: "auto",
    fontWeight: "bold",
  },
  footerCheck: {
    marginTop: 20,
    height: 70,
    width: 70,
  },
  footerButton: {
    marginBottom: 10,
  },
});
