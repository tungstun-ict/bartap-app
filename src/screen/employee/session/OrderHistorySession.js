import React from "react";
import { FlatList, RefreshControl, StyleSheet } from "react-native";

import BarTapContent from "../../../component/BarTapContent";
import BarTapListItem from "../../../component/BarTapListItem";
import BarTapTitle from "../../../component/BarTapTitle";
import * as api from "../../../service/BarApiService.js";
import { ThemeContext } from "../../../theme/ThemeManager";

export default function OrderHistorySessionScreen({ route, navigation }) {
  const { theme } = React.useContext(ThemeContext);
  const [orders, setOrders] = React.useState([]);
  const [isLoading, setLoading] = React.useState(true);
  const session = route.params;

  React.useEffect(async () => {
    if (isLoading) {
      const orders = await api.getOrdersBySessionId(session.id);
      orders.sort(function (a, b) {
          return new Date(b.creationDate) - new Date(a.creationDate);
      })

      setOrders(orders);
      setLoading(false);
    }
  }, [isLoading]);

  const styles = StyleSheet.create({
    list: {
      flex: 1,
      flexDirection: "column",
      alignSelf: "center",
      width: "106%",
    },
  });

  const listItem = (order) => {
    return (
      <BarTapListItem
        timestamp={new Date(order.creationDate)}
        name={`${order.product.brand} ${order.product.name}`}
        multiplier={order.amount}
        line2={"Customer name"}
      />
    );
  };

  return (
    <BarTapContent navigation={navigation} title={session.name}>
      <BarTapTitle text={"Order history"} level={1} />
      <FlatList
        refreshControl={
          <RefreshControl
            onRefresh={() => setLoading(true)}
            refreshing={isLoading}
          />
        }
        keyExtractor={(item) => item.id.toString()}
        style={styles.list}
        data={orders}
        renderItem={(item) => listItem(item.item)}
        refreshing={isLoading}
        onRefresh={() => setLoading(true)}
      />
    </BarTapContent>
  );
}
