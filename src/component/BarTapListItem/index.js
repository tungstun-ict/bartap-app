import React from "react";
import { Image, StyleSheet, Text, TouchableHighlight, View } from "react-native";

import { ThemeContext } from "../../theme/ThemeManager.js";
import { theme } from "../../theme/variables.js";

export default function BarTapListItem({
  onPress,
  timestamp,
  name,
  multiplier,
  price,
  payed,
  date,
  right,
}) {
  const { theme } = React.useContext(ThemeContext);
  
  const styles = StyleSheet.create({
    wrapper: {
      alignSelf: "center",
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "flex-start",
      backgroundColor: theme.BACKGROUND_PRIMARY,
      borderBottomColor: theme.LINE_CONTRAST,
      borderBottomWidth: 2,
      width: "100%",
      paddingHorizontal: 10,
      height: 50,
    },
    timestamp: {
      fontSize: 20,
      color: theme.TEXT_LOW_CONTRAST,
      marginRight: 10,
    },
    name: {
      fontSize: 20,
      color: theme.TEXT_PRIMARY,
      marginRight: 5,
      fontFamily: theme.FONT_MEDIUM,
      flex: 1,
      width: "auto",
    },
    multiplier: {
      fontSize: 15,
      color: theme.TEXT_LOW_CONTRAST,
      marginLeft: "auto",
    },
    price: {
      fontSize: 20,
      color: theme.TEXT_PRIMARY,
      fontFamily: theme.FONT_MEDIUM,
      marginLeft: 20,
    },
    right: {
      flexDirection: "row",
      alignItems: "center",
      marginLeft: "auto",
    },
    payed: {
      height: 20,
      width: 20,
      marginLeft: 10,
      tintColor: theme.BACKGROUND_IMAGE,
    },
  });

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
        {name && (
          <Text numberOfLines={1} style={styles.name}>
            {name}
          </Text>
        )}
        <View style={styles.right}>
          
          {multiplier && <Text style={styles.multiplier}>{multiplier}x</Text>}
          {price && <Text style={styles.price}>€{price}</Text>}
          {date && (
            <Text style={styles.price}>
              {date.getDate()}-{date.getMonth() + 1}-{date.getFullYear()}
            </Text>
          )}
          {payed && (
            <Image
              style={styles.payed}
              source={require("../../assets/check.png")}
            />
          )}
          {right && (
            <Text style={styles.price}>
            {right}
          </Text>
          )}
        </View>
      </View>
    </TouchableHighlight>
  );
}
