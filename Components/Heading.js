import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const Heading = () => {
  return (
    <View style={styles.headerContainer}>
      <Image
        source={require("../assets/c.png")}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.heading}>Contact App</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 8,
    color: "#BBE1FA",
  },
  image: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
});

export default Heading;
