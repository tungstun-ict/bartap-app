import React, { useContext } from "react";
import { SafeAreaView } from "react-native";
import { StyleSheet, Text, View, Image } from "react-native";
import variables, { darkTheme, mock, sizes } from "../../theme/variables.js";
import { Button, TextInput, TouchableOpacity } from "react-native";
import BarTapHeader from "../../component/BarTapHeader";
import * as api from "../../service/BarApiService.js";
import { AuthContext } from "../../service/Context.js";
import BarTapButton from "../../component/BarTapButton/index.js";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const { signIn } = useContext(AuthContext);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image
            style={styles.logo}
            resizeMethod={"resize"}
            resizeMode={"contain"}
            source={require("../../assets/logo.png")}
          />
          <Text style={styles.logoText}>{mock.ORGANISATION_NAME}</Text>
        <View style={styles.form}>
          <TextInput
            placeholder={"Email adress / username"}
            placeholderTextColor={darkTheme.BARTAP_LIGHT_GREY}
            autoCompleteType={"email"}
            value={email}
            onChangeText={setEmail}
            keyboardType={"email-address"}
            multiline={false}
            style={styles.input}
          />
          <TextInput
            placeholder={"Password"}
            placeholderTextColor={darkTheme.BARTAP_LIGHT_GREY}
            autoCompleteType={"password"}
            value={password}
            onChangeText={setPassword}
            keyboardType={"default"}
            multiline={false}
            style={styles.input}
            secureTextEntry={true}
          />
          <BarTapButton 
            onPress={() => signIn({ email: email, password: password })}
            text={"Log in"}
            style={styles.button}/>
          <Text
            onPress={() => {
              alert("Feature not available, ask administrators for account credentials.")
            }}
            style={styles.link}
          >
            I do not have an account
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: darkTheme.BARTAP_BLACK,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  content: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 10,
  },
  title: {
    height: 40,
    margin: 10,
    color: darkTheme.BARTAP_WHITE,
    fontSize: sizes.TITLE,
    fontWeight: "bold",
  },
  logo: {
    height: 120,
  },
  logoText: {
    color: darkTheme.BARTAP_WHITE,
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 20,
  },
  form: {
    width: "100%",
  },
  text: {
    color: darkTheme.BARTAP_GREY,
    fontSize: 50,
    fontWeight: "bold",
  },
  link: {
    color: darkTheme.BARTAP_WHITE,
    textAlign: "center",
    textDecorationLine: "underline",
  },
  input: {
    width: "100%",
    marginVertical: 10,
    color: darkTheme.BARTAP_WHITE,
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    height: 50,
  },
  input__label: {
    color: darkTheme.BARTAP_WHITE,
    alignSelf: "flex-start",
    fontWeight: "bold",
    fontSize: 20,
    marginTop: 10,
  },
  button: {
    marginBottom: 20,
  },
});
