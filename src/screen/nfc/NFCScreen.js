import React, { useState, useEffect } from "react";
import { View, SafeAreaView, Text, StyleSheet, Dimensions } from "react-native";
import BarTapButton from "../../component/BarTapButton/index.js";
import { colors } from "../../theme/variables.js";
import NfcProxy from '../../service/NfcService.js';
import { encryptXor, decryptXor } from '../../service/XorEncryptionService.js';

export default function NFCScreen() {
  useEffect(() => {
    NfcProxy.init().catch();
  }, []);

  const readTag = async () => {
    console.warn(await NfcProxy.readTag());
  }

  console.log(encryptXor(1024));

  const writeTag = async (value) => {
      console.warn(await await NfcProxy.writeNdef({type: 'TEXT', value}));
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <BarTapButton onPress={readTag} text={"Read NFC tag"} />
        <BarTapButton text={"Cancel NFC tag"} />
        <BarTapButton onPress={() => writeTag(encryptXor(3))} text={"Write NFC tag"} />
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
    justifyContent: "center",
  },
  content: {
    flex: 1,
    marginTop: 20,
    flexDirection: "column",
    paddingHorizontal: 10,
    width: "100%",
  },
});
