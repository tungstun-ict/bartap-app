import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native";
import { StyleSheet, Text, View, Image } from "react-native";
import variables, { colors, mock } from "../../theme/variables.js";
import { Button } from "react-native";
import BarTapHeader from "../../component/BarTapHeader";
import BarTapStackHeader from "../../component/BarTapStackHeader";
import { TextInput } from "react-native";
import { Dimensions } from "react-native";
import * as api from "../../service/BarApiService.js";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ceil } from "react-native-reanimated";
import { apisAreAvailable } from "expo";
import BarTapButton from "../../component/BarTapButton/index.js";
import BarTapTitle from "../../component/BarTapTitle/index.js";

export default function NewSessionScreen({ navigation }) {
  const [name, setName] = useState("");

  const createSession = () => {
    if (name !== "") {
      api
        .createSession(name)
        .finally(() => {
          navigation.navigate("Session");
        })
        .catch((error) => alert(error));
    } else {
      alert("Name cannot be empty");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <BarTapStackHeader navigation={navigation} title="New Session" />
      <View style={styles.content}>
        <BarTapTitle text={"Name"} level={2} />
        <TextInput
          autoCompleteType={"name"}
          onChangeText={setName}
          multiline={false}
          style={styles.input}
        />
        <BarTapButton
          style={styles.button}
          onPress={() => createSession()}
          text={"Submit"}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: colors.BARTAP_BLACK,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  content: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 10,
  },
  input: {
    width: "100%",
    color: colors.BARTAP_WHITE,
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    height: 50,
  },
  button: {
    marginTop: 10,
  },
});
