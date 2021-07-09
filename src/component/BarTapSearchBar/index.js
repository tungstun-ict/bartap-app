import React, { useState } from "react";
import { Image, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

import { ThemeContext } from "../../theme/ThemeManager";
import BarTapInput from "../BarTapInput";

export default function BarTapSearchBar({ onSubmitEditing, onPress, isEmpty, onChangeText, placeholder }) {
  const { theme } = React.useContext(ThemeContext);
  const [searchString, setSearchString] = useState("")
  
  const styles = StyleSheet.create({
    searchBar: {
      backgroundColor: theme.BACKGROUND_LOW_CONTRAST,
      width: "100%",
      height: 50,
      borderRadius: 5,
      flexDirection: "row",
    },
    searchBar__input: {
      flex: 1,
      color: theme.TEXT_PRIMARY,
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
      tintColor: theme.BACKGROUND_IMAGE,
      height: 40,
      width: 40,
    },
  });

  return (
    <View style={styles.searchBar}>
      <TextInput 
        placeholder={placeholder}
        placeholderTextColor={theme.TEXT_HINT}
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
          source={require("../../assets/search-icon.png")}
        />
      </TouchableOpacity>
    </View>
  );
}
