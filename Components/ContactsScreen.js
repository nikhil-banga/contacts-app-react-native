// import React, { useEffect, useState } from "react";
// import { View, Text, FlatList, StyleSheet, Modal } from "react-native";
// import * as Contacts from "expo-contacts";
// import ContactCard from "./ContactCard";
// import SearchInput from "./SearchInput";
// import ModalBox from "./ModalBox";
// import Heading from "./Heading";

// const ContactsScreen = () => {
//   const [contacts, setContacts] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [filteredContacts, setFilteredContacts] = useState([]);
//   const [selectedContact, setSelectedContact] = useState(null);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [timeoutId, setTimeoutId] = useState(null);

//   useEffect(() => {
//     requestContactsPermission();
//   }, []);

//   useEffect(() => {
//     filterContacts();
//   }, [contacts, searchQuery]);
//   const requestContactsPermission = async () => {
//     const { status } = await Contacts.requestPermissionsAsync();

//     if (status === "granted") {
//       loadContacts();
//     }
//   };

//   const loadContacts = async () => {
//     const { data } = await Contacts.getContactsAsync({
//       fields: [
//         Contacts.Fields.FirstName,
//         Contacts.Fields.LastName,
//         Contacts.Fields.PhoneNumbers,
//       ],
//     });

//     if (data.length > 0) {
//       setContacts(data);
//     }
//   };

//   const filterContacts = () => {
//     const lowerCaseQuery = searchQuery.toLowerCase();
//     const filtered = contacts.filter((contact) => {
//       const fullName = `${contact.firstName} ${contact.lastName}`.toLowerCase();
//       return fullName.includes(lowerCaseQuery);
//     });
//     setFilteredContacts(filtered);
//   };

//   const handleSearch = (query) => {
//     setSearchQuery(query);
//   };

//   const openContactDetails = (contact) => {
//     setSelectedContact(contact);
//     setModalVisible(true);

//     const timeout = setTimeout(() => {
//       setModalVisible(false);
//     }, 5000);

//     setTimeoutId(timeout);
//   };

//   const closeModal = () => {
//     setModalVisible(false);
//     clearTimeout(timeoutId);
//   };

//   return (
//     <View style={styles.container}>
//       <Heading />

//       <SearchInput value={searchQuery} onChangeText={handleSearch} />

//       {filteredContacts && filteredContacts.length > 0 ? (
//         <FlatList
//           data={filteredContacts}
//           renderItem={({ item }) => (
//             <ContactCard item={item} onPress={openContactDetails} />
//           )}
//           keyExtractor={(item) => item.id}
//         />
//       ) : (
//         <Text style={styles.loadingText}>Loading contacts...</Text>
//       )}

//       <Modal visible={modalVisible} animationType="fade" transparent>
//         <ModalBox closeModal={closeModal} selectedContact={selectedContact} />
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//     backgroundColor: "#1B262C",
//   },
//   loadingText: {
//     fontSize: 16,
//     marginTop: 16,
//     color: "#BBE1FA",
//   },
// });

// export default ContactsScreen;
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, Modal } from "react-native";
import * as Contacts from "expo-contacts";
import ContactCard from "./ContactCard";
import SearchInput from "./SearchInput";
import ModalBox from "./ModalBox";
import Heading from "./Heading";

const ContactsScreen = () => {
  const [contacts, setContacts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

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
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Heading />

      <SearchInput value={searchQuery} onChangeText={handleSearch} />

      {filteredContacts && filteredContacts.length > 0 ? (
        <FlatList
          data={filteredContacts}
          renderItem={({ item }) => (
            <ContactCard item={item} onPress={openContactDetails} />
          )}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <Text style={styles.loadingText}>Loading contacts...</Text>
      )}

      <Modal
        visible={modalVisible}
        animationType="fade"
        transparent
        onRequestClose={closeModal}
      >
        <ModalBox closeModal={closeModal} selectedContact={selectedContact} />
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
