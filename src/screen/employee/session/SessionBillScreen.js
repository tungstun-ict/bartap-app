import React, { useEffect, useState } from "react";
import { Image, RefreshControl, StyleSheet, Text, View } from "react-native";
import { Alert } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Snackbar from 'react-native-snackbar';
import SwipeableFlatList from "react-native-swipeable-list";

import BarTapButton from "../../../component/BarTapButton/index.js";
import BarTapContent from "../../../component/BarTapContent/index.js";
import BarTapListItem from "../../../component/BarTapListItem/index.js";
import BarTapTitle from "../../../component/BarTapTitle/index.js";
import * as api from "../../../service/BarApiService.js";
import { ThemeContext } from "../../../theme/ThemeManager.js";

export default function SessionBillScreen({ route, navigation }) {
  const { theme } = React.useContext(ThemeContext);

  const { billId, sessionId } = route.params;
  const [bill, setBill] = useState({ customer: { name: "" }, totalPrice: 0 });
  const [orders, setOrders] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setLoading(true);
    });
    return unsubscribe;
  });

  useEffect(() => {
    if (route.params !== null && isLoading) {
      api
        .getBillByBillIdAndSessionId(billId, sessionId)
        .then((json) => {
          json.orders.sort(function (a, b) {
            return new Date(a.timestamp) - new Date(b.timestamp);
          });
          setBill(json);
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });

        api.getOrdersByBillId(sessionId, billId)
        .then((json) => {
          json.sort(function (a, b) {
            return new Date(a.timestamp) - new Date(b.timestamp);
          });
          setOrders(json);
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setOrders(bill.orders)
          setLoading(false);
        });
    }
  }, [isLoading, bill.orders]);

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
                  console.error("Something went wrong");
                } else {
                  Snackbar.show({text: error.message, duration: Snackbar.LENGTH_SHORT});
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

  const styles = StyleSheet.create({
    qaContainer: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "flex-end",
    },
    qaButton: {
      width: 70,
      alignItems: "center",
      justifyContent: "center",
    },
    qaButton__text__delete: {
      fontFamily: theme.FONT_MEDIUM,
      color: theme.BACKGROUND_WARNING,
    },
    qaButton__text__info: {
      fontFamily: theme.FONT_MEDIUM,
      color: theme.TEXT_PRIMARY,
    },
    list: {
      flex: 4,
      flexDirection: "column",
      alignSelf: "center",
      width: "105%",
      height: "100%",
    },
    deleteButton: {
      marginLeft: "auto",
    },
    deleteButton__image: {
      height: 30,
      width: 25,
      tintColor: theme.BACKGROUND_IMAGE,
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
      color: theme.TEXT_PRIMARY,
      marginBottom: 10,
      marginHorizontal: 10,
      padding: 10,
      backgroundColor: theme.BACKGROUND_SECONDARY,
      borderRadius: 5,
    },
    footerText: {
      flexDirection: "row",
      justifyContent: "space-between",
      width: "100%",
    },
    footerPrice: {
      marginLeft: "auto",
      color: theme.TEXT_SECONDARY,
      fontSize: 30,
      alignSelf: "center",
      height: "auto",
      fontFamily: theme.FONT_MEDIUM,
    },
    footerTotal: {
      color: theme.TEXT_SECONDARY,
      fontSize: 30,
      alignSelf: "center",
      height: "auto",
      fontFamily: theme.FONT_MEDIUM,
    },
    footerCheck: {
      marginTop: 20,
      height: 70,
      width: 70,
      tintColor: theme.BACKGROUND_IMAGE_LIGHT,
    },
    footerButton: {
      marginBottom: 10,
      minWidth: "100%",
    },
  });

  const listItem = (order) => {
    const timestamp = new Date(order.creationDate);
    return (
      <BarTapListItem
        timestamp={timestamp}
        name={order.product.name}
        multiplier={order.amount}
        price={(order.product.price * order.amount).toFixed(2)}
      />
    );
  };

  const swipeableView = (item) => {
    return (
      <View style={styles.qaContainer}>
        <View style={styles.qaButton}>
          <TouchableOpacity
            onPress={() => {
              Snackbar.show({text: 'Entry by ' + item.item.bartender.name, duration: Snackbar.LENGTH_SHORT});
            }}
          >
            <Text style={[styles.qaButton__text__info]}>Info</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.qaButton}>
          <TouchableOpacity
            onPress={() => {
              api
                .deleteOrderFromBill(sessionId, billId, item.item.id)
                .then(() => setLoading(true))
                .catch((error) => {
                  if (error.response.status === 409) {
                    Snackbar.show({text: "Session is locked. Unlock first before editing.", duration: Snackbar.LENGTH_SHORT});
                  } else {
                    Snackbar.show({text: error.message, duration: Snackbar.LENGTH_SHORT});
                  }
                });
            }}
          >
            <Text style={[styles.qaButton__text__delete]}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <BarTapContent navigation={navigation} title={"Bill"}>
      <View style={styles.header}>
        <BarTapTitle text={bill.customer.name} level={1}>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => handleDeleteBill()}
          >
            <Image
              source={require("../../../assets/trash-icon.png")}
              style={styles.deleteButton__image}
              resizeMode={"contain"}
            />
          </TouchableOpacity>
        </BarTapTitle>
      </View>
      <SwipeableFlatList
        keyExtractor={(item) => item.id.toString()}
        style={styles.list}
        data={orders}
        renderItem={({ item }) => listItem(item)}
        refreshControl={
          <RefreshControl
            onRefresh={() => setLoading(true)}
            refreshing={isLoading}
            tintColor={theme.LOADING_INDICATOR}
          />
        }
        refreshing={isLoading}
        onRefresh={() => setLoading(true)}
        maxSwipeDistance={160}
        renderQuickActions={(item) => swipeableView(item)}
        shouldBounceOnMount={true}
      />
      <View style={styles.footer}>
        {bill.payed && (
          <Image
            style={styles.footerCheck}
            source={require("../../../assets/check.png")}
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
          <Text style={styles.footerPrice}>€{bill.totalPrice.toFixed(2)}</Text>
        </View>
      </View>
    </BarTapContent>
  );
}
