import React, { useContext } from "react";
import { SafeAreaView } from "react-native";
import { StyleSheet, Text, View, Image } from "react-native";
import variables, { theme, mock, sizes } from "../../theme/variables.js";
import { Button, TextInput, TouchableOpacity } from "react-native";
import BarTapHeader from "../../component/BarTapHeader";
import * as api from "../../service/BarApiService.js";
import { AuthContext } from "../../service/Context.js";
import BarTapButton from "../../component/BarTapButton/index.js";
import { ThemeContext } from "../../theme/ThemeManager.js";
import BarTapContent from "../../component/BarTapContent/index.js";

export default function LoginScreen({ navigation }) {
  const { theme } = React.useContext(ThemeContext);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const { signIn } = useContext(AuthContext);

  const styles = StyleSheet.create({
    content: {
      width: "100%",
      height: "100%",
      justifyContent: "center",
      alignItems: "center"
    },
    logo: {
      height: 120,
      tintColor: theme.BACKGROUND_IMAGE,
    },
    logoText: {
      color: theme.TEXT_PRIMARY,
      fontSize: 40,
      fontWeight: "bold",
      marginBottom: 20,
    },
    form: {
      width: "100%",
    },
    link: {
      color: theme.TEXT_LOW_CONTRAST,
      textAlign: "center",
      textDecorationLine: "underline",
    },
    input: {
      width: "100%",
      marginVertical: 10,
      color: theme.TEXT_PRIMARY,
      borderColor: theme.LINE_DARKMODE,
      borderWidth: 1,
      backgroundColor: theme.BACKGROUND_INPUT,
      borderRadius: 5,
      paddingLeft: 10,
      height: 50,
    },
    button: {
      marginBottom: 20,
    },
  });

  return (
    <BarTapContent navigation={navigation} noHeader>
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
          placeholderTextColor={theme.TEXT_HINT}
          autoCompleteType={"email"}
          value={email}
          onChangeText={setEmail}
          keyboardType={"email-address"}
          multiline={false}
          style={styles.input}
        />
        <TextInput
          placeholder={"Password"}
          placeholderTextColor={theme.TEXT_HINT}
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
          style={styles.button}
        />
        <Text
          onPress={() => {
            alert(
              "Feature not available, ask administrators for account credentials.",
            );
          }}
          style={styles.link}
        >
          I do not have an account
        </Text>
      </View>
      </View>
    </BarTapContent>
  );
}
