import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import BarTapButton from "../../../component/BarTapButton/index.js";
import BarTapContent from "../../../component/BarTapContent/index.js";
import BarTapTitle from "../../../component/BarTapTitle/index.js";
import { ThemeContext } from "../../../theme/ThemeManager.js";

export default function CustomerCurrentSessionScreen({ route, navigation }) {
  const { theme } = React.useContext(ThemeContext);

  const [step, setStep] = useState(2);

  const styles = StyleSheet.create({
    title: {
      color: theme.TEXT_LOW_CONTRAST,
      alignSelf: "center",
      marginTop: 200,
      fontSize: 45,
      fontFamily: theme.FONT_MEDIUM,
    },
    explanation: {
      color: theme.TEXT_PRIMARY,
      alignSelf: "center",
      marginTop: 20,
      fontSize: 25,
      fontFamily: theme.FONT_MEDIUM,
      textAlign: "center",
      lineHeight: 30,
    },
    button: {
      width: "100%",
      marginTop: "auto",
    },
    qrIcon: {
      tintColor: theme.BACKGROUND_IMAGE,
      alignSelf: "center",
      marginTop: 100,
    },
    cameraContainer: {
      flex: 1,
      backgroundColor: theme.BACKGROUND_LOW_CONTRAST,
    },
    backButton: {
      height: 50,
      width: 50,
      position: "absolute",
      margin: 10,
    },
    backButtonImage: {
      height: 40,
      width: 40,
      tintColor: theme.BACKGROUND_IMAGE,
    },
  });

  const NoBarsContent = () => (
    <>
      <Text style={styles.title}>No bars found</Text>
      <BarTapButton
        style={styles.button}
        onPress={() => setStep(2)}
        text={"Connect new bar"}
      />
    </>
  );

  const ExplanationContent = () => (
    <>
      <Image
        style={styles.qrIcon}
        source={require("../../../assets/qr-icon.png")}
      />
      <Text style={styles.explanation}>
        Ask bartender to let you scan the QR code
      </Text>
      <BarTapButton
        onPress={() => setStep(3)}
        style={styles.button}
        text={"Scan QR code"}
      />
    </>
  );

  const CameraContent = () => <View style={styles.cameraContainer}></View>;

  return (
    <BarTapContent navigation={navigation}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => {
          if (step > 1) {
            setStep(step - 1);
          }
        }}
      >
        <Image
          source={require("../../../assets/back-icon.png")}
          style={styles.backButtonImage}
          resizeMode={"contain"}
        />
      </TouchableOpacity>
      {step === 1 ? (
        <NoBarsContent />
      ) : step === 2 ? (
        <ExplanationContent />
      ) : (
        <CameraContent />
      )}
    </BarTapContent>
  );
}
