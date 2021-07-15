import React, { useEffect, useState } from "react";
import { FlatList, RefreshControl, StyleSheet } from "react-native";
import BarTapContent from "../../component/BarTapContent";
import BarTapListItem from "../../component/BarTapListItem/index.js";
import BarTapTitle from "../../component/BarTapTitle/index.js";
import * as api from "../../service/BarApiService.js";
import * as Utils from "../../service/Utils.js";
import { ThemeContext } from "../../theme/ThemeManager";

export default function AddCustomerSession({ route, navigation }) {
  const { theme } = React.useContext(ThemeContext);

  const [customers, setCustomers] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const { sessionId, addedCustomers } = route.params;

  useEffect(() => {
    api
      .getAllCustomersByBarId()
      .then((json) => {
        console.log(addedCustomers);
        json = json.filter((customer) => !addedCustomers.includes(customer.id));
        json.sort((a, b) => Utils.sortListItemString(a.name, b.name));
        setCustomers(json);
        setLoading(false);
      })
      .catch((error) => {
        if (error.response.status === 409)
          alert("Persoon al toegevoegd aan error");
        else alert(error);
        setLoading(false);
      });
  }, [isLoading]);

  const addCustomer = async (customerId) => {
    await api.addCustomerToSession(sessionId, customerId);
    navigation.popToTop();
  };

  const styles = StyleSheet.create({
    list: {
      flexDirection: "column",
      alignSelf: "center",
      width: "105%",
    },
  });

  const listItem = (customer) => {
    return (
      <BarTapListItem
        onPress={async () =>
          addCustomer(customer.id).catch((error) => alert(error))
        }
        name={customer.name}
      />
    );
  };

  return (
    <BarTapContent navigation={navigation} title={"Add customer"}>
      <BarTapTitle text={"Customers"} level={1} />
      <FlatList
        keyExtractor={(item) => item.id.toString()}
        style={styles.list}
        refreshControl={
          <RefreshControl
            onRefresh={() => setLoading(true)}
            refreshing={isLoading}
            tintColor={theme.LOADING_INDICATOR}
          />
        }
        data={customers}
        renderItem={(item) => listItem(item.item)}
        refreshing={isLoading}
        onRefresh={() => setLoading(true)}
      />
    </BarTapContent>
  );
}
