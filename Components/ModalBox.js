import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const ModalBox = ({ closeModal, selectedContact }) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.modalContainer}
      onPress={closeModal}
    >
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
        <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
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
  closeButton: {
    marginTop: 16,
    alignSelf: "flex-end",
  },
  closeButtonText: {
    color: "#BBE1FA",
  },
});

export default ModalBox;
