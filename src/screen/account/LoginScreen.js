import React, { useContext } from "react";
import { SafeAreaView } from "react-native";
import { StyleSheet, Text, View, Image } from "react-native";
import variables, { colors, mock, sizes } from "../../theme/variables.js";
import { Button, TextInput, TouchableOpacity } from "react-native";
import BarTapHeader from "../../component/BarTapHeader";
import * as api from "../../service/BarApiService.js";
import { AuthContext } from "../../service/Context.js";

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
            placeholderTextColor={colors.TEXT_SECONDARY}
            autoCompleteType={"email"}
            value={email}
            onChangeText={setEmail}
            keyboardType={"email-address"}
            multiline={false}
            style={styles.input}
          />
          <TextInput
            placeholder={"Password"}
            placeholderTextColor={colors.TEXT_SECONDARY}
            autoCompleteType={"password"}
            value={password}
            onChangeText={setPassword}
            keyboardType={"default"}
            multiline={false}
            style={styles.input}
            secureTextEntry={true}
          />
          <TouchableOpacity
            onPress={() => signIn({ email: email, password: password })}
            style={styles.button__wrapper}
          >
            <View style={styles.button__submit}>
              <Text style={styles.button__text}>Log in</Text>
            </View>
          </TouchableOpacity>
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
    backgroundColor: colors.BACKGROUND,
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
    color: colors.TEXT_PRIMARY,
    fontSize: sizes.TITLE,
    fontWeight: "bold",
  },
  logo: {
    height: 120,
  },
  logoText: {
    color: colors.TEXT_PRIMARY,
    fontSize: 40,
    fontWeight: "bold",
    marginBottom: 20,
  },
  form: {
    width: "100%",
  },
  text: {
    color: colors.TEXT_TERTIARY,
    fontSize: 50,
    fontWeight: "bold",
  },
  link: {
    color: colors.TEXT_PRIMARY,
    textAlign: "center",
    textDecorationLine: "underline",
  },
  input: {
    width: "100%",
    marginVertical: 10,
    color: colors.TEXT_PRIMARY,
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    height: 50,
  },
  input__label: {
    color: colors.TEXT_PRIMARY,
    alignSelf: "flex-start",
    fontWeight: "bold",
    fontSize: 20,
    marginTop: 10,
  },
  button__submit: {
    height: 50,
    width: "100%",
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  button__wrapper: {
    minWidth: "100%",
    backgroundColor: colors.ELEMENT_BACKGROUND_LIGHT,
    borderRadius: 5,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  button__text: {
    fontSize: 15,
    fontWeight: "bold",
  },
});
