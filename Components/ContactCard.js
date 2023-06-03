import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const ContactCard = React.memo(({ item, onPress }) => {
  return (
    <TouchableOpacity onPress={() => onPress(item)}>
      <View style={styles.contactCard}>
        <Text style={styles.contactName}>
          {item.firstName} {item.lastName}
        </Text>
        {item.phoneNumbers && item.phoneNumbers.length > 0 && (
          <Text style={styles.contactPhoneNumber}>
            {item.phoneNumbers[0].number}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  contactCard: {
    padding: 16,
    backgroundColor: "#0F4C75",
    marginBottom: 16,
    borderRadius: 8,
    elevation: 2,
  },
  contactName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#BBE1FA",
  },
  contactPhoneNumber: {
    fontSize: 16,
    color: "#BBE1FA",
  },
});

export default ContactCard;
