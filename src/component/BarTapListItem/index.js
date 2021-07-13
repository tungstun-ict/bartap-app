import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";

import { ThemeContext } from "../../theme/ThemeManager.js";

export default function BarTapListItem({
  onPress,
  timestamp,
  name,
  multiplier,
  price,
  payed,
  date,
  line2,
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
      width: "100%",
      paddingHorizontal: 10,
      maxHeight: 50,
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
    line2: {
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
    lines: {
      flexDirection: "column",
      borderBottomColor: theme.LINE_CONTRAST,
      borderBottomWidth: 2,
      minHeight: 50,
    },
    line2: {
      color: theme.TEXT_PRIMARY,
      fontSize: 20,
      paddingHorizontal: 10,
      height: 30, 
    },
    right: {
      flexDirection: "row",
      alignItems: "center",
      marginLeft: "auto",
    },
  });

  return (
    <TouchableHighlight onPress={onPress}>
      <View style={styles.lines}>
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
          </View>
        </View>
        {line2 && <Text style={styles.line2}>{line2}</Text>}
      </View>
    </TouchableHighlight>
  );
}
