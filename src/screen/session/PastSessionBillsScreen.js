import React, { useState, useEffect } from "react";
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
import variables, { colors, mock, sizes } from "../../theme/variables.js";
import BarTapStackHeader from "../../component/BarTapStackHeader";
import { TouchableOpacity } from "react-native-gesture-handler";
import BarTapHeader from "../../component/BarTapHeader";
import BarTapListItem from "../../component/BarTapListItem/index.js";

export default function PastSessionBillsScreen({ route, navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [bills, setBills] = useState([]);
  const {sessionId, sessionName} = route.params;

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
        onPress={() => {navigation.navigate("Past Session Bill", {"billId": bill.id, "sessionId": sessionId})}}
        name={bill.customer.name}
        price={bill.totalPrice.toFixed(2)}/>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <BarTapStackHeader navigation={navigation} />
      <Text style={styles.title}>{sessionName}</Text>
      <View style={styles.content}>
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
  },
  title: {
    height: 40,
    margin: 10,
    color: colors.BARTAP_WHITE,
    fontSize: sizes.TITLE,
    fontWeight: "bold",
  },
  list: {
    flex: 1,
    flexDirection: "column",
    alignSelf: "center",
    width: "100%",
    paddingHorizontal: 10,
  },
  listItem: {
    alignSelf: "center",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    height: 50,
    backgroundColor: colors.BARTAP_BLACK,
    borderBottomColor: colors.BARTAP_DARK_GREY,
    borderBottomWidth: 2,
    width: "95%",
  },
  listItem__name: {
    fontSize: 20,
    width: "60%",
    color: colors.BARTAP_WHITE,
  },
  listItem__price: {
    fontSize: 20,
    color: colors.BARTAP_WHITE,
    fontWeight: "bold",
    marginLeft: "auto",
  },
  listItem__footer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    width: "95%",
    backgroundColor: colors.BARTAP_DARK_GREY,
    borderRadius: 5,
    marginTop: 10,
    alignSelf: "center",
  },
  listItem__footer__text: {
    color: colors.BARTAP_LIGHT_GREY,
    fontSize: 20,
    fontWeight: "bold",
  },
});
