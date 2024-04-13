import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker"; // Import Picker component
import Title from "../components/title";
import { useAuth } from "../context/authContext";

const Option = ({ navigation }) => {
  const [amount, setAmount] = useState("3"); // State for number of questions
  const [category, setCategory] = useState("1"); // State for category
  const [difficulty, setDifficulty] = useState("EASY"); // State for difficulty level
  const [quizId, setQuizId] = useState(null); // State to store quiz ID
  const { user } = useAuth(); // Access user data from authContext

  // Function to create a new quiz
  const createQuiz = async () => {
    try {
      let categoryName;
      switch (category) {
        case "1":
          categoryName = "HTML";
          break;
        case "2":
          categoryName = "CSS";
          break;
        case "3":
          categoryName = "JavaScript";
          break;
        default:
          categoryName = "Other";
          break;
      }
      // Send request to create quiz
      const response = await fetch(
        "https://quiz-app-react-native.vercel.app/quiz/create-quiz",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: user.id,
            title_id: category,
            title: categoryName,
            difficulty: difficulty,
            no_of_question: parseInt(amount),
            total_marks: 0,
            time: 0,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to create quiz");
      }
      const data = await response.json();
      setQuizId(data.quizId); // Set quiz ID in state
    } catch (error) {
      console.error("Error creating quiz:", error);
      // Handle error
    }
  };

  // Function to start the quiz
  const startQuiz = () => {
    createQuiz(); // Call createQuiz function
  };

  // Use useEffect to trigger navigation when quizId changes
  useEffect(() => {
    if (quizId) {
      navigation.navigate("Quiz", { quizId, difficulty, amount });
    }
  }, [quizId, navigation]);

  return (
    <ScrollView style={styles.container}>
      <Title />
      <View style={styles.options}>
        {/* Image container */}
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri: "https://media.tenor.com/2l4-h42qnmcAAAAi/toothless-dancing-toothless.gif",
            }}
            style={styles.banner}
            resizeMode="contain"
          />
        </View>
        {/* Category picker */}
        <View style={styles.pickerContainer}>
          <Text>Category:</Text>
          <View style={styles.picker}>
            <Picker
              selectedValue={category}
              onValueChange={(itemValue) => setCategory(itemValue)}
            >
              <Picker.Item label="HTML" value="1" />
              <Picker.Item label="CSS" value="2" />
              <Picker.Item label="JAVASCRIPT" value="3" />
            </Picker>
          </View>
        </View>
        {/* Difficulty picker */}
        <View style={styles.pickerContainer}>
          <Text>Difficulty:</Text>
          <View style={styles.picker}>
            <Picker
              selectedValue={difficulty}
              onValueChange={(itemValue) => setDifficulty(itemValue)}
            >
              <Picker.Item label="Easy" value="EASY" />
              <Picker.Item label="Medium" value="MEDIUM" />
              <Picker.Item label="Hard" value="HARD" />
            </Picker>
          </View>
        </View>
        {/* Number of questions input */}
        <View style={styles.pickerContainer}>
          <Text>Number of Questions:</Text>
          <View style={styles.input}>
            <TextInput
              value={amount}
              onChangeText={setAmount}
              keyboardType="numeric"
              placeholder="Enter number of questions"
            />
          </View>
        </View>
        {/* <View style={styles.pickerContainer}>
          <Text>Number of Questions:</Text>
          <View style={styles.picker}>
            <Picker
              selectedValue={amount}
              onValueChange={(itemValue) => setAmount(itemValue)}
            >
              {[...Array(21).keys()].map((value) => (
                <Picker.Item key={value.toString()} label={value.toString()} value={value.toString()} />
              ))}
            </Picker>
          </View>
        </View> */}
      </View>
      {/* Start quiz button */}
      <TouchableOpacity onPress={startQuiz} style={styles.button}>
        <Text style={styles.buttonText}>Start</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Option;

const styles = StyleSheet.create({
  container: {
    paddingTop: 80,
    paddingHorizontal: 20,
    height: "100%",
    margin: 5,
  },
  options: {
    marginVertical: 16,
    flex: 1,
    minHeight: 400,
    justifyContent: "center",
  },
  banner: {
    height: 350,
    width: 400,
    justifyContent: "flex-start",
  },
  imageContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 30,
  },
  inputContainer: {
    marginBottom: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 5,
    marginLeft: 10,
  },
  pickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  picker: {
    flex: 1,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    marginTop: 5,
    marginLeft: 10,
  },
  button: {
    backgroundColor: "#F8961E",
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
    marginTop: 30,
  },
  buttonText: {
    fontSize: 24,
    fontWeight: "600",
    color: "white",
  },
});
