import React, { useState, useEffect } from "react";
import * as api from "../../service/BarApiService.js";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  FlatList,
  RefreshControl,
} from "react-native";
import variables, { colors, mock, sizes } from "../../theme/variables.js";
import StackHeaderLayout from "../../layout/StackHeaderLayout";
import { TouchableOpacity } from "react-native-gesture-handler";
import HeaderLayout from "../../layout/HeaderLayout.js";

export default function PastSessionsScreen({ route, navigation }) {
  const [isLoading, setLoading] = useState(true);
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      setLoading(true);
      setSessions([]);
    });
    return unsubscribe;
  });

  useEffect(() => {
    if (isLoading) {
      api
        .getAllSessions()
        .then((sessions) => {
          return sessions.sort((x, y) => {
            return new Date(y.creationDate) - new Date(x.creationDate);
          });
        })
        .then((sortedSessions) => {
          console.log(sortedSessions);
          setSessions(sortedSessions);
          setLoading(false);
        })
        .catch((error) => {
          alert(error);
          setLoading(false);
        });
    }
  }, [isLoading]);

  const listItem = (navigation, session) => {
    const timestamp = new Date(session.creationDate);
    return (
      <TouchableOpacity onPress={() => handlePress(navigation, session.id)}>
        <View style={styles.listItem}>
          <Text numberOfLines={1} style={styles.listItem__name}>
            {session.name}
          </Text>
          <Text style={styles.listItem__price}>
            {timestamp.getDate()}-{timestamp.getMonth() + 1}-
            {timestamp.getFullYear()}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <HeaderLayout navigation={navigation} />
      <Text style={styles.title}>Past sessions</Text>
      <View style={styles.content}>
        <FlatList
          refreshControl={
            <RefreshControl refreshing={isLoading} tintColor="white" />
          }
          refreshing={isLoading}
          onRefresh={() => setLoading(true)}
          keyExtractor={(item) => item.id.toString()}
          style={styles.list}
          data={sessions}
          renderItem={({ item }) => listItem(navigation, item)}
        />
      </View>
    </SafeAreaView>
  );
}

function handlePress(navigation, sessionId) {
  navigation.navigate("Past session", { sessionId: sessionId });
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
    width: "100%",
  },
  title: {
    height: 40,
    margin: 10,
    color: colors.TEXT_PRIMARY,
    fontSize: sizes.TITLE,
    fontWeight: "bold",
  },
  list: {
    flex: 1,
    flexDirection: "column",
    alignSelf: "center",
    width: "100%",
  },
  listItem: {
    alignSelf: "center",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    height: 50,
    backgroundColor: colors.BACKGROUND,
    borderBottomColor: colors.ELEMENT_BACKGROUND,
    borderBottomWidth: 2,
    width: "95%",
  },
  listItem__name: {
    fontSize: 20,
    width: "60%",
    color: colors.TEXT_PRIMARY,
  },
  listItem__price: {
    fontSize: 20,
    color: colors.TEXT_PRIMARY,
    fontWeight: "bold",
    marginLeft: "auto",
  },
  listItem__footer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    width: "95%",
    backgroundColor: colors.ELEMENT_BACKGROUND,
    borderRadius: 5,
    marginTop: 10,
    alignSelf: "center",
  },
  listItem__footer__text: {
    color: colors.TEXT_SECONDARY,
    fontSize: 20,
    fontWeight: "bold",
  },
});
