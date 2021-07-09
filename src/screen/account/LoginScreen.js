import React, { useContext } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import BarTapButton from "../../component/BarTapButton/index.js";
import BarTapContent from "../../component/BarTapContent/index.js";
import BarTapInput from "../../component/BarTapInput/index.js";
import { AuthContext } from "../../service/Context.js";
import { ThemeContext } from "../../theme/ThemeManager.js";

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
      alignItems: "center",
    },
    logoContainer: {
      top: 120,
      position: "absolute",
      flexDirection: "column",
      alignItems: "center",
      width: "100%",
    },  
    logo: {
      height: 120,
      tintColor: theme.BACKGROUND_IMAGE,
    },
    logoText: {
      color: theme.TEXT_PRIMARY,
      fontSize: 40,
      fontFamily: theme.FONT_MEDIUM,
    },
    form: {
      marginTop: 250,
      width: "100%",
    },
    link: {
      color: theme.TEXT_LOW_CONTRAST,
      textAlign: "center",
      textDecorationLine: "underline",
    },
    button: {
      marginBottom: 20,
    },
  });

  return (
    <BarTapContent navigation={navigation} noHeader>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            resizeMethod={"resize"}
            resizeMode={"contain"}
            source={require("../../assets/logo.png")}
          />
          <Text style={styles.logoText}>{mock.ORGANISATION_NAME}</Text>
        </View>
        <View style={styles.form}>
          <BarTapInput
            placeholder={"Email adress / username"}
            placeholderTextColor={theme.TEXT_HINT}
            autoCompleteType={"email"}
            value={email}
            onChangeText={setEmail}
            keyboardType={"email-address"}
          />
          <BarTapInput
            placeholder={"Password"}
            placeholderTextColor={theme.TEXT_HINT}
            autoCompleteType={"password"}
            value={password}
            onChangeText={setPassword}
            keyboardType={"default"}
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
