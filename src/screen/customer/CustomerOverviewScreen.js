import React, { useEffect, useRef, useState } from "react";
import { FlatList, RefreshControl } from "react-native";
import { Image, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import QRCode from "react-native-qrcode-svg";
import BottomSheet from "reanimated-bottom-sheet";

import BarTapBottomSheet from "../../component/BarTapBottomSheet";
import BarTapButton from "../../component/BarTapButton/index.js";
import BarTapContent from "../../component/BarTapContent";
import { DrawerIcon } from "../../component/BarTapDrawer";
import BarTapListItem from "../../component/BarTapListItem/index.js";
import BarTapTitle from "../../component/BarTapTitle/index.js";
import * as api from "../../service/BarApiService.js";
import NfcProxy from "../../service/NfcService.js";
import { encryptXor } from "../../service/XorEncryptionService.js";
import { ThemeContext } from "../../theme/ThemeManager";

export default function CustomerOverviewScreen({ route, navigation }) {
const { theme } = React.useContext(ThemeContext);

  const [customer, setCustomer] = useState({});
  const [showQr, setShowQr] = useState(false);
  const [bills, setBills] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [nfcStatus, setNfcStatus] = useState("searching");

  const sheetRef = useRef(null);
  const mounted = useRef(false);

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
          json.sort(function (a, b){
            return new Date(b.session.creationDate) - new Date(a.session.creationDate)
          })
          setBills(json);
          setLoading(false);
        })
        .catch((error) => alert(error));
    }
  }, [isLoading]);

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

  const styles = StyleSheet.create({
    content: {
      flex: 1,
      padding: 10,
      flexDirection: "column",
      width: "100%",
      justifyContent: "center",
    },
    modal: {
      justifyContent: "center",
      alignItems: "center",
      alignSelf: "center",
      padding: 10,
      backgroundColor: theme.BACKGROUND_OVERLAY,
      height: "100%",
      width: "100%",
    },
    modal__text: {
      fontSize: 30,
      color: theme.TEXT_PRIMARY,
      fontWeight: "bold",
      marginTop: 20,
    },
    information: {
      backgroundColor: theme.BACKGROUND_LOW_CONTRAST,
      padding: 20,
      borderRadius: 5,
      width: "100%",
      marginBottom: 10,
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
      width: "105%",
    },
    name: {
      color: theme.TEXT_PRIMARY,
      textAlign: "left",
      fontSize: 15,
      fontWeight: "normal",
    },
    attribute: {
      color: theme.TEXT_PRIMARY,
      textAlign: "right",
      fontSize: 15,
      fontWeight: "normal",
    },
    bills: {
      width: "100%",
      flex: 1,
      marginBottom: 10,
    },
    sheetLogo: {
      height: 100,
      width: 100,
      tintColor: theme.BACKGROUND_IMAGE_LIGHT,
      alignSelf: "center",
      marginTop: 20,
    },
    sheetText: {
      alignSelf: "center",
      fontSize: 20,
      color: theme.TEXT_SECONDARY,
      fontWeight: "bold",
      marginTop: 20,
      textAlign: "center",
    },
    customerFunctions: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 10,
    },
    button: {
      flex: 0.485
    }
  });

  const listItem = (bill) => {
    const billId = bill.id;
    const sessionId = bill.session.id;

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

  return (
    <BarTapContent navigation={navigation} title={customer.name} padding={0}>
      <View style={styles.content}>
        <BarTapTitle text={"Information"} level={1}>
          <TouchableOpacity>
            <DrawerIcon source={require("../../assets/edit-icon.png")} />
          </TouchableOpacity>
        </BarTapTitle>
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
          <View style={styles.customerFunctions}>
            <BarTapButton
              style={styles.button}
              onPress={() => setShowQr(true)}
              text={"Connect Account"}
            />
            <BarTapButton
              style={styles.button}
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
          colour={theme.BACKGROUND_WARNING}
          textColour={theme.TEXT_BUTTON_WARNING}
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
            color={theme.TEXT_PRIMARY}
            size={200}
            backgroundColor={theme.BACKGROUND_OVERLAY}
          />
          <Text style={styles.modal__text}>{customer.name}</Text>
        </View>
      </Modal>
      <BottomSheet
        enabledBottomInitialAnimation
        ref={sheetRef}
        snapPoints={[0, 230]}
        onCloseEnd={closeBottomSheet}
        borderRadius={10}
        renderContent={renderContent}
      />
    </BarTapContent>
  );
}
