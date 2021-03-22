import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import { StyleSheet, Text, View, Image } from "react-native";
import variables, { colors, mock, sizes } from "../../theme/variables.js";
import { Button, TextInput, TouchableOpacity } from "react-native";
import HeaderLayout from "../../layout/HeaderLayout";
import * as api from "../../service/BarApiService.js";
import { AuthContext } from "../../service/Context.js";
import { Picker } from "@react-native-picker/picker";
import { Value } from "react-native-reanimated";
import { StackActions } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/core";
import * as storage from "../../service/BarStorageService.js";

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
      console.log("Getting all bars!");
      api
        .getBars()
        .then((json) => {setBars(json); setLoading(false);})
        .catch((error) => alert(error));
    }
  }, [isLoading]);

  useEffect(() => {
    if(selectedBar !== null ) {
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
      <HeaderLayout navigation={navigation} />
      <Text style={styles.title}>Account</Text>
      <View style={styles.content}>
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
          <Text style={styles.optionTitle}>Active bar</Text>
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
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Create Bar");
            }}
            style={styles.button__wrapper}
          >
            <View style={styles.button__submit}>
              <Text style={styles.button__text}>Create a new bar</Text>
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => _logout()}
          style={styles.logoutButton__wrapper}
        >
          <View style={styles.button__submit}>
            <Text style={styles.logoutButton__text}>Log out</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: colors.BACKGROUND,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  content: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 10,
  },
  title: {
    height: 40,
    margin: 10,
    color: colors.TEXT_PRIMARY,
    fontSize: sizes.TITLE,
    fontWeight: "bold",
  },
  picker: {
    height: 60,
    borderColor: colors.TEXT_PRIMARY,
    borderWidth: 1,
    backgroundColor: colors.ELEMENT_BACKGROUND,
    color: colors.TEXT_PRIMARY,
    borderRadius: 5,
    justifyContent: "center",
    marginVertical: 10,
  },
  optionTitle: {
    color: colors.TEXT_PRIMARY,
    fontWeight: "bold",
    fontSize: 20,
  },
  picker__item: {
    height: 50,
    color: "white",
  },
  text: {
    color: colors.TEXT_TERTIARY,
    fontSize: 50,
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    marginVertical: 10,
    color: colors.TEXT_PRIMARY,
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    height: 50,
  },
  input__label: {
    color: colors.TEXT_PRIMARY,
    alignSelf: "flex-start",
    fontWeight: "bold",
    fontSize: 20,
    marginTop: 10,
  },
  button__submit: {
    height: 50,
    width: "100%",
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  barsView: {
    width: "100%",
    height: "auto",
  },
  logoutButton__wrapper: {
    minWidth: "100%",
    backgroundColor: colors.ELEMENT_BACKGROUND_WARNING,
    borderRadius: 5,
    marginTop: "auto",
    marginBottom: 10,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  button__wrapper: {
    minWidth: "100%",
    backgroundColor: colors.ELEMENT_BACKGROUND_LIGHT,
    borderRadius: 5,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  logoutButton__text: {
    fontSize: 15,
    fontWeight: "bold",
    color: colors.TEXT_PRIMARY,
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
    width: "100%",
  },
  table: {
    flexDirection: "row",
  },
  column: {
    flex: 1,
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
});
