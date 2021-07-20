import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { RNCamera } from "react-native-camera";

import BarTapButton from "../../../component/BarTapButton/index.js";
import BarTapContent from "../../../component/BarTapContent/index.js";
import { ThemeContext } from "../../../theme/ThemeManager.js";

export default function CustomerNoBarsScreen({ route, navigation }) {
  const { theme } = React.useContext(ThemeContext);

  const [step, setStep] = useState(1);

  const barcodeRecognized = (barcode) => {
    setStep(4);
  };

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
    foundText: {
      color: theme.TEXT_PRIMARY,
      alignSelf: "center",
      marginTop: 50,
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
    checkIcon: {
      tintColor: theme.BACKGROUND_IMAGE,
      alignSelf: "center",
      height: 175,
      width: 175,
      tintColor: theme.BRAND,
      marginTop: 50,
    },
    cameraContainer: {
      flex: 1,
    },
    cameraPreview: {
      height: "100%",
      width: "100%",
    },
    backButton: {
      height: 50,
      width: 50,
      position: "absolute",
      margin: 10,
      zIndex: 1,
    },
    backButtonImage: {
      height: 40,
      width: 40,
      tintColor: theme.BACKGROUND_IMAGE,
    },
    foundBox: {
      backgroundColor: theme.BACKGROUND_LOW_CONTRAST,
      padding: 20,
      width: 250,
      alignSelf: "center",
      marginTop: 50,
      borderRadius: 5,
    },
    foundName: {
      textAlign: "center",
      fontFamily: theme.FONT_MEDIUM,
      color: theme.TEXT_PRIMARY,
    },
    foundBar: {
      textAlign: "center",
      color: theme.TEXT_PRIMARY,
      fontFamily: theme.FONT_MEDIUM,
    },
    foundLine: {
      height: 2,
      width: "100%",
      marginHorizontal: 20,
      marginVertical: 10,
      borderRadius: 5,
      backgroundColor: theme.BACKGROUND_IMAGE,
      alignSelf: "center",
    }
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

  const CameraContent = () => (
    <RNCamera
      type={RNCamera.Constants.Type.back}
      captureAudio={false}
      style={styles.cameraPreview}
      onBarCodeRead={(barcode) => barcodeRecognized(barcode)}
    >
      {({ camera, status, recordAudioPermissionStatus }) => {
        if (status !== "READY")
          return (
            <View
              style={{
                flex: 0,
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <Text style={styles.title}>Need permission for camera.</Text>
            </View>
          );
      }}
    </RNCamera>
  );

  const BarFoundContent = () => (
    <>
      <Text style={styles.foundText}>Profile found</Text>
      <Image
        style={styles.checkIcon}
        source={require("../../../assets/check.png")}
      />
      <View style={styles.foundBox}>
        <Text style={styles.foundName}>Jort Willemsen</Text>
        <View style={styles.foundLine}></View>
        <Text style={styles.foundBar}>Bartjes Bar</Text>
      </View>
      <BarTapButton
        onPress={() => setStep(3)}
        style={styles.button}
        text={"Connect profile"}
      />
    </>
  );

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
      ) : step === 3 ? (
        <CameraContent />
      ) : (
        <BarFoundContent />
      )}
    </BarTapContent>
  );
}
