import React, { useState, useEffect } from "react";
import { FlatList, RefreshControl, SafeAreaView } from "react-native";
import * as api from "../../service/BarApiService.js";
import { StyleSheet, Text, View, Image, Modal } from "react-native";
import variables, { colors, mock } from "../../theme/variables.js";
import { Button, TouchableOpacity } from "react-native";
import BarTapStackHeader from "../../component/BarTapStackHeader";
import QRCode from "react-native-qrcode-svg";
import BarTapButton from "../../component/BarTapButton/index.js";
import BarTapListItem from "../../component/BarTapListItem/index.js";

export default function CustomerOverviewScreen({ route, navigation }) {
  const [customer, setCustomer] = useState({});
  const [showQr, setShowQr] = useState(false);
  const [bills, setBills] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if(isLoading) {
      api
      .getCustomerById(route.params)
      .then((json) => {
        setCustomer(json);
      })
      .catch((error) => alert(error));

    api
      .getBillsByCustomerId(route.params)
      .then((json) => {
        setBills(json);
        setLoading(false);
      })
      .catch((error) => alert(error));
    }
  }, [isLoading]);

  const listItem = (bill) => {
    const billId = bill.id;
    const sessionId = bill.session.id;
    console.log(bill)
    return(
      <BarTapListItem 
        onPress={() =>
          navigation.navigate("Customer Bill", { billId, sessionId })
        }
        name={bill.session.name}
        price={bill.totalPrice.toFixed(2)}
        />
    );
  };

  const handleDeleteCustomer = () => {
    api.deleteCustomer(customer.id).then(() => {
      console.log("deleting customer " + customer.name)
    })
    .finally(() => {navigation.navigate("Customers")})
    .catch((error) => console.error(error));
  }

  return (
    <SafeAreaView style={styles.container}>
      
      <BarTapStackHeader navigation={navigation} title={customer.name} />
      <View style={styles.content}>
        <Text style={styles.title}>Information</Text>
        <View style={styles.information}>
          <View style={styles.table}>
            <View style={styles.column}>
              <Text style={styles.name} numberOfLines={1}>Name:</Text>
              <Text style={styles.name} numberOfLines={1}>ID:</Text>
              <Text style={styles.name} numberOfLines={1}>Phone number:</Text>
              <Text style={styles.name} numberOfLines={1}>Account:</Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.attribute} numberOfLines={1}>{customer.name}</Text>
              <Text style={styles.attribute} >{customer.id}</Text>
              <Text style={styles.attribute}>{customer.phoneNumber}</Text>
              <Text style={styles.attribute} numberOfLines={1}>
                {customer.hasOwnProperty("user")
                  ? customer.user.mail
                  : "Not connected"}
              </Text>
            </View>
          </View>
        </View>
        { (!customer.hasOwnProperty("user")) && (
          <BarTapButton 
          onPress={() => setShowQr(true)}
          text={"Connect Account"}/>
        )}
        <View style={styles.bills}>
        <Text style={styles.title}>Bills</Text>
          <FlatList
            keyExtractor={(item) => item.id.toString()}
            style={styles.list}
            data={bills}
            refreshControl={
              <RefreshControl
                onRefresh={() => setLoading(true)}
                refreshing={isLoading}
                tintColor="white"
             />}
            renderItem={(item) => listItem(item.item)}
            refreshing={isLoading}
            onRefresh={() => setLoading(true)}
          />
        </View>
        <BarTapButton 
          onPress={() => handleDeleteCustomer()}
          text={"Delete customer"}
          colour={colors.BARTAP_RED}
          textColour={colors.BARTAP_WHITE}/>
      </View>
      <Modal
        animationType="slide"
        visible={showQr}
        transparent={true}
        onRequestClose={() => {
          setShowQr(!showQr);
        }}
      >
        <View style={styles.modal}>
          <QRCode value={`${customer.id}`}
          color="white"
          size={200}
          backgroundColor={colors.BARTAP_DARK_GREY} />
          <Text style={styles.modal__text}>{customer.name}</Text>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: colors.BARTAP_BLACK,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "95%",
  },
  modal: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    padding: 10,
    backgroundColor: colors.BARTAP_DARK_GREY,
    height: "100%",
    width: "100%"
  },
  modal__text: {
    fontSize: 30,
    color: colors.BARTAP_WHITE,
    fontWeight: "bold",
    marginTop: 20,
  },
  information: {
    backgroundColor: colors.BARTAP_DARK_GREY,
    padding: 20,
    borderRadius: 5,
    margin: 10,
    width: "100%",
  },
  table: {
    flexDirection: "row",
  },
  column: {
    flex: 1,
  },
  list: {
    flex: 1,
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
    width: "100%",
  },
  listItem__name: {
    fontSize: 20,
    color: colors.BARTAP_WHITE,
  },
  listItem__price: {
    fontSize: 20,
    marginLeft: "auto",
    fontWeight: "bold",
    textAlign: "right",
    color: colors.BARTAP_WHITE,
  },
  title: {
    color: colors.BARTAP_WHITE,
    fontWeight: "bold",
    alignSelf: "flex-start",
    marginTop: 10,
    fontSize: 25,
  },
  name: {
    color: colors.BARTAP_WHITE,
    textAlign: "left",
    fontSize: 15,
    fontWeight: "normal",
  },
  attribute: {
    color: colors.BARTAP_WHITE,
    textAlign: "right",
    fontSize: 15,
    fontWeight: "normal",
  },
  bills: {
    width: "100%",
    flex: 1,
  },
});
