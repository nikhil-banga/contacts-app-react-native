import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Modal } from "react-native";
import * as Contacts from "expo-contacts";
import ContactCard from "./ContactCard";
import SearchInput from "./SearchInput";
import ModalBox from "./ModalBox";
import Heading from "./Heading";

const ContactsScreen = () => {
  const [contactsList, setContactsList] = useState([]);
  const [searchQueryText, setSearchQueryText] = useState("");
  const [filteredContactsList, setFilteredContactsList] = useState([]);
  const [selectedContactData, setSelectedContactData] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    requestContactsPermission();
  }, []);

  useEffect(() => {
    filterContacts();
  }, [contactsList, searchQueryText]);

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
      setContactsList(data);
    }
  };

  const filterContacts = () => {
    const lowerCaseQuery = searchQueryText.toLowerCase();
    const filtered = contactsList.filter((contact) => {
      const fullName = `${contact.firstName} ${contact.lastName}`.toLowerCase();
      return fullName.includes(lowerCaseQuery);
    });
    setFilteredContactsList(filtered);
  };

  const handleSearchQuery = (query) => {
    setSearchQueryText(query);
  };

  const openContactDetails = (contact) => {
    setSelectedContactData(contact);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Heading />

      <SearchInput value={searchQueryText} onChangeText={handleSearchQuery} />

      {filteredContactsList && filteredContactsList.length > 0 ? (
        <FlatList
          data={filteredContactsList}
          renderItem={({ item }) => (
            <ContactCard item={item} onPress={openContactDetails} />
          )}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <Text style={styles.loadingText}>Loading contacts...</Text>
      )}

      <Modal
        visible={isModalVisible}
        animationType="fade"
        transparent
        onRequestClose={closeModal}
      >
        <ModalBox
          closeModal={closeModal}
          selectedContact={selectedContactData}
        />
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
  loadingText: {
    fontSize: 16,
    marginTop: 16,
    color: "#BBE1FA",
  },
});

export default ContactsScreen;
