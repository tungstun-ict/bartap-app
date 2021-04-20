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
    }else {
      alert("Name cannot be empty");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <BarTapStackHeader navigation={navigation} title="New Session" />
      <View style={styles.content}>
        <Text style={styles.input__label}>Name</Text>
        <TextInput
          autoCompleteType={"name"}
          onChangeText={setName}
          multiline={false}
          style={styles.input}
        />
        <BarTapButton 
          onPress={() => createSession()}
          text={"Submit"}/>
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
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 10,
  },
  text: {
    color: colors.BARTAP_GREY,
    fontSize: 50,
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    marginVertical: 10,
    color: colors.BARTAP_WHITE,
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    height: 50,
  },
  input__label: {
    color: colors.BARTAP_WHITE,
    alignSelf: "flex-start",
    fontWeight: "bold",
    fontSize: 20,
    marginTop: 10,
  },
});
