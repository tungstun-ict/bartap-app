import React, { useEffect, useState } from "react";
import { Image, RefreshControl, StyleSheet, Text, View } from "react-native";
import { FlatList } from "react-native";

import BarTapContent from "../../../component/BarTapContent";
import BarTapListItem from "../../../component/BarTapListItem/index.js";
import BarTapTitle from "../../../component/BarTapTitle/index.js";
import * as api from "../../../service/BarApiService.js";
import { ThemeContext } from "../../../theme/ThemeManager.js";

export default function CustomerCurrentSessionScreen({ route, navigation }) {
  const { theme } = React.useContext(ThemeContext);

  // const { billId, sessionId } = route.params;
  const [bill, setBill] = useState({ customer: { name: "" }, totalPrice: 0 });
  const [isLoading, setLoading] = useState(true);

  // useEffect(() => {
  // const unsubscribe = navigation.addListener("focus", () => {
  // setLoading(true);
  // setBill({ customer: { name: "" }, totalPrice: 0 });
  // });
  // return unsubscribe;
  // });
  //
  // useEffect(() => {
  // if (route.params !== null && isLoading) {
  // api
  // .getBillByBillIdAndSessionId(billId, sessionId)
  // .then((json) => {
  // json.orders.sort(function (a, b) {
  // return new Date(a.timestamp) - new Date(b.timestamp);
  // });
  // setBill(json);
  // setLoading(false);
  // })
  // .catch((error) => {
  // console.error(error);
  // setLoading(false);
  // });
  // }
  // }, [isLoading]);

  const styles = StyleSheet.create({
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
      fontFamily: theme.FONT_MEDIUM,
      color: theme.BACKGROUND_WARNING,
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

  return (
    <BarTapContent navigation={navigation}>
      <View style={styles.header}>
        <BarTapTitle text={bill.customer.name} level={1} />
      </View>
      <FlatList
        keyExtractor={(item) => item.id.toString()}
        style={styles.list}
        data={bill.orders}
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
        maxSwipeDistance={88}
        renderQuickActions={(item) => swipeableView(item)}
        shouldBounceOnMount={true}
      />
      <View style={styles.footer}>
        <View style={styles.footerText}>
          <Text style={styles.footerTotal}>Total:</Text>
          <Text style={styles.footerPrice}>€{bill.totalPrice.toFixed(2)}</Text>
        </View>
      </View>
    </BarTapContent>
  );
}
