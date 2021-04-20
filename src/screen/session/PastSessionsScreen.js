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
import BarTapStackHeader from "../../component/BarTapStackHeader";
import { TouchableOpacity } from "react-native-gesture-handler";
import BarTapHeader from "../../component/BarTapHeader";
import BarTapTitle from "../../component/BarTapTitle/index.js";
import BarTapListItem from "../../component/BarTapListItem/index.js";

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
          setSessions(sortedSessions);
          setLoading(false);
        })
        .catch((error) => {
          alert(error);
          setLoading(false);
        });
    }
  }, [isLoading]);

  const handlePress = (sessionId, sessionName) => {
    navigation.navigate("Session Bills", {
      sessionId: sessionId,
      sessionName: sessionName,
    });
  };

  const listItem = (session) => {
    const timestamp = new Date(session.creationDate);
    return (
      <BarTapListItem
        onPress={() => handlePress(session.id, session.name)}
        name={session.name}
        date={timestamp}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <BarTapHeader navigation={navigation} />
      <View style={styles.content}>
        <BarTapTitle text={"Past sessions"} level={1} />
        <FlatList
          refreshControl={
            <RefreshControl refreshing={isLoading} tintColor="white" />
          }
          refreshing={isLoading}
          onRefresh={() => setLoading(true)}
          keyExtractor={(item) => item.id.toString()}
          style={styles.list}
          data={sessions}
          renderItem={({ item }) => listItem(item)}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: colors.BARTAP_BLACK,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  content: {
    flex: 1,
    width: "100%",
    paddingHorizontal: 10,
  },
  list: {
    flex: 1,
    flexDirection: "column",
    alignSelf: "center",
    width: "100%",
  },
});
