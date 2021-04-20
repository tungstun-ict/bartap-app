import React, { useState, useEffect } from "react";
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
import BarTapHeader from "../../component/BarTapHeader";
import * as api from "../../service/BarApiService.js";
import * as storage from "../../service/BarStorageService.js";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ceil } from "react-native-reanimated";
import BarTapStackHeader from "../../component/BarTapStackHeader";

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
        if(error.response.status === 409) alert("Persoon al toegevoegd aan error")
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
      <TouchableOpacity
        onPress={async () =>
          addCustomer(customer.id).catch((error) => alert(error))
        }
      >
        <View style={styles.listItem}>
          <Text style={styles.listItem__name}>{customer.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <BarTapStackHeader navigation={navigation} />
      <Text style={styles.title}>Customers</Text>
      <View style={styles.content}>
        <FlatList
          keyExtractor={(item) => item.id.toString()}
          style={styles.list}
          refreshControl={
            <RefreshControl
              onRefresh={() => setLoading(true)}
              refreshing={isLoading}
              tintColor="white"
           />}
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
    backgroundColor: colors.BARTAP_BLACK,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  content: {
    flex: 1,
    width: "100%",
    height: "100%",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  title: {
    height: 40,
    margin: 10,
    color: colors.BARTAP_WHITE,
    fontSize: sizes.TITLE,
    fontWeight: "bold",
  },
  list: {
    flexDirection: "column",
    alignSelf: "center",
    width: "100%",
  },
  listItem: {
    alignSelf: "center",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    height: 50,
    backgroundColor: colors.BARTAP_BLACK,
    borderBottomColor: colors.BARTAP_DARK_GREY,
    borderBottomWidth: 2,
    width: "95%",
  },
  listItem__name: {
    fontSize: 20,
    color: colors.BARTAP_WHITE,
  },
  button: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "95%",
    backgroundColor: colors.BARTAP_WHITE,
    borderRadius: 5,
    marginTop: 0,
    alignSelf: "center",
  },
  button__wrapper: {
    flex: 1,
    maxHeight: 40,
    minWidth: "100%",
    marginVertical: 10,
  },
  button__text: {
    color: colors.BARTAP_LIGHT_GREY,
    fontSize: 20,
    fontWeight: "bold",
  },
});
