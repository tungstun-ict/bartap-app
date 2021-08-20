import React, { useEffect, useState } from "react";
import { FlatList, Modal, RefreshControl, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Snackbar from 'react-native-snackbar';

import BarTapContent from "../../../component/BarTapContent/index.js";
import BarTapListItem from "../../../component/BarTapListItem/index.js";
import BarTapTitle from "../../../component/BarTapTitle/index.js";
import * as api from "../../../service/BarApiService.js";
import * as Utils from "../../../service/Utils.js";
import { ThemeContext } from "../../../theme/ThemeManager.js";

export default function AddDrinksScreen({ route, navigation }) {
  const { theme } = React.useContext(ThemeContext);

  const [drinks, setDrinks] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [amount, setAmount] = useState(1);
  const [selectedItem, setSelectedItem] = useState(null);
  const { category, billId, sessionId } = route.params;

  useEffect(() => {
    if (isLoading) {
      if (category.productType === "SEARCH") {
        api
          .getSearchResults(category.name)
          .then((json) => {
            //json.sort((a, b) => Utils.sortListItemString(a.brand, b.brand));
            setDrinks(json);
            setLoading(false);
          })
          .catch((error) => {
            Snackbar.show({text: error.message, duration: Snackbar.LENGTH_SHORT});
            setLoading(false);
          });
      } else if (category.productType === "FAVOURITES") {
        api
          .getFavouriteProducts()
          .then((json) => {
            json.sort((a, b) => Utils.sortListItemString(a.brand, b.brand));
            setDrinks(json);
            setLoading(false);
          })
          .catch((error) => {
            Snackbar.show({text: error.message, duration: Snackbar.LENGTH_SHORT});
            setLoading(false);
          });
      } else {
        api
          .getDrinksByCategory(category.id)
          .then((json) => {
            json.sort((a, b) => Utils.sortListItemString(a.brand, b.brand));
            setDrinks(json);
            setLoading(false);
          })
          .catch((error) => {
            Snackbar.show({text: error.message, duration: Snackbar.LENGTH_SHORT});
            setLoading(false);
          });
      }
      return;
    }
  }, [isLoading]);

  const selectAmount = (drink) => {
    setSelectedItem(drink);
    setDialogOpen(true);
  };

  const addItem = (navigation, billId, sessionId) => {
    if (selectedItem === null) {
      return;
    }

    api
      .addDrink(billId, selectedItem, sessionId, amount)
      .catch((error) => Snackbar.show({text: error.message, duration: Snackbar.LENGTH_SHORT}))
      .then(() => {
        navigation.navigate("Session");
      });
  };

  const styles = StyleSheet.create({
    content: {
      flex: 1,
      width: "100%",
    },
    list: {
      flex: 1,
      flexDirection: "column",
      alignSelf: "center",
      width: "105%",
    },
    modal: {
      justifyContent: "center",
      alignItems: "center",
      alignSelf: "center",
      padding: 10,
      height: "100%",
      backgroundColor: "rgba(0,0,0,0.8)",
      width: "100%",
    },
    confirmButton: {
      width: 200,
      height: 70,
      marginTop: 30,
      borderRadius: 5,
      backgroundColor: theme.BACKGROUND_BUTTON_PRIMARY,
      alignItems: "center",
      justifyContent: "center",
    },
    confirmButton__text: {
      fontSize: 30,
      fontFamily: theme.FONT_MEDIUM,
      color: theme.TEXT_BUTTON_PRIMARY,
    },
    dialog: {
      maxHeight: 200,
      minWidth: 200,
      backgroundColor: theme.BACKGROUND_SECONDARY,
      borderRadius: 5,
      flex: 1,
      flexDirection: "column",
      overflow: "hidden",
    },
    dialogContent: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    dialogContent__text: {
      fontSize: 50,
      marginTop: 25,
      textAlign: "center",
      fontFamily: theme.FONT_MEDIUM,
      color: theme.TEXT_SECONDARY,
    },
    dialogButtons: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "space-between",
    },
    dialogButton: {
      flex: 0.48,
      backgroundColor: theme.BACKGROUND_SECONDARY,
      justifyContent: "center",
      alignItems: "center",
    },
    dialogButton__text: {
      fontSize: 50,
      textAlign: "center",
      fontFamily: theme.FONT_MEDIUM,
      color: theme.TEXT_SECONDARY,
    },
  });

  const listItem = (drink) => {
    return (
      <BarTapListItem
        onPress={() => selectAmount(drink.id)}
        name={`${drink.brand} ${drink.name}`}
        price={drink.price.toFixed(2)}
      />
    );
  };

  return (
    <BarTapContent navigation={navigation} title={"Add product"}>
      <View style={styles.content}>
        <BarTapTitle text={category.name} level={1} />
        <FlatList
          refreshControl={
            <RefreshControl
              onRefresh={() => setLoading(true)}
              refreshing={isLoading}
              tintColor={theme.LOADING_INDICATOR}
            />
          }
          keyExtractor={(item) => item.id.toString()}
          style={styles.list}
          data={drinks}
          renderItem={({ item }) => listItem(item)}
        />
      </View>
      <Modal
        animationType="fade"
        visible={dialogOpen}
        transparent={true}
        onRequestClose={() => {
          setDialogOpen(!dialogOpen);
        }}
      >
        <TouchableOpacity
          style={styles.modal}
          activeOpacity={0.2}
          onPressOut={() => setDialogOpen(false)}
        >
          <View style={styles.dialog}>
            <View style={styles.dialogContent}>
              <TextInput
                underline="transparent"
                keyboardType={"number-pad"}
                defaultValue={JSON.stringify(amount)}
                onChangeText={(value) => {
                  value && setAmount(parseInt(value));
                }}
                style={styles.dialogContent__text}
              />
            </View>
            <View style={styles.dialogButtons}>
              <TouchableOpacity
                onPress={() =>
                  amount <= 1 ? setAmount(1) : setAmount(amount - 1)
                }
                style={styles.dialogButton}
              >
                <Text style={styles.dialogButton__text}>-</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setAmount(amount + 1)}
                style={styles.dialogButton}
              >
                <Text style={styles.dialogButton__text}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => addItem(navigation, billId, sessionId)}
            style={styles.confirmButton}
          >
            <Text style={styles.confirmButton__text}>Confirm</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </BarTapContent>
  );
}
