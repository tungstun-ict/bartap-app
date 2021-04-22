import React, { useState, useEffect } from "react";
import { View, SafeAreaView, Text, StyleSheet, Image } from "react-native";
import BarTapButton from "../../component/BarTapButton/index.js";
import { colors } from "../../theme/variables.js";
import NfcProxy from "../../service/NfcService.js";
import { encryptXor, decryptXor } from "../../service/XorEncryptionService.js";
import BottomSheet from "reanimated-bottom-sheet";
import BarTapBottomSheet from "../../component/BarTapBottomSheet/index.js";

export default function NFCScreen() {
  const [nfcStatus, setNfcStatus] = useState("searching");
  const sheetRef = React.useRef(null);

  useEffect(() => {
    NfcProxy.init().catch();
  }, []);

  const renderContent = () => {
    return (
      <BarTapBottomSheet height={450}>
        <Image
          style={styles.sheetLogo}
          source={require("../../assets/nfc.png")}
        />
        <Text style={styles.sheetText}>{nfcStatus}</Text>
      </BarTapBottomSheet>
    );
  };

  const closeBottomSheet = () => {
    sheetRef.current.snapTo(0);
    NfcProxy.closeNfcDiscovery();
    setNfcStatus("searching");
  };

  const readTag = async () => {
    sheetRef.current.snapTo(1);
    const tag = await NfcProxy.readTag();
    if (tag) {
      const ndef =
        Array.isArray(tag.ndefMessage) && tag.ndefMessage.length > 0
          ? tag.ndefMessage[0]
          : null;
      console.log(ndef)
      setNfcStatus(NfcProxy.d);
    } else {
      setNfcStatus("error");
    }
    setTimeout(closeBottomSheet, 3000);
  };

  const writeTag = async () => {
    console.warn(await NfcProxy.writeNdef({ type: "TEXT", value }));
  };

  const resetSheet = () => {
    setNfcStatus("searching");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <BarTapButton onPress={readTag} text={"Read NFC tag"} />
        <BarTapButton text={"Cancel NFC tag"} />
        <BarTapButton
          onPress={() => writeTag(encryptXor(3))}
          text={"Write NFC tag"}
        />
      </View>
      <BottomSheet
        enabledBottomInitialAnimation
        ref={sheetRef}
        snapPoints={[0, 450]}
        onCloseEnd={resetSheet}
        borderRadius={10}
        renderContent={renderContent}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: colors.BARTAP_BLACK,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    flex: 1,
    marginTop: 20,
    flexDirection: "column",
    paddingHorizontal: 10,
    width: "100%",
  },
  sheetLogo: {
    height: 100,
    width: 100,
    tintColor: colors.BARTAP_WHITE,
    alignSelf: "center",
    marginTop: 20,
  },
  sheetText: {
    alignSelf: "center",
    fontSize: 20,
    color: colors.BARTAP_WHITE,
    fontWeight: "bold",
    marginTop: 20,
    textAlign: "center",
  },
});
