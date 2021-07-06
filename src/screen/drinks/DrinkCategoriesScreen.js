import React, { useEffect, useState } from "react";
import { RefreshControl, SafeAreaView } from "react-native";
import { StyleSheet, Text, View, RefreshControl } from "react-native";
import { Dimensions, FlatList, TouchableOpacity, Image, TextInput, TouchableOpacity } from "react-native";

import BarTapCountDialog from "../../component/BarTapCountDialog";
import BarTapListItem from "../../component/BarTapListItem";
import BarTapSearchBar from "../../component/BarTapSearchBar";
import BarTapContent from "../../component/BarTapContent";
import BarTapStackHeader from "../../component/BarTapStackHeader";
import * as api from "../../service/BarApiService.js";
import { ThemeContext } from "../../theme/ThemeManager";

export default function DrinkCategoriesScreen({ route, navigation }) {
  const { theme } = React.useContext(ThemeContext);

  const [searchString, setSearchString] = useState("");
  const [categories, setCategories] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [isCategoriesLoading, setCategoriesLoading] = useState(true);
  const [isSearchLoading, setSearchLoading] = useState(false);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [amount, setAmount] = useState(1);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    if (isCategoriesLoading) {
      api
        .getCategories()
        .then((json) => {
          setCategories(
            json.sort(function (a, b) {
              return b.id < a.id;
            }),
          );
          setCategoriesLoading(false);
        })
        .catch((error) => {
          alert(error);
          setCategoriesLoading(false);
        });
    }
  }, [isCategoriesLoading]);

  useEffect(() => {
    if (isSearchLoading) {
      api
        .getSearchResults()
        .then((json) => {
          setSearchResults(json);
          setSearchLoading(false);
        })
        .catch((error) => {
          alert(error);
          setSearchLoading(false);
        });
    }
  }, [isSearchLoading]);

  const { billId, sessionId } = route.params;

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
        name: "WOW",
        productType: "OTHER",
      });
      numberOfElementsLastRow++;
    }

    return data;
  };

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

  const search = (string) => {
    if (string.length === 0) {
      setSearchLoading(false);
      setSearchString("");
      return;
    }
    setSearchString(string);
    setSearchLoading(true);
  };

  const listItem = (drink) => {
    return (
        <BarTapListItem
            onPress={() => selectAmount(drink.id)}
            name={`${drink.brand} ${drink.name}`}
            price={drink.price.toFixed(2)}
        />
    );
  };

  const styles = StyleSheet.create({
    itemInvisible: {
      backgroundColor: "transparent",
    },
    category: {
      flex: 1,
      flexDirection: "column",
      backgroundColor: theme.BACKGROUND_BUTTON_BIG,
      justifyContent: "center",
      alignItems: "center",
      marginVertical: 10,
      maxHeight: Dimensions.get("window").height / 7,
      maxWidth: Dimensions.get("window").width / 2 - 30,
      minHeight: Dimensions.get("window").height / 7,
      minWidth: Dimensions.get("window").width / 2 - 30,
      borderRadius: 5,
    },
    categories__row: {
      flex: 1,
      justifyContent: "space-around",
    },
    category__name: {
      textAlign: "center",
      fontSize: 20,
      fontWeight: "bold",
      color: theme.TEXT_DARK,
    },
    categories: {
      marginVertical: 10,
      width: "100%",
    },
    searchBar__container: {
      height: 50,
      width: "100%",
      alignItems: "center",
      justifyContent: "center",
      padding: 10,
      marginTop: 10,
    },
    list: {
      flex: 1,
      flexDirection: "column",
      alignSelf: "center",
      width: "100%",
    },
    searchBar: {
      backgroundColor: colors.BARTAP_WHITE,
      width: "100%",
      height: 50,
      borderRadius: 5,
      flexDirection: "row",
    },
    searchBar__input: {
      flex: 1,
      color: colors.BARTAP_BLACK,
      fontSize: 20,
      fontWeight: "bold",
      marginLeft: 10,
    },
    searchBar__button: {
      width: 50,
      height: "100%",
      justifyContent: "center",
      alignItems: "center",
    },
    searchBar__buttonImage: {
      tintColor: colors.BARTAP_BLACK,
      height: 40,
      width: 40,
    },
  });

  const CategoriesContent = () => {
    return (
        <View style={styles.categories}>
          <FlatList
              refreshControl={
                <RefreshControl
                    onRefresh={() => setCategoriesLoading(true)}
                    refreshing={isCategoriesLoading}
                    tintColor="white"
                />
              }
              data={formatData(categories, 2)}
              renderItem={({ item }) => {
                if (item.empty === true) {
                  return <View style={[styles.category, styles.itemInvisible]} />;
                } else {
                  return categoryListItem(navigation, item, billId, sessionId);
                }
              }}
              keyExtractor={(item) => item.id.toString()}
              numColumns={2}
              columnWrapperStyle={styles.categories__row}
          />
        </View>
    );
  };

  const SearchResultsContent = () => {
    return (
      <>
        <FlatList
            refreshControl={
              <RefreshControl
                  onRefresh={() => setSearchLoading(true)}
                  refreshing={isCategoriesLoading}
                  tintColor="white"
              />
            }
            keyExtractor={(item) => item.id.toString()}
            style={styles.list}
            data={searchResults}
            renderItem={({ item }) => listItem(item)}
        />
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
      </>
    );
  };

  const handleOnPress = (navigation, category, billId, sessionId) => {
    navigation.navigate("Add Drink", {
      category,
      billId,
      sessionId,
    });
  }

  const categoryListItem = (navigation, category, billId, sessionId) => {
    return (
      <TouchableOpacity
        onPress={() => handleOnPress(navigation, category, billId, sessionId)}
      >
        <View style={styles.category}>
          <Text style={styles.category__name}>{category.name}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <BarTapContent navigation={navigation} title={"Add product"}>
      <View style={styles.categories}>
          <View style={styles.searchBar__container}>
            <View style={styles.searchBar}>
              <TextInput style={styles.searchBar__input} />
              <TouchableOpacity
                  style={styles.searchBar__button}>
                <Image
                    style={styles.searchBar__buttonImage}
                    source={require("../../assets/search.png")}
                />
              </TouchableOpacity>
            </View>
          </View>
          <FlatList
            refreshControl={
              <RefreshControl onRefresh={() => setLoading(true)} refreshing={isLoading} tintColor="white" />
            }
            data={formatData(categories, 2)}
            renderItem={({ item }) => {
              if (item.empty === true) {
                return <View style={[styles.category, styles.itemInvisible]} />;
              } else {
                return categoryListItem(navigation, item, billId, sessionId)
              }
            }}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            columnWrapperStyle={styles.categories__row}
          />
        </View>
    </BarTapContent>
  );
}
