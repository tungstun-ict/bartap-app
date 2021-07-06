import React, { useEffect, useState } from "react";
import { Button, FlatList, Image, RefreshControl, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ceil } from "react-native-reanimated";

import BarTapHeader from "../../component/BarTapHeader";
import BarTapListItem from "../../component/BarTapListItem/index.js";
import BarTapStackHeader from "../../component/BarTapStackHeader";
import BarTapTitle from "../../component/BarTapTitle/index.js";
import * as api from "../../service/BarApiService.js";
import * as storage from "../../service/BarStorageService.js";
import variables, { darkTheme, mock, sizes } from "../../theme/variables.js";

export default function AddCustomerSession({ route, navigation }) {
  const [customers, setCustomers] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const { sessionId } = route.params;

  useEffect(() => {
    api
      .getAllCustomersByBarId()
      .then((json) => {
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
    <SafeAreaView style={styles.container}>
      <BarTapStackHeader navigation={navigation} />
      <View style={styles.content}>
        <BarTapTitle text={"Customers"} level={1} />
        <FlatList
          keyExtractor={(item) => item.id.toString()}
          style={styles.list}
          refreshControl={
            <RefreshControl
              onRefresh={() => setLoading(true)}
              refreshing={isLoading}
              tintColor="white"
            />
          }
          data={customers}
          renderItem={(item) => listItem(item.item)}
          refreshing={isLoading}
          onRefresh={() => setLoading(true)}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: darkTheme.BARTAP_BLACK,
  },
  content: {
    flex: 1,
    paddingHorizontal: 10,
    flexDirection: "column",
  },
  list: {
    flexDirection: "column",
    alignSelf: "center",
    width: "100%",
  },
});
