import { Picker } from "@react-native-picker/picker";
import { useFocusEffect } from "@react-navigation/core";
import { StackActions } from "@react-navigation/native";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import { Image, StyleSheet, Text, View } from "react-native";
import { Button, TextInput, TouchableOpacity } from "react-native";
import { Value } from "react-native-reanimated";

import BarTapButton from "../../component/BarTapButton";
import BarTapHeader from "../../component/BarTapHeader";
import BarTapTitle from "../../component/BarTapTitle/index.js";
import * as api from "../../service/BarApiService.js";
import * as storage from "../../service/BarStorageService.js";
import { AuthContext } from "../../service/Context.js";
import variables, { darkTheme, mock, sizes } from "../../theme/variables.js";

export default function AccountScreen({ navigation }) {
  const [selectedBar, setSelectedBar] = useState(
    storage.getActiveBar().catch((error) => alert(error)),
  );
  const [bars, setBars] = useState([]);
  const [isLoading, setLoading] = useState(true);

  const { signOut } = useContext(AuthContext);
  const _logout = () => {
    signOut();
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setBars([]);
      setLoading(true);
    });
    return unsubscribe;
  });

  useEffect(() => {
    if (isLoading) {
      api
        .getBars()
        .then((json) => {
          setBars(json);
          setLoading(false);
        })
        .catch((error) => alert(error));
    }
  }, [isLoading]);

  useEffect(() => {
    if (selectedBar !== null) {
      storage.storeActiveBar(selectedBar.toString()).catch((error) => error);
    }
  }, [selectedBar]);

  let pickerItems = bars.map((bar) => {
    return (
      <Picker.Item
        style={styles.picker__item}
        label={bar.name}
        value={bar.id}
        key={bar.id}
      />
    );
  });

  return (
    <SafeAreaView style={styles.container}>
      <BarTapHeader navigation={navigation} />
      <View style={styles.content}>
        <BarTapTitle text={"Account"} level={1} />
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
            </View>
            <View style={styles.column}>
              <Text style={styles.attribute} numberOfLines={1}>
                None
              </Text>
              <Text style={styles.attribute}>None</Text>
              <Text style={styles.attribute}>None</Text>
            </View>
          </View>
        </View>
        <View style={styles.barsView}>
          <BarTapTitle text={"Active bar"} level={2} />
          <Picker
            style={styles.picker}
            selectedValue={selectedBar}
            itemStyle={styles.picker__item}
            onValueChange={(itemValue, itemIndex) => {
              setSelectedBar(itemValue);
            }}
          >
            {pickerItems}
          </Picker>
          <BarTapButton
            onPress={() => navigation.navigate("Create Bar")}
            text={"Create a new bar"}
          />
        </View>
        <BarTapButton
          onPress={() => _logout()}
          colour={darkTheme.BARTAP_RED}
          textColour={darkTheme.BARTAP_WHITE}
          style={styles.logoutButton}
          text={"Log out"}
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
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  content: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 10,
  },
  picker: {
    height: 60,
    borderColor: darkTheme.BARTAP_WHITE,
    borderWidth: 1,
    backgroundColor: darkTheme.BARTAP_DARK_GREY,
    color: darkTheme.BARTAP_WHITE,
    marginBottom: 10,
    borderRadius: 5,
    justifyContent: "center",
  },
  optionTitle: {
    color: darkTheme.BARTAP_WHITE,
    fontWeight: "bold",
    fontSize: 20,
  },
  picker__item: {
    height: 50,
    color: "white",
  },
  text: {
    color: darkTheme.BARTAP_GREY,
    fontSize: 50,
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    marginVertical: 10,
    color: darkTheme.BARTAP_WHITE,
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    height: 50,
  },
  input__label: {
    color: darkTheme.BARTAP_WHITE,
    alignSelf: "flex-start",
    fontWeight: "bold",
    fontSize: 20,
    marginTop: 10,
  },
  barsView: {
    width: "100%",
    height: "auto",
  },
  logoutButton: {
    marginTop: "auto",
    marginBottom: 10,
  },
  information: {
    backgroundColor: darkTheme.BARTAP_DARK_GREY,
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
  name: {
    color: darkTheme.BARTAP_WHITE,
    textAlign: "left",
    fontSize: 15,
    fontWeight: "normal",
  },
  attribute: {
    color: darkTheme.BARTAP_WHITE,
    textAlign: "right",
    fontSize: 15,
    fontWeight: "normal",
  },
});
