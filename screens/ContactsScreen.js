import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import * as Contacts from "expo-contacts";

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

const renderContactItem = ({ item, onPress }) => {
  return <ContactCard item={item} onPress={onPress} />;
};

const ContactsScreen = () => {
  const [contacts, setContacts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);

  useEffect(() => {
    requestContactsPermission();
  }, []);

  useEffect(() => {
    filterContacts();
  }, [contacts, searchQuery]);

  const requestContactsPermission = async () => {
    const { status } = await Contacts.requestPermissionsAsync();

    if (status === "granted") {
      loadContacts();
    }
  };

  const loadContacts = async () => {
    const { data } = await Contacts.getContactsAsync({
      fields: [
        Contacts.Fields.FirstName,
        Contacts.Fields.LastName,
        Contacts.Fields.PhoneNumbers,
      ],
    });

    if (data.length > 0) {
      setContacts(data);
    }
  };

  const filterContacts = () => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const filtered = contacts.filter((contact) => {
      const fullName = `${contact.firstName} ${contact.lastName}`.toLowerCase();
      return fullName.includes(lowerCaseQuery);
    });
    setFilteredContacts(filtered);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const openContactDetails = (contact) => {
    setSelectedContact(contact);
    setModalVisible(true);

    const timeout = setTimeout(() => {
      setModalVisible(false);
    }, 5000);

    setTimeoutId(timeout);
  };

  const closeModal = () => {
    setModalVisible(false);
    clearTimeout(timeoutId);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Image
          source={require("../assets/c.png")}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.heading}>Contact App</Text>
      </View>

      <TextInput
        style={styles.searchInput}
        placeholder="Search contacts..."
        value={searchQuery}
        placeholderTextColor="#BBE1FA"
        onChangeText={handleSearch}
      />
      {filteredContacts && filteredContacts.length > 0 ? (
        <FlatList
          data={filteredContacts}
          renderItem={({ item }) =>
            renderContactItem({ item, onPress: openContactDetails })
          }
          keyExtractor={(item) => item.id}
        />
      ) : (
        <Text style={styles.loadingText}>Loading contacts...</Text>
      )}

      <Modal visible={modalVisible} animationType="fade" transparent>
        <TouchableWithoutFeedback onPress={closeModal}>
          <View style={styles.modalContainer}>
            <TouchableWithoutFeedback>
              <View style={styles.modalBox}>
                <Text style={styles.modalText}>
                  Name: {selectedContact?.firstName} {selectedContact?.lastName}
                </Text>
                <Text style={styles.modalText}>
                  Phone Number:{" "}
                  {selectedContact?.phoneNumbers &&
                  selectedContact.phoneNumbers.length > 0
                    ? selectedContact.phoneNumbers[0].number
                    : ""}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#1B262C",
  },
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
  loadingText: {
    fontSize: 16,
    marginTop: 16,
    color: "#BBE1FA",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    marginTop: 40, // Add this line to set the top margin
  },
  image: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },

  modalBox: {
    backgroundColor: "#1B262C",
    borderRadius: 8,
    padding: 16,
    margin: 16,
  },
  modalText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#BBE1FA",
  },
});

export default ContactsScreen;
