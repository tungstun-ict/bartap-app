import { Picker } from "@react-native-picker/picker";
import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Snackbar from 'react-native-snackbar';

import BarTapButton from "../../../component/BarTapButton";
import BarTapContent from "../../../component/BarTapContent";
import BarTapPicker from "../../../component/BarTapPicker";
import BarTapTitle from "../../../component/BarTapTitle/index.js";
import * as api from "../../../service/BarApiService.js";
import * as storage from "../../../service/BarStorageService.js";
import { AuthContext } from "../../../service/Context.js";
import { ThemeContext } from "../../../theme/ThemeManager";

export default function AccountScreen({ navigation }) {
  const { theme, toggleTheme } = React.useContext(ThemeContext);

  const [selectedBar, setSelectedBar] = useState(null);
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
      storage
        .getActiveBar()
        .then((bar) => {
          setSelectedBar(bar);
        })
        .catch((error) => Snackbar.show({text: error.message, duration: Snackbar.LENGTH_SHORT}));

      api
        .getBars()
        .then((json) => {
          setBars(json);
          setLoading(false);
        })
        .catch((error) => Snackbar.show({text: error.message, duration: Snackbar.LENGTH_SHORT}));
    }
  }, [isLoading]);

  useEffect(() => {
    if (selectedBar !== null) {
      storage.storeActiveBar(selectedBar.toString()).catch((error) => error);
    }
  }, [selectedBar]);

  const styles = StyleSheet.create({
    pickerContainer: {
      backgroundColor: theme.BACKGROUND_PICKER,
      width: "100%",
      borderRadius: 5,
      height: 60,
    },
    picker: {
      height: 60,
      //backgroundColor: theme.BACKGROUND_INPUT,
      color: theme.TEXT_PRIMARY,
      marginBottom: 10,
      borderRadius: 5,
      justifyContent: "center",
    },
    picker__item: {
      height: 50,
      borderRadius: 5,
      width: "100%",
      backgroundColor: theme.BACKGROUND_PICKER,
      color: theme.TEXT_PRIMARY,
    },
    barsView: {
      width: "100%",
      height: "auto",
    },
    logoutButton: {
      marginTop: "auto",
      width: "100%",
    },
    information: {
      backgroundColor: theme.BACKGROUND_LOW_CONTRAST,
      padding: 20,
      borderRadius: 5,
      marginBottom: 10,
      width: "100%",
    },
    table: {
      flexDirection: "row",
    },
    column: {
      flex: 1,
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
    button: {
      marginVertical: 10,
      width: "100%",
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
        <View style={styles.pickerContainer}>
          <BarTapPicker
            style={styles.pickerContainer}
            setDefaultvalue={selectedBar}
            selectedValue={selectedBar}
            onValueChange={(itemValue, itemIndex) => {
              setSelectedBar(itemValue);
            }}
          >
            {pickerItems}
          </BarTapPicker>
        </View>
      </View>
      <BarTapButton
        style={styles.button}
        onPress={() => navigation.navigate("Create Bar")}
        text={"Create a new bar"}
      />
      <BarTapButton
        style={styles.button}
        onPress={() => toggleTheme()}
        text={theme.mode}
      />
      <BarTapButton
        onPress={() => _logout()}
        colour={theme.BACKGROUND_WARNING}
        textColour={theme.TEXT_SECONDARY}
        style={styles.logoutButton}
        text={"Log out"}
      />
    </BarTapContent>
  );
}
