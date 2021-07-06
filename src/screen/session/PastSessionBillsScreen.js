import React, { useEffect, useState } from "react";
import { FlatList, RefreshControl, StyleSheet} from "react-native";

import BarTapListItem from "../../component/BarTapListItem/index.js";
import BarTapContent from "../../component/BarTapContent";
import BarTapTitle from "../../component/BarTapTitle/index.js";
import * as api from "../../service/BarApiService.js";
import { ThemeContext } from "../../theme/ThemeManager";
import * as Utils from "../../service/Utils.js";

export default function PastSessionBillsScreen({ route, navigation }) {
  const { theme } = React.useContext(ThemeContext);

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

  const styles = StyleSheet.create({
    list: {
      flex: 1,
      flexDirection: "column",
      alignSelf: "center",
      width: "105%",
    },
  });

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
    <BarTapContent navigation={navigation} title={sessionName}>
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
    </BarTapContent>
  );
}
