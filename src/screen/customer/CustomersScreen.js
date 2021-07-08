import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  FlatList,
  RefreshControl,
} from "react-native";
import * as api from "../../service/BarApiService.js";
import BarTapButton from "../../component/BarTapButton/index.js";
import BarTapListItem from "../../component/BarTapListItem/index.js";
import BarTapTitle from "../../component/BarTapTitle/index.js";
import BarTapContent from "../../component/BarTapContent/index.js";
import { ThemeContext } from "../../theme/ThemeManager.js";

export default function CustomersScreen({ navigation }) {
  const { theme } = React.useContext(ThemeContext);
  const [customers, setCustomers] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setLoading(true);
      setCustomers([]);
    });
    return unsubscribe;
  });

  useEffect(() => {
    if (isLoading) {
      api
        .getAllCustomersByBarId()
        .then((json) => {
          setCustomers(json);
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
      width: "106%",
    },
    button: {
      width: "100%",
    }
  });

  const listItem = (customer) => {
    return (
      <BarTapListItem
        onPress={() => navigation.navigate("Customer overview", {id: customer.id})}
        name={customer.name}
      />
    );
  };

  return (
    <BarTapContent navigation={navigation}>
      <BarTapTitle text={"Customers"} level={1} />
        <FlatList
          refreshControl={
            <RefreshControl
              onRefresh={() => setLoading(true)}
              refreshing={isLoading}
            />
          }
          keyExtractor={(item) => item.id.toString()}
          style={styles.list}
          data={customers}
          renderItem={(item) => listItem(item.item)}
          refreshing={isLoading}
          onRefresh={() => setLoading(true)}
        />
        <BarTapButton
          style={styles.button}
          onPress={() => navigation.navigate("Add new customer")}
          text={"Add new customer"}
        />
    </BarTapContent>
  );
}
