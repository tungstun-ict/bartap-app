import React, { useState, useEffect } from "react";
import { FlatList, SafeAreaView } from "react-native";
import * as api from "../../service/BarApiService.js";
import { StyleSheet, Text, View, Image, Modal } from "react-native";
import variables, { colors, mock } from "../../theme/variables.js";
import { Button, TouchableOpacity } from "react-native";
import StackHeaderLayout from "../../layout/StackHeaderLayout.js";
import QRCode from "react-native-qrcode-svg";

export default function CustomerOverviewScreen({ route, navigation }) {
  const [customer, setCustomer] = useState({});
  const [showQr, setShowQr] = useState(false);
  const [bills, setBills] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
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
  }, [isLoading]);

  const listItem = (bill) => {
    const billId = bill.id;
    const sessionId = bill.session.id;

    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Customer Bill", { billId, sessionId })
        }
      >
        <View style={styles.listItem}>
          <Text style={styles.listItem__name}>{bill.session.name}</Text>
          <Text style={styles.listItem__price}>
            €{bill.totalPrice.toFixed(2)}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      
      <StackHeaderLayout navigation={navigation} title={customer.name} />
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
        { (!customer.hasOwnProperty("user")) ? (
          <TouchableOpacity
          onPress={() => setShowQr(true)}
          style={styles.button__wrapper}
        >
          <View style={styles.button__submit}>
            <Text style={styles.button__text}>Connect account</Text>
          </View>
        </TouchableOpacity>
        ) : (
          null
        )}

        <Text style={styles.title}>Bills</Text>
        <View style={styles.bills}>
          <FlatList
            keyExtractor={(item) => item.id.toString()}
            style={styles.list}
            data={bills}
            renderItem={(item) => listItem(item.item)}
            refreshing={isLoading}
            onRefresh={() => setLoading(true)}
          />
        </View>
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
          backgroundColor={colors.ELEMENT_BACKGROUND} />
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
    backgroundColor: colors.BACKGROUND,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
  },
  modal: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    padding: 10,
    backgroundColor: colors.ELEMENT_BACKGROUND,
    height: "100%",
    width: "100%"
  },
  modal__text: {
    fontSize: 30,
    color: colors.TEXT_PRIMARY,
    fontWeight: "bold",
    marginTop: 20,
  },
  button__submit: {
    height: 50,
    backgroundColor: colors.ELEMENT_BACKGROUND_LIGHT,
    width: "100%",
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  button__wrapper: {
    width: "95%",
    backgroundColor: colors.ELEMENT_BACKGROUND,
    height: 40,
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  button__text: {
    fontSize: 15,
    fontWeight: "bold",
  },
  information: {
    backgroundColor: colors.ELEMENT_BACKGROUND,
    padding: 20,
    borderRadius: 5,
    margin: 10,
    width: "95%",
  },
  table: {
    flexDirection: "row",
  },
  column: {
    flex: 1,
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
    backgroundColor: colors.BACKGROUND,
    borderBottomColor: colors.ELEMENT_BACKGROUND,
    borderBottomWidth: 2,
    width: "95%",
  },
  listItem__name: {
    fontSize: 20,
    color: colors.TEXT_PRIMARY,
  },
  listItem__price: {
    fontSize: 20,
    marginLeft: "auto",
    textAlign: "right",
    color: colors.TEXT_PRIMARY,
  },
  title: {
    color: colors.TEXT_PRIMARY,
    fontWeight: "bold",
    alignSelf: "flex-start",
    marginHorizontal: 10,
    marginTop: 10,
    fontSize: 25,
  },
  name: {
    color: colors.TEXT_PRIMARY,
    textAlign: "left",
    fontSize: 15,
    fontWeight: "normal",
  },
  attribute: {
    color: colors.TEXT_PRIMARY,
    textAlign: "right",
    fontSize: 15,
    fontWeight: "normal",
  },
  bills: {
    width: "100%",
  },
});
