import React from "react";
import { View, Text, TouchableHighlight, StyleSheet } from "react-native";
import { colors } from "../../theme/variables.js";

export default function BarTapListItem({
  onPress,
  timestamp,
  name,
  multiplier,
  price,
  date,
}) {
  return (
    <TouchableHighlight onPress={onPress}>
      <View style={styles.wrapper}>
        {timestamp && (
          <Text style={styles.timestamp}>
            {timestamp.getHours() < 10
              ? "0" + timestamp.getHours()
              : timestamp.getHours()}
            :
            {timestamp.getMinutes() < 10
              ? "0" + timestamp.getMinutes()
              : timestamp.getMinutes()}
          </Text>
        )}
        {name && (<Text numberOfLines={1} style={styles.name}>{name}</Text>)}
        <View style={styles.right}>
          {multiplier && (<Text style={styles.multiplier}>{multiplier}x</Text>)}
          {price && (<Text style={styles.price}>€{price}</Text>)}
          {date && (
            <Text style={styles.price}>
              {date.getDate()}-{date.getMonth() + 1}-
              {date.getFullYear()}
            </Text>
          )}
        </View>
      </View>
    </TouchableHighlight>
  );
}

export const styles = StyleSheet.create({
  wrapper: {
    alignSelf: "center",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: colors.BARTAP_BLACK,
    borderBottomColor: colors.BARTAP_DARK_GREY,
    borderBottomWidth: 2,
    width: "100%",
    maxHeight: 60,
  },
  timestamp: {
    fontSize: 20,
    color: colors.BARTAP_LIGHT_GREY,
    marginRight: 10,
  },
  name: {
    fontSize: 20,
    color: colors.BARTAP_WHITE,
    marginRight: 5,
    flex: 1,
    width: "auto",
  },
  multiplier: {
    fontSize: 15,
    color: colors.BARTAP_WHITE,
    marginLeft: "auto",
  },
  price: {
    fontSize: 20,
    color: colors.BARTAP_WHITE,
    fontWeight: "bold",
    marginLeft: 20,
  },
  right: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "auto",
  },
});
