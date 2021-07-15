import React from "react";
import { StyleSheet, TextInput } from "react-native";

import { ThemeContext } from "../../theme/ThemeManager";

export default function ({
  onChangeText,
  onSubmitEditing,
  autoCompleteType,
  keyboardType,
  placeholder,
  placeholderTextColor,
  secureTextEntry,
  value,
  defaultValue
}) {
  const { theme } = React.useContext(ThemeContext);

  const styles = StyleSheet.create({
    input: {
      width: "100%",
      color: theme.TEXT_PRIMARY,
      borderColor: theme.LINE_DARKMODE,
      backgroundColor: theme.BACKGROUND_INPUT,
      borderWidth: 1,
      borderRadius: 5,
      paddingLeft: 10,
      height: 50,
      marginBottom: 10,
    },
  });

  return (
    <TextInput
      value={value}
      defaultValue={defaultValue}
      secureTextEntry={secureTextEntry}
      autoCompleteType={autoCompleteType}
      onSubmitEditing={onSubmitEditing}
      onChangeText={onChangeText}
      keyboardType={keyboardType}
      placeholder={placeholder}
      placeholderTextColor={placeholderTextColor}
      multiline={false}
      style={styles.input}
    />
  );
}
