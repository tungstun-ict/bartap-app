import React, { useEffect, useState } from "react";
import { Button, FlatList, Image, RefreshControl, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import BarTapHeader from "../../component/BarTapHeader";
import BarTapListItem from "../../component/BarTapListItem/index.js";
import BarTapStackHeader from "../../component/BarTapStackHeader";
import BarTapTitle from "../../component/BarTapTitle/index.js";
import * as api from "../../service/BarApiService.js";
import variables, { colors, mock, sizes } from "../../theme/variables.js";

export default function PastSessionBillsScreen({ route, navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [bills, setBills] = useState([]);
  const { sessionId, sessionName } = route.params;

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setLoading(true);
      setBills([]);
    });
    return unsubscribe;
  });

  useEffect(() => {
    if (isLoading) {
      api
        .getSessionById(sessionId)
        .then((session) => {
          setBills(session.bills);
          setLoading(false);
        })
        .catch((error) => {
          alert(error);
          setLoading(false);
        });
    }
  }, [isLoading]);

  const listItem = (bill) => {
    return (
      <BarTapListItem
        onPress={() => {
          navigation.navigate("Past Session Bill", {
            billId: bill.id,
            sessionId: sessionId,
          });
        }}
        name={bill.customer.name}
        price={bill.totalPrice.toFixed(2)}
        payed={bill.payed}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <BarTapStackHeader navigation={navigation} />
      <View style={styles.content}>
        <BarTapTitle text={sessionName} level={1} />
        <FlatList
          refreshControl={
            <RefreshControl refreshing={isLoading} tintColor="white" />
          }
          refreshing={isLoading}
          onRefresh={() => setLoading(true)}
          keyExtractor={(item) => item.id.toString()}
          style={styles.list}
          data={bills}
          renderItem={({ item }) => listItem(item)}
        />
      </View>
    </SafeAreaView>
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
    paddingHorizontal: 10,
  },
  list: {
    flex: 1,
    flexDirection: "column",
    alignSelf: "center",
    width: "100%",
  },
});
