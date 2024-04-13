import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, Button, FlatList } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Picker } from "@react-native-picker/picker";

const ManageQuestions = () => {
  // State variables
  const [questions, setQuestions] = useState([]); // Store existing questions
  const [isModalVisible, setIsModalVisible] = useState(false); // Modal visibility state
  const [newQuestion, setNewQuestion] = useState(""); // New question text
  const [answers, setAnswers] = useState([{ id: 1, text: "", isCorrect: false }]); // Answers array for the new question
  const [explanation, setExplanation] = useState(""); // Explanation for the new question
  const [difficulty, setDifficulty] = useState("EASY"); // Difficulty level of the new question
  const [marks, setMarks] = useState(1); // Marks awarded for the new question
  const [selectedTopic, setSelectedTopic] = useState(null); // Selected topic for the new question

  // Fetch questions when component mounts
  useEffect(() => {
    fetchQuestions();
  }, []);

  // Function to fetch questions from the server
  const fetchQuestions = async () => {
    try {
      const response = await fetch(
        "https://quiz-app-react-native.vercel.app/admin/get-question-answer"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch questions");
      }
      const questionData = await response.json();
      setQuestions(questionData.questions);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  // Function to toggle the visibility of the modal
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
    // Reset input fields when closing the modal
    if (!isModalVisible) {
      setSelectedTopic(1);
      setNewQuestion("");
      setExplanation("");
      setDifficulty("EASY");
      setMarks(1);
      setAnswers([{ id: 1, text: "", isCorrect: false }]);
    }
  };

  // Function to handle adding a new question
  const handleAddQuestion = async () => {
    try {
      const response = await fetch(
        "https://quiz-app-react-native.vercel.app/admin/set-question",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title_id: selectedTopic, // Selected topic ID
            question: newQuestion, // New question text
            answer_id:
              String.fromCharCode(
                answers.find((answer) => answer.isCorrect)?.id + 96
              ) || "a", // ID of the correct answer
            answer_text: answers.find((answer) => answer.isCorrect)?.text || "", // Text of the correct answer
            explanation: explanation, // Explanation for the answer
            difficulty: difficulty, // Difficulty level of the question
            marks: marks, // Marks awarded for the question
            ...answers.reduce(
              (acc, answer, index) => ({
                ...acc,
                [`op${index + 1}`]: answer.text, // Options for the question
              }),
              {}
            ),
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to add question");
      }
      toggleModal(); // Close the modal
      fetchQuestions(); // Refresh the question list
    } catch (error) {
      console.error("Error adding question:", error);
    }
  };

  // Function to add a new answer option
  const handleAddAnswer = () => {
    setAnswers((prevAnswers) => [
      ...prevAnswers,
      { id: prevAnswers.length + 1, text: "", isCorrect: false },
    ]);
  };

  // Function to handle text input change for an answer option
  const handleAnswerChange = (text, id) => {
    setAnswers((prevAnswers) =>
      prevAnswers.map((answer) =>
        answer.id === id ? { ...answer, text: text } : answer
      )
    );
  };

  // Function to toggle the correct answer option
  const handleToggleCorrect = (id) => {
    setAnswers((prevAnswers) =>
      prevAnswers.map((answer) =>
        answer.id === id
          ? { ...answer, isCorrect: !answer.isCorrect }
          : { ...answer, isCorrect: false }
      )
    );
  };

  // Function to handle difficulty level change
  const handleDifficultyChange = (value) => {
    setDifficulty(value);
    // Update marks based on difficulty
    if (value === "EASY") {
      setMarks(1);
    } else if (value === "MEDIUM") {
      setMarks(2);
    } else if (value === "HARD") {
      setMarks(5);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Quiz Questions</Text>
        <TouchableOpacity onPress={toggleModal}>
          <Icon name="add-circle-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>
      {/* Filter by Topic dropdown */}
      <View style={styles.dropdownContainer}>
        <Text style={styles.dropdownLabel}>Filter by Topic:</Text>
        <View style={styles.dropdown}>
          <Picker
            selectedValue={selectedTopic}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedTopic(itemValue)
            }
          >
            <Picker.Item label="All" value={null} />
            <Picker.Item label="HTML" value={1} />
            <Picker.Item label="CSS" value={2} />
            <Picker.Item label="JavaScript" value={3} />
            {/* Add more topics as needed */}
          </Picker>
        </View>
      </View>
      {/* List of questions */}
      {selectedTopic === null ? (
        questions.map((question, index) => (
          <View key={index} style={styles.questionContainer}>
            <Text style={styles.index}>{index + 1}</Text>
            <Text style={styles.question}>{question.question}</Text>
            <Text style={styles.answer}>
              Correct Answer: {question.answer_text}
            </Text>
          </View>
        ))
      ) : (
        questions
          .filter((question) => question.title_id === selectedTopic)
          .map((question, index) => (
            <View key={index} style={styles.questionContainer}>
              <Text style={styles.index}>{index + 1}</Text>
              <Text style={styles.question}>{question.question}</Text>
              <Text style={styles.answer}>
                Correct Answer: {question.answer_text}
              </Text>
            </View>
          ))
      )}
      {/* Modal for adding a new question */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Question</Text>
            {/* Topic Picker */}
            <View style={styles.topicpicker}>
              <Picker
                selectedValue={selectedTopic}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedTopic(itemValue)
                }
              >
                <Picker.Item label="HTML" value={1} />
                <Picker.Item label="CSS" value={2} />
                <Picker.Item label="JavaScript" value={3} />
                {/* Add more topics as needed */}
              </Picker>
            </View>
            {/* Question input */}
            <TextInput
              style={styles.input}
              placeholder="Enter question"
              value={newQuestion}
              onChangeText={setNewQuestion}
            />
            {/* Answers list */}
            <FlatList
              data={answers}
              renderItem={({ item }) => (
                <View style={styles.answerContainer}>
                  {/* Answer input */}
                  <TextInput
                    style={styles.answerInput}
                    placeholder={`Answer ${item.id}`}
                    value={item.text}
                    onChangeText={(text) => handleAnswerChange(text, item.id)}
                  />
                  {/* Toggle correct answer button */}
                  <TouchableOpacity
                    onPress={() => handleToggleCorrect(item.id)}
                    style={[
                      styles.toggleCorrectButton,
                      { backgroundColor: item.isCorrect ? "green" : "gray" },
                    ]}
                  >
                    <Text style={styles.toggleCorrectText}>
                      {item.isCorrect ? "Correct" : "Incorrect"}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
              keyExtractor={(item) => item.id.toString()}
            />
            {/* Explanation input */}
            <TextInput
              style={styles.input}
              placeholder="Explanation"
              value={explanation}
              onChangeText={setExplanation}
            />
            {/* Difficulty level picker */}
            <View style={styles.pickerContainer}>
              <Text style={styles.pickerLabel}>Difficulty:</Text>
              <View style={styles.picker}>
                <Picker
                  selectedValue={difficulty}
                  onValueChange={handleDifficultyChange}
                >
                  <Picker.Item label="EASY" value="EASY" />
                  <Picker.Item label="MEDIUM" value="MEDIUM" />
                  <Picker.Item label="HARD" value="HARD" />
                </Picker>
              </View>
            </View>
            {/* Marks input */}
            <TextInput
              style={styles.input}
              placeholder="Marks"
              value={marks.toString()}
              onChangeText={(text) => setMarks(parseInt(text))}
              keyboardType="numeric"
            />
            {/* Buttons */}
            <View style={styles.buttonContainer}>
              <Button title="Add Answer" onPress={handleAddAnswer} />
              <Button title="Add Question" onPress={handleAddQuestion} />
              <Button title="Cancel" onPress={toggleModal} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    paddingRight: 10,
  },
  questionContainer: {
    marginBottom: 10,
    flexDirection: "row",
  },
  index: {
    fontSize: 16,
    marginBottom: 5,
    width: "10%",
    padding: 5,
  },
  question: {
    fontSize: 16,
    marginBottom: 5,
    width: "46%",
    padding: 5,
  },
  answer: {
    fontSize: 14,
    color: "green",
    width: "44%",
    padding: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "strech",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 30,
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  topicpicker: {
    borderWidth: 1,
    borderColor: "#ccc", // Border color
    borderRadius: 5, // Border radius
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  answerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  answerInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
  toggleCorrectButton: {
    padding: 10,
    borderRadius: 5,
  },
  toggleCorrectText: {
    color: "white",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  pickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  pickerLabel: {
    fontSize: 16,
    marginRight: 10,
  },
  picker: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5, 
  },
  dropdownContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  dropdownLabel: {
    fontSize: 16,
    marginRight: 10,
  },
  dropdown: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc", 
    borderRadius: 5, 
  },
  dropdownText: {
    fontSize: 16,
  },
});

export default ManageQuestions;
