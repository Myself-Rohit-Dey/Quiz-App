import React from "react";
import { View, Text, Modal, Button, StyleSheet } from "react-native";

const QuestionDetailsModal = ({ visible, question, correctAnswer, selectedOption, onClose }) => {
  return (
    <Modal visible={visible} animationType="slide">
      <View style={styles.container}>
        <Text style={styles.question}>{question}</Text>
        <Text style={styles.answer}>Correct Answer: {correctAnswer}</Text>
        <Text style={styles.selectedOption}>Your Answer: {selectedOption}</Text>
        <Button title="Close" onPress={onClose} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  question: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  answer: {
    fontSize: 18,
    marginBottom: 5,
  },
  selectedOption: {
    fontSize: 18,
    marginBottom: 20,
  },
});

export default QuestionDetailsModal;
