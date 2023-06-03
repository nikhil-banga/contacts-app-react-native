import React from "react";
import { View, StyleSheet } from "react-native";
import ContactsScreen from "./screens/ContactsScreen";

export default function App() {
  return (
    <View style={styles.container}>
      <ContactsScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
});
