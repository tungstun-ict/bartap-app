import React from "react";

export default function BarTapButton({ onPress, text }) {
  return (
    <TouchableOpacity
      onPress={() => onPress}
      style={styles.wrapper}
    >
      <View style={styles.button}>
        <Text style={styles.text}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    wrapper: {
        minWidth: "100%",
        backgroundColor: colors.ELEMENT_BACKGROUND_WARNING,
        borderRadius: 5,
        marginTop: "auto",
        marginBottom: 10,
        height: 40,
        alignItems: "center",
        justifyContent: "center",
      },
      button: {
        height: 50,
        width: "100%",
        marginVertical: 10,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
      },
      text: {
        fontSize: 15,
        fontWeight: "bold",
        color: colors.TEXT_PRIMARY,
      },
})
