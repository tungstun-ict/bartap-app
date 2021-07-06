import React, { useEffect, useState } from "react";
import { FlatList, Modal, RefreshControl, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

import BarTapListItem from "../../component/BarTapListItem/index.js";
import BarTapStackHeader from "../../component/BarTapStackHeader";
import BarTapTitle from "../../component/BarTapTitle/index.js";
import * as api from "../../service/BarApiService.js";
import { darkTheme } from "../../theme/variables.js";

export default function AddDrinksScreen({ route, navigation }) {
  const [drinks, setDrinks] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [amount, setAmount] = useState(1);
  const [selectedItem, setSelectedItem] = useState(null);
  const { category, billId, sessionId } = route.params;

  useEffect(() => {
    if (isLoading) {
      api
        .getDrinksByCategory(category.id)
        .then((json) => {
          setDrinks(json);
          setLoading(false);
        })
        .catch((error) => {
          alert(error);
          setLoading(false);
        });
    }
  }, [isLoading]);

  const selectAmount = (drink) => {
    setSelectedItem(drink)
    setDialogOpen(true);
  }

  const addItem = (navigation, billId, sessionId) => {
    if(selectedItem === null) {
      return;
    }
    
    api
      .addDrink(billId, selectedItem, sessionId, amount)
      .catch((error) => alert(error))
      .then(() => {
        navigation.navigate("Session");
      });
  }

  const listItem = (drink) => {
    return (
      <BarTapListItem
        onPress={() => selectAmount(drink.id)}
        name={`${drink.brand} ${drink.name}`}
        price={drink.price.toFixed(2)}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <BarTapStackHeader navigation={navigation} title="Add product" />
      <View style={styles.content}>
        <BarTapTitle text={category.name} level={1} />
        <FlatList
          refreshControl={
            <RefreshControl
              onRefresh={() => setLoading(true)}
              refreshing={isLoading}
              tintColor="white"
            />
          }
          keyExtractor={(item) => item.id.toString()}
          style={styles.list}
          data={drinks}
          renderItem={({ item }) =>
            listItem(item)
          }
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
        <TouchableOpacity style={styles.modal}
          activeOpacity={0.2}
          onPressOut={() => setDialogOpen(false)}>
          <View style={styles.dialog}>
            <View style={styles.dialogContent}>
              <TextInput 
                underline="transparent"
                keyboardType={"number-pad"}
                defaultValue={JSON.stringify(amount)}
                onChangeText={(value) => { value && setAmount(parseInt(value))}}
                style={styles.dialogContent__text} />
            </View>
            <View style={styles.dialogButtons}>
              <TouchableOpacity 
                onPress={() => amount <= 1 ? setAmount(1) : setAmount(amount - 1)}
                style={styles.dialogButton}>
                <Text style={styles.dialogButton__text}>-</Text>
                </TouchableOpacity>
              <TouchableOpacity 
                onPress={() => setAmount(amount + 1)}
                style={styles.dialogButton}>
                <Text style={styles.dialogButton__text}>+</Text>
                </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity 
            onPress={() => addItem(navigation, billId, sessionId)}
            style={styles.confirmButton}>
              <Text style={styles.confirmButton__text}>Confirm</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
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
  list: {
    flex: 1,
    flexDirection: "column",
    alignSelf: "center",
    width: "100%",
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
    backgroundColor: darkTheme.BARTAP_WHITE,
    alignItems: "center",
    justifyContent: "center",
  },
  confirmButton__text: {
    fontSize: 30,
    fontWeight: "bold",
    color: darkTheme.BARTAP_BLACK,
  },
  dialog: {
    maxHeight: 200,
    minWidth: 200,
    backgroundColor: darkTheme.BARTAP_DARK_GREY,
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
    textAlign: "center",
    fontWeight: "bold",
    color: darkTheme.BARTAP_WHITE,

  },
  dialogButtons: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dialogButton: {
    flex: 0.48,
    backgroundColor: darkTheme.BARTAP_GREY,
    justifyContent: "center",
    alignItems: "center"
  },
  dialogButton__text: {
    fontSize: 50,
    textAlign: "center",
    fontWeight: "bold",
    color: darkTheme.BARTAP_WHITE,
  }
});
