import React from "react";
import { TextInput, StyleSheet } from "react-native";

const SearchInput = ({ value, onChangeText }) => {
  return (
    <TextInput
      style={styles.searchInput}
      placeholder="Search contacts..."
      value={value}
      placeholderTextColor="#BBE1FA"
      onChangeText={onChangeText}
    />
  );
};

const styles = StyleSheet.create({
  searchInput: {
    padding: 16,
    borderBottomWidth: 1,
    marginBottom: 8,
    fontSize: 18,
    fontWeight: "bold",
    backgroundColor: "#0F4C75",
    color: "#BBE1FA",
    borderRadius: 8,
    elevation: 2,
  },
});

export default SearchInput;
