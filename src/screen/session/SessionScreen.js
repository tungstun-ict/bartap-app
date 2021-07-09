import React, { useEffect, useRef, useState } from "react";
import { Alert, Image, StyleSheet, Text, View } from "react-native";
import { Dimensions, RefreshControl } from "react-native";
import { FlatList } from "react-native";
import { TouchableOpacity } from "react-native";
import BottomSheet from "reanimated-bottom-sheet";

import BarTapBottomSheet from "../../component/BarTapBottomSheet/index.js";
import BarTapButton from "../../component/BarTapButton/index.js";
import BarTapContent from "../../component/BarTapContent/index.js";
import BarTapTitle from "../../component/BarTapTitle/index.js";
import * as api from "../../service/BarApiService.js";
import NfcProxy from "../../service/NfcService.js";
import { decryptXor } from "../../service/XorEncryptionService.js";
import { ThemeContext } from "../../theme/ThemeManager.js";

export default function SessionScreen({ navigation }) {
  const { theme } = React.useContext(ThemeContext);

  const [isLoading, setLoading] = useState(true);
  const [session, setSession] = useState({
    bills: [],
    locked: true,
    name: "Not found",
  });
  const [nfcStatus, setNfcStatus] = useState("searching");
  const mounted = useRef(false);
  const sheetRef = React.useRef(null);

  useEffect(() => {
    NfcProxy.init().catch();
    mounted.current = true;

    const unsubscribe = navigation.addListener("focus", () => {
      setLoading(true);
      setSession({ bills: [], locked: true, name: "Not found" });
      mounted.current = false;
    });
    return unsubscribe;
  });

  useEffect(() => {
    if (isLoading === true) {
      api
        .getCurrentSession()
        .then((json) => {
          setSession(json);
          setLoading(false);
        })
        .catch((error) => {
          if (error.response.status === 404) {
            setSession({ bills: [], locked: true, name: "Not found" });
          } else {
            alert(error);
          }

          setLoading(false);
        });
    }
  }, [isLoading]);

  const readTag = async () => {
    sheetRef.current.snapTo(1);
    const tag = await NfcProxy.readTag();
    if (tag) {
      const ndef =
        Array.isArray(tag.ndefMessage) && tag.ndefMessage.length > 0
          ? tag.ndefMessage[0]
          : null;
      setNfcStatus(decryptXor(NfcProxy.decodePayload(ndef.payload)));
      sheetRef.current.snapTo(2);
    } else {
      setNfcStatus("error");
    }
    setTimeout(closeBottomSheet, 3000);
  };

  const closeBottomSheet = () => {
    if (mounted.current) {
      setNfcStatus("searching");
      sheetRef.current.snapTo(0);
      NfcProxy.closeNfcDiscovery();
      NfcProxy.stopReading();
    }
  };

  const formatData = (data, numColumns) => {
    const numberOfFullRows = Math.floor(data.length / numColumns);

    let numberOfElementsLastRow = data.length - numberOfFullRows * numColumns;
    while (
      numberOfElementsLastRow !== numColumns &&
      numberOfElementsLastRow !== 0
    ) {
      data.push({
        id: `blank-${numberOfElementsLastRow}`,
        empty: true,
        customer: { name: "" },
        totalPrice: 0,
      });
      numberOfElementsLastRow++;
    }

    return data;
  };

  const addCustomer = () => {
    navigation.navigate("Add customer to session", { sessionId: session.id });
  };

  const handleLockSession = () => {
    Alert.alert(
      "Are you sure?",
      "You are about to lock this session. This process is not reversable",
      [
        {
          text: "Yes",
          onPress: () => {
            api
              .lockSession(session.id)
              .then(() => {
                setLoading(true);
              })
              .catch((error) => {
                alert(error);
              });
          },
        },
        {
          text: "No",
          onPress: () => console.log("User canceled locking this session"),
          style: "cancel",
        },
      ],
      { cancelable: false },
    );
  };

  const handleNewSession = () => {
    navigation.navigate("New Session");
  };

  const numColumns = 2;

  const styles = StyleSheet.create({
    bottomBar__bar: {
      flexDirection: "row",
      height: 100,
      marginTop: 20,
      backgroundColor: theme.BACKGROUND_SECONDARY,
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
    },
    button: {
      marginHorizontal: 20,
      flex: 1,
      height: 70,
      width: 70,
      borderRadius: 5,
      alignItems: "center",
      justifyContent: "center",
      tintColor: theme.BACKGROUND_IMAGE_DARK,
      backgroundColor: theme.BACKGROUND_LIGHT,
    },
    buttonDisabled: {
      marginHorizontal: 20,
      flex: 1,
      height: 70,
      width: 70,
      borderRadius: 5,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: theme.BACKGROUND_SECONDARY,
    },
    addSessionButton: {
      fontSize: 50,
      fontWeight: "bold",
      color: theme.BACKGROUND_BUTTON_PRIMARY,
    },
    button__image: {
      height: 50,
      width: 50,
      tintColor: theme.BACKGROUND_IMAGE_DARK,
    },
    bottomBar: {
      height: "auto",
    },
    session: {
      flex: 1,
      width: "100%",
      height: "100%",
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "flex-start",
      padding: 10,
    },
    itemInvisible: {
      backgroundColor: "transparent",
    },
    header: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      flex: 1,
      minHeight: 40,
      maxHeight: 40,
    },
    addButton: {
      alignItems: "center",
      justifyContent: "center",
      height: 40,
      width: 40,
    },
    header__image: {
      height: 40,
      width: 40,
      tintColor: theme.BACKGROUND_IMAGE,
    },
    session__customers: {
      marginVertical: 10,
      width: "100%",
    },
    customers__row: {
      flex: 1,
      justifyContent: "space-around",
    },
    session__title: {
      color: theme.TEXT_PRIMARY,
      fontSize: 25,
      flex: 1,
      fontWeight: "bold",
    },
    list: {
      height: "100%",
      width: "100%",
    },
    customer: {
      flex: 1,
      flexDirection: "column",
      backgroundColor: theme.BACKGROUND_BUTTON_BIG,

      marginVertical: 10,
      height: Dimensions.get("window").height / 7,
      maxWidth: Dimensions.get("window").width / 2 - 30,
      minWidth: Dimensions.get("window").width / 2 - 30,
      borderRadius: 5,
    },
    customer__name: {
      fontSize: 20,
      fontWeight: "bold",
      margin: 5,
      color: theme.TEXT_DARK,
    },
    customer__total: {
      width: "100%",
      fontWeight: "bold",
      fontSize: 35,
      marginTop: "auto",
      textAlign: "right",
      color: theme.TEXT_DARK,
      paddingRight: 10,
    },
    sheetLogo: {
      tintColor: theme.BACKGROUND_IMAGE_LIGHT,
      height: 100,
      width: 100,
      alignSelf: "center",
      marginTop: 20,
    },
    sheetText: {
      alignSelf: "center",
      fontSize: 20,
      color: theme.TEXT_SECONDARY,
      fontWeight: "bold",
      marginVertical: 20,
      textAlign: "center",
    },
  });

  const renderContent = () => {
    return (
      <BarTapBottomSheet height={290}>
        <Image
          style={styles.sheetLogo}
          source={require("../../assets/nfc-icon.png")}
        />
        <Text style={styles.sheetText}>{nfcStatus}</Text>
        {typeof nfcStatus === "number" && (
          <BarTapButton
            text={"Customer info"}
            onPress={() =>
              navigation.navigate("Customers", {
                screen: "Customer overview",
                params: { id: nfcStatus },
              })
            }
          />
        )}
      </BarTapBottomSheet>
    );
  };

  const customerListItem = (navigation, bill, sessionId) => {
    let billId = bill.id;
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("Drink Categories", { billId, sessionId })
        }
        onLongPress={() =>
          navigation.navigate("Session Bill", { billId, sessionId })
        }
      >
        <View style={styles.customer}>
          <Text style={styles.customer__name} numberOfLines={2}>
            {bill.customer.name}
          </Text>
          <Text style={styles.customer__total}>
            €{bill.totalPrice.toFixed(2)}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <BarTapContent navigation={navigation} padding={0}>
      <View style={styles.session}>
        <BarTapTitle text={session.name} level={2}>
          <TouchableOpacity style={styles.addButton} onPress={addCustomer}>
            <Image
              source={require("../../assets/drawer/customers-icon.png")}
              style={styles.header__image}
            />
          </TouchableOpacity>
        </BarTapTitle>
        <View style={styles.session__customers}>
          <FlatList
            refreshControl={
              <RefreshControl
                refreshing={isLoading}
                onRefresh={() => setLoading(true)}
                tintColor="white"
              />
            }
            colors={["white"]}
            style={styles.list}
            data={formatData(session.bills, numColumns)}
            renderItem={({ item }) => {
              if (item.empty === true) {
                return <View style={[styles.customer, styles.itemInvisible]} />;
              } else {
                return customerListItem(navigation, item, session.id);
              }
            }}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            columnWrapperStyle={styles.customers__row}
            refreshing={isLoading}
            onRefresh={() => setLoading(true)}
          />
        </View>
      </View>
      <View style={styles.bottomBar}>
        <View style={styles.bottomBar__bar}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Order History", session)}
          >
            <Image
              style={styles.button__image}
              source={require("../../assets/drawer/history-icon.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={readTag}>
            <Image
              style={styles.button__image}
              source={require("../../assets/nfc-icon.png")}
            />
          </TouchableOpacity>
          {!session.locked ? (
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleLockSession()}
            >
              <Image
                style={styles.button__image}
                source={require("../../assets/lock-icon.png")}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleNewSession()}
            >
              <Text style={styles.addSessionButton}>+</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      <BottomSheet
        enabledInnerScrolling={true}
        ref={sheetRef}
        snapPoints={[0, 220, 290]}
        onCloseEnd={closeBottomSheet}
        borderRadius={10}
        renderContent={renderContent}
      />
    </BarTapContent>
  );
}
