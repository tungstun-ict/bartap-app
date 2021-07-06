import { Picker } from "@react-native-picker/picker";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import { StyleSheet, Text, View } from "react-native";

import BarTapButton from "../../component/BarTapButton";
import BarTapContent from "../../component/BarTapContent";
import BarTapHeader from "../../component/BarTapHeader";
import BarTapTitle from "../../component/BarTapTitle/index.js";
import * as api from "../../service/BarApiService.js";
import * as storage from "../../service/BarStorageService.js";
import { AuthContext } from "../../service/Context.js";
import { ThemeContext } from "../../theme/ThemeManager";
import { lightTheme } from "../../theme/variables";

export default function AccountScreen({ navigation }) {
  const { theme, toggleTheme } = React.useContext(ThemeContext);

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

  const styles = StyleSheet.create({
    picker: {
      height: 60,
      borderColor: theme.BARTAP_WHITE,
      borderWidth: 1,
      backgroundColor: theme.BARTAP_DARK_GREY,
      color: theme.BARTAP_WHITE,
      marginBottom: 10,
      borderRadius: 5,
      justifyContent: "center",
    },
    optionTitle: {
      color: theme.BARTAP_WHITE,
      fontWeight: "bold",
      fontSize: 20,
    },
    picker__item: {
      height: 50,
      color: "white",
    },
    text: {
      color: theme.BARTAP_GREY,
      fontSize: 50,
      fontWeight: "bold",
    },
    input: {
      width: "100%",
      marginVertical: 10,
      color: theme.BARTAP_WHITE,
      borderColor: "white",
      borderWidth: 1,
      borderRadius: 5,
      paddingLeft: 10,
      height: 50,
    },
    input__label: {
      color: theme.BARTAP_WHITE,
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
      backgroundColor: theme.BARTAP_DARK_GREY,
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
      color: theme.BARTAP_WHITE,
      textAlign: "left",
      fontSize: 15,
      fontWeight: "normal",
    },
    attribute: {
      color: theme.BARTAP_WHITE,
      textAlign: "right",
      fontSize: 15,
      fontWeight: "normal",
    },
  });

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
    <BarTapContent navigation={navigation}>
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
        <BarTapButton onPress={() => toggleTheme()} text={theme.mode} />
      </View>
      <BarTapButton
        onPress={() => _logout()}
        colour={theme.BARTAP_RED}
        textColour={theme.BARTAP_WHITE}
        style={styles.logoutButton}
        text={"Log out"}
      />
    </BarTapContent>
  );
}
