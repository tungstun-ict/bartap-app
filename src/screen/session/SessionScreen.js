import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native";
import { StyleSheet, Text, View, Image, Alert } from "react-native";
import * as api from "../../service/BarApiService.js";
import variables, { colors, mock } from "../../theme/variables.js";
import {
  Button,
  Dimensions,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import HeaderLayout from "../../layout/HeaderLayout";
import { FlatList } from "react-native";
import { TouchableOpacity } from "react-native";

export default function SessionScreen({ navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [session, setSession] = useState({ bills: [], locked: true, name: "Not found" });

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setLoading(true);
      setSession({ bills: [], locked: true, name: "Not found" });
    });
    return unsubscribe;
  });

  useEffect(() => {
    if (isLoading == true) {
      console.log("fetching data");
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
            api.lockSession(session.id)
            .finally(() => {setLoading(true);})
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
  return (
    <SafeAreaView style={styles.container}>
      <HeaderLayout navigation={navigation} />
      <View style={styles.session}>
        <View style={styles.header}>
          <Text style={styles.session__title}>{session.name}</Text>
          <TouchableOpacity style={styles.addButton} onPress={addCustomer}>
            <Text style={styles.addButton__text}>+</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.session__customers}>
          <FlatList
            refreshControl={
              <RefreshControl
                refreshing={isLoading}
                onRefresh={() => setLoading(true)}
                tintColor="white"
             />}
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
          <TouchableOpacity style={styles.buttonDisabled}>
            <Image
              style={styles.button__image}
              source={require("../../assets/clock.png")}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonDisabled}>
            <Image
              style={styles.button__image}
              source={require("../../assets/stats.png")}
            />
          </TouchableOpacity>
          {!session.locked ? (
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleLockSession()}
            >
              <Image
                style={styles.button__image}
                source={require("../../assets/close.png")}
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
    </SafeAreaView>
  );
}

function customerListItem(navigation, bill, sessionId) {
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
        <Text style={styles.customer__name} numberOfLines={2}>{bill.customer.name}</Text>
        <Text style={styles.customer__total}>
          €{bill.totalPrice.toFixed(2)}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: colors.BACKGROUND,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  content: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  bottomBar__bar: {
    flexDirection: "row",
    height: 100,
    marginTop: 20,
    backgroundColor: colors.ELEMENT_BACKGROUND,
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
    backgroundColor: colors.ELEMENT_BACKGROUND_LIGHT,
  },
  buttonDisabled: {
    marginHorizontal: 20,
    flex: 1,
    height: 70,
    width: 70,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.ELEMENT_BACKGROUND_SELECTED,
  },
  addSessionButton: {
    fontSize: 50,
    fontWeight: "bold",
  },
  button__image: {
    height: 40,
    width: 40,
  },
  button__text: {
    color: colors.TEXT_SECONDARY,
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
    flexDirection: "column",
    marginLeft: "auto",
    alignItems: "center",
    justifyContent: "center",
  },
  addButton__text: {
    textAlign: "center",
    color: colors.TEXT_PRIMARY,
    fontWeight: "bold",
    width: "100%",
    height: "100%",
    marginBottom: 15,
    margin: 10,
    marginRight: 10,
    fontSize: 40,
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
    color: colors.TEXT_PRIMARY,
    fontSize: 25,
    flex: 1,
    fontWeight: "bold",
  },
  text: {
    color: colors.TEXT_TERTIARY,
    fontSize: 50,
    fontWeight: "bold",
  },
  list: {
    height: "100%",
    width: "100%",
  },
  customer: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: colors.ELEMENT_BACKGROUND_LIGHT,
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
  },
  customer__total: {
    width: "100%",
    fontWeight: "bold",
    fontSize: 35,
    marginTop: "auto",
    textAlign: "right",
    paddingRight: 10,
  },
  addCustomer: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: colors.ELEMENT_BACKGROUND_SELECTED,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    height: 50,
    borderRadius: 5,
  },
  addCustomer__text: {
    fontSize: 30,
  },
});
