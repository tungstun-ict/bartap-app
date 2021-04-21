import React, { useState, useEffect } from "react";
import { View, SafeAreaView, Text, StyleSheet, Dimensions } from "react-native";
import BarTapButton from "../../component/BarTapButton/index.js";
import { colors } from "../../theme/variables.js";
import NfcManager, { NfcEvents, Ndef, NfcTech } from "react-native-nfc-manager";

export default function NFCScreen() {
  useEffect(() => {
    NfcManager.start();
    console.log("initializing the NFC library");
    NfcManager.setEventListener(NfcEvents.DiscoverTag, (tag) => {
      console.warn("tag", tag);
      NfcManager.setAlertMessage("Got the tag");
      NfcManager.unregisterTagEvent().catch(() => 0);
    });
  }, []);

  const buildUrlPayload = (valueToWrite) => {
      let message = Ndef.encodeMessage([
          Ndef.uriRecord(valueToWrite),
      ])
      console.log(message)
      return message;
  }

  const cleanup = () => {
      NfcManager.cancelTechnologyRequest().catch(()=> 0);
  }

  const cancelRead = () => {
    console.log("cancel trying to read tag")
    NfcManager.unregisterTagEvent().catch(() => 0);
  };

  const writeNfc = async () => {
    console.log("Trying to write tag")
    try {
        let resp = await NfcManager.requestTechnology(NfcTech.Ndef, {
            alertMessage: 'Ready to write tag'
        });
        let bytes = buildUrlPayload('https://www.youtube.com');
        await NfcManager.writeNdefMessage(bytes);
        console.warn("succes!");
        await NfcManager.setAlertMessage('I got the tag');
        cleanup()
    } catch (e) {
        console.warn(e);
        cleanup()
    }
  }

  const readTag = async () => {
    console.log("Trying to read tag")
    try {
      await NfcManager.registerTagEvent();
    } catch (e) {
      console.warn("e", e);
      NfcManager.unregisterTagEvent().catch(() => 0);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <BarTapButton onPress={readTag} text={"Read NFC tag"} />
        <BarTapButton onPress={cancelRead} text={"Cancel NFC tag"} />
        <BarTapButton onPress={writeNfc} text={"Write NFC tag"} />
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
