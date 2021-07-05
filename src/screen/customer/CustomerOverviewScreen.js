import React, { useEffect, useRef, useState } from "react";
import { FlatList, RefreshControl, SafeAreaView } from "react-native";
import { Image, Modal, StyleSheet, Text, View } from "react-native";
import { Button, TouchableOpacity } from "react-native";
import QRCode from "react-native-qrcode-svg";
import BottomSheet from "reanimated-bottom-sheet";

import BarTapBottomSheet from "../../component/BarTapBottomSheet";
import BarTapButton from "../../component/BarTapButton/index.js";
import BarTapListItem from "../../component/BarTapListItem/index.js";
import BarTapStackHeader from "../../component/BarTapStackHeader";
import BarTapTitle from "../../component/BarTapTitle/index.js";
import * as api from "../../service/BarApiService.js";
import NfcProxy from "../../service/NfcService.js";
import { encryptXor } from "../../service/XorEncryptionService.js";
import variables, { colors, mock } from "../../theme/variables.js";

export default function CustomerOverviewScreen({ route, navigation }) {
  const [customer, setCustomer] = useState({});
  const [showQr, setShowQr] = useState(false);
  const [bills, setBills] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [nfcStatus, setNfcStatus] = useState("searching");

  const sheetRef = useRef(null);
  const mounted = useRef(false);

  console.log(route.params.id);

  useEffect(() => {
    NfcProxy.init().catch();
    mounted.current = true;

    return () => (mounted.current = false);
  }, []);

  useEffect(() => {
    if (isLoading) {
      api
        .getCustomerById(route.params.id)
        .then((json) => {
          setCustomer(json);
        })
        .catch((error) => alert(error));

      api
        .getBillsByCustomerId(route.params.id)
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
    console.log(bill);
    return (
      <BarTapListItem
        onPress={() =>
          navigation.navigate("Customer Bill", { billId, sessionId })
        }
        name={bill.session.name}
        payed={bill.payed}
        price={bill.totalPrice.toFixed(2)}
      />
    );
  };

  const renderContent = () => {
    return (
      <BarTapBottomSheet height={450}>
        <Image
          style={styles.sheetLogo}
          source={require("../../assets/nfc.png")}
        />
        <Text style={styles.sheetText}>{nfcStatus}</Text>
      </BarTapBottomSheet>
    );
  };

  const closeBottomSheet = () => {
    if (mounted.current) {
      sheetRef.current.snapTo(0);
      NfcProxy.closeNfcDiscovery();
      setNfcStatus("searching");
    }
  };

  const handleDeleteCustomer = () => {
    api
      .deleteCustomer(customer.id)
      .then(() => {
        navigation.navigate("Customers");
      })
      .catch((error) => console.error(error));
  };

  const writeTag = async (value) => {
    sheetRef.current.snapTo(1);
    if (await NfcProxy.writeNdef({ type: "TEXT", value })) {
      setNfcStatus("succes");
    } else {
      setNfcStatus("error");
    }
    setTimeout(closeBottomSheet, 3000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <BarTapStackHeader navigation={navigation} title={customer.name} />
      <View style={styles.content}>
        <BarTapTitle text={"Information"} level={1} />
        <View style={styles.information}>
          <View style={styles.table}>
            <View style={styles.column}>
              <Text style={styles.name} numberOfLines={1}>
                Name:
              </Text>
              <Text style={styles.name} numberOfLines={1}>
                ID:
              </Text>
              <Text style={styles.name} numberOfLines={1}>
                Phone number:
              </Text>
              <Text style={styles.name} numberOfLines={1}>
                Account:
              </Text>
            </View>
            <View style={styles.column}>
              <Text style={styles.attribute} numberOfLines={1}>
                {customer.name}
              </Text>
              <Text style={styles.attribute}>{customer.id}</Text>
              <Text style={styles.attribute}>{customer.phoneNumber}</Text>
              <Text style={styles.attribute} numberOfLines={1}>
                {customer.hasOwnProperty("user")
                  ? customer.user.mail
                  : "Not connected"}
              </Text>
            </View>
          </View>
        </View>
        {!customer.hasOwnProperty("user") && (
          <View>
            <BarTapButton
              onPress={() => setShowQr(true)}
              text={"Connect Account"}
            />
            <BarTapButton
              onPress={() => writeTag(encryptXor(customer.id))}
              text={"Write NFC tag"}
            />
          </View>
        )}
        <View style={styles.bills}>
          <BarTapTitle text={"Bills"} level={1} />
          <FlatList
            keyExtractor={(item) => item.id.toString()}
            style={styles.list}
            data={bills}
            refreshControl={
              <RefreshControl
                onRefresh={() => setLoading(true)}
                refreshing={isLoading}
                tintColor="white"
              />
            }
            renderItem={(item) => listItem(item.item)}
            refreshing={isLoading}
            onRefresh={() => setLoading(true)}
          />
        </View>
        <BarTapButton
          onPress={() => handleDeleteCustomer()}
          text={"Delete customer"}
          colour={colors.BARTAP_RED}
          textColour={colors.BARTAP_WHITE}
        />
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
          <QRCode
            value={`${customer.id}`}
            color="white"
            size={200}
            backgroundColor={colors.BARTAP_DARK_GREY}
          />
          <Text style={styles.modal__text}>{customer.name}</Text>
        </View>
      </Modal>
      <BottomSheet
        enabledBottomInitialAnimation
        ref={sheetRef}
        snapPoints={[0, 450]}
        onCloseEnd={closeBottomSheet}
        borderRadius={10}
        renderContent={renderContent}
      />
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
    width: "95%",
  },
  modal: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    padding: 10,
    backgroundColor: colors.BARTAP_DARK_GREY,
    height: "100%",
    width: "100%",
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
  sheetLogo: {
    height: 100,
    width: 100,
    tintColor: colors.BARTAP_WHITE,
    alignSelf: "center",
    marginTop: 20,
  },
  sheetText: {
    alignSelf: "center",
    fontSize: 20,
    color: colors.BARTAP_WHITE,
    fontWeight: "bold",
    marginTop: 20,
    textAlign: "center",
  },
});
