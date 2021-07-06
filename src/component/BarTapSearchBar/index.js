import React, { useState } from "react";
import { Image, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

import { colors } from "../../theme/variables.js";

export default function BarTapSearchBar({ onSubmitEditing, onPress, isEmpty, onChangeText, placeholder }) {
  const [searchString, setSearchString] = useState("")


  return (
    <View style={styles.searchBar}>
      <TextInput 
        placeholder={placeholder}
        placeholderTextColor={colors.BARTAP_LIGHT_GREY}
        // onSubmitEditing={() => onSubmitEditing(searchString)}
        onChangeText={(string) => {
            setSearchString(string); 
            if(onChangeText) {
                onChangeText(string); 
            }
            if(string.length === 0){
                isEmpty();
            }
        }}
        onSubmitEditing={() => onPress(searchString)}
        underline="transparent" 
        onEndEditing={onSubmitEditing}
        style={styles.searchBar__input} />
      <TouchableOpacity 
        onPress={() => onPress(searchString)}
        style={styles.searchBar__button}>
        <Image
          style={styles.searchBar__buttonImage}
          source={require("../../assets/search.png")}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
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
