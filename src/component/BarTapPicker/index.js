import { Picker } from "@react-native-picker/picker";
import React from "react";
import { StyleSheet, View } from "react-native";

import { ThemeContext } from "../../theme/ThemeManager";

export default function BarTapPicker({
  children,
  style,
  onValueChange,
  selectedValue,
  setDefaultvalue,
  items,
}) {
  const { theme } = React.useContext(ThemeContext);

  const styles = StyleSheet.create({
    pickerContainer: {
      backgroundColor: theme.BACKGROUND_PICKER,
      width: "100%",
      borderRadius: 5,
      height: 60,
    },
    picker: {
      height: 60,
      color: theme.TEXT_PRIMARY,
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
  });

  return (
    <View style={[styles.pickerContainer, style]}>
      <Picker
        style={styles.picker}
        selectedValue={selectedValue}
        defaultValue={setDefaultvalue}
        //itemStyle={styles.picker__item}
        onValueChange={onValueChange}
      >
        {children}
      </Picker>
    </View>
  );
}
