import React, { useEffect, useState } from "react";
import { FlatList, RefreshControl, StyleSheet } from "react-native";
import Snackbar from 'react-native-snackbar';

import BarTapContent from "../../../component/BarTapContent/index.js";
import BarTapListItem from "../../../component/BarTapListItem/index.js";
import BarTapTitle from "../../../component/BarTapTitle/index.js";
import * as api from "../../../service/BarApiService.js";
import { ThemeContext } from "../../../theme/ThemeManager.js";

export default function PastSessionsScreen({ navigation }) {
  const { theme } = React.useContext(ThemeContext);

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
          Snackbar.show({text: error.message, duration: Snackbar.LENGTH_SHORT});
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

  const styles = StyleSheet.create({
    list: {
      flex: 1,
      flexDirection: "column",
      alignSelf: "center",
      width: "105%",
    },
  });

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
    <BarTapContent navigation={navigation}>
      <BarTapTitle text={"Past sessions"} level={1} />
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            tintColor={theme.LOADING_INDICATOR}
          />
        }
        refreshing={isLoading}
        onRefresh={() => setLoading(true)}
        keyExtractor={(item) => item.id.toString()}
        style={styles.list}
        data={sessions}
        renderItem={({ item }) => listItem(item)}
      />
    </BarTapContent>
  );
}
