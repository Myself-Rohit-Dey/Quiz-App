import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Modal,
  Image,
  StyleSheet,
} from "react-native";
import { ProgressBar } from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons"; // Import Ionicons from the library

const { height, width } = Dimensions.get("window");

const Quiz = ({ navigation, route }) => {
  const { quizId, difficulty, amount } = route.params;
  const numberofques = amount;

  const [currentIndex, setCurrentIndex] = useState(1);
  const [questions, setQuestions] = useState([]);
  const listRef = useRef();
  const [modalVisible, setModalVisible] = useState(false);
  const [totalScore, setTotalScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [progress, setProgress] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [showExplanation, setShowExplanation] = useState(true);   // State to manage whether the explanation modal is open or not
  const [backgroundColorIndex, setBackgroundColorIndex] = useState(0);  // state to manage the background color of quiz
  const backgroundColors = [ // background hex
    "#664d00ff", //field-drab
    "#6e2a0cff", //seal-brown
    "#691312ff", //rosewood
    "#5d0933ff", //tyrian-purple:
    "#291938ff", //dark-purple
    "#042d3aff", //gunmetal
    "#12403cff", //brunswick-green
    "#475200ff", //dark-moss-green
  ];
  let timeFactor = 1; // Default time factor for easy difficulty
    if (difficulty === "MEDIUM") {
      timeFactor = 2;
    } else if (difficulty === "HARD") {
      timeFactor = 3;
    }
  const initialTime = amount * 60 * timeFactor;

  // Function to fetch quiz questions
  const fetchQuiz = async () => {
    try {
      // Construct the URL for fetching quiz questions
      const apiUrl = `https://quiz-app-react-native.vercel.app/quiz/questions/${quizId}?difficulty=${difficulty}&amount=${amount}`;

      const res = await fetch(apiUrl);
      if (!res.ok) {
        throw new Error("Failed to fetch quiz questions");
      }
      const data = await res.json();
      setQuestions(data.quizQuestions);
    } catch (error) {
      console.error("Error fetching quiz data:", error);
    }
  };
  // Function to submit quiz results
  const submitQuiz = async () => {
    // console.log(totalScore, totalTime);
    try {
      const response = await fetch(
        `https://quiz-app-react-native.vercel.app/quiz/update-result/${quizId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            totalTime: totalTime,
            totalScore: totalScore,
          }),
        }
      );
      const data = await response.json();
      // If updating quiz result is successful
      if (response.ok) {
        navigation.navigate("Home")
      }else{
        // If there's an error, display a message to the user
        console.error("Error:", data.message);
        // You can display an alert or set a state to show an error message on the UI
      }
    } catch (error) {
      console.error("Error:", error);
      // Display an error message or alert to the user
      navigation.navigate("ErrorPage");
    }
  };

  //* useEffects *//
  useEffect(() => {
    // Timer logic
    const timer = setTimeout(() => {
      if (timeLeft > 0) {
        setTimeLeft(timeLeft - 1);
      } else {
        setTimeLeft(0); // Set timeLeft to 0 when time ends
        handleSubmit(); // Automatically submit answers when time ends
      }
    }, 1000); // Update every second

    // Calculate the progress based on the number of questions answered
    const progress = currentIndex / numberofques; // Subtract 1 to get the correct index since currentIndex starts from 1
    setProgress(progress);

    // Cleanup functions
    return () => {
      clearTimeout(timer);
    };
  }, [timeLeft, currentIndex]);

  useEffect(() => {
    fetchQuiz();
    setTimeLeft(initialTime);
    setTotalTime(0);
    // console.log(amount);
  }, [reset]); // Fetch questions when the component mounts


  // Function to change background color
  const changeBackgroundColor = () => {
    setBackgroundColorIndex(
      (prevIndex) => (prevIndex + 1) % backgroundColors.length
    );
  };
  // Function to handle option selection
  const onSelectOption = (questionIndex, optionId) => {
    const updatedQuestions = questions.map((question, index) => {
      if (index === questionIndex) {
        return {
          ...question,
          selectedOption: optionId,
        };
      }
      return question;
    });
    setQuestions(updatedQuestions);
  };
  // Function to handle next question  
  const handleNext = () => {
    if (currentIndex < questions.length) {
      listRef.current.scrollToIndex({
        animated: true,
        index: currentIndex,
        viewPosition: 0.5, // Ensures the item is centered after scroll
        onComplete: () => {
          setCurrentIndex((prevIndex) => prevIndex + 1);
        },
      });
    }
  };
  // Function to handle previous question
  const handlePrevious = () => {
    if (currentIndex > 1) {
      listRef.current.scrollToIndex({
        animated: true,
        index: currentIndex - 2,
        viewPosition: 0.5,
        onComplete: () => setCurrentIndex((prevIndex) => prevIndex - 1),
      });
    }
  };
  // Function to handle quiz submission
  const handleSubmit = () => {
    const totalTimeTaken = initialTime - timeLeft;
    setTotalScore(getTextScore());
    setModalVisible(true);
    setTotalTime(totalTimeTaken);
  };
  // Function to calculate total score
  const getTextScore = () => {
    let score = 0;
    questions.forEach((question) => {
      if (question.selectedOption === question.answer_id) {
        score += question.marks; // Assuming each correct answer adds the question's marks to the score
      }
    });
    return score;
  };
  // Function to reset quiz
  const reset = () => {
    fetchQuiz(); // Fetch quiz questions when reset button is pressed
    setTimeLeft(initialTime);
    setBackgroundColorIndex(0);
  };
  // Function to toggle the explanation modal
  const toggleExplanationModal = () => {
    setShowExplanation(!showExplanation);
  };

  
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: backgroundColors[backgroundColorIndex] },
      ]}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 20,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "600",
            marginLeft: 20,
            color: "#ffffff",
            marginVertical: 20,
          }}
        >
          Questions : {`${currentIndex}/${questions.length}`}
        </Text>

        <Text
          style={{
            marginRight: 20,
            fontSize: 20,
            fontWeight: "600",
            color: "white",
          }}
          onPress={() => {
            reset();
            listRef.current.scrollToIndex({ animated: true, index: 0 });
          }}
        >
          Reset
        </Text>
      </View>
      <View style={{ paddingHorizontal: 20 }}>
        <ProgressBar
          progress={progress}
          color="#FFA500"
          style={{
            height: 10,
            marginBottom: 20,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 40,
          }}
        />
      </View>
      <View style={{ marginTop: 20 }}>
        <FlatList
          ref={listRef}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          horizontal
          onScroll={(e) => {
            const x = e.nativeEvent.contentOffset.x / width + 1;
            setCurrentIndex(x.toFixed(0));
          }}
          data={questions}
          keyExtractor={(item) => item.question_id.toString()}
          renderItem={({ item, index }) => (
            <View style={{ width, paddingHorizontal: 20 }}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  marginBottom: 10,
                  color: "white",
                }}
              >
                {item.question}
              </Text>
              {item.options.map((option) => (
                <TouchableOpacity
                  key={option.option_id}
                  style={{
                    backgroundColor:
                      item.selectedOption === option.option_id
                        ? "purple"
                        : "gray",
                    padding: 10,
                    marginVertical: 5,
                    borderRadius: 5,
                  }}
                  onPress={() => onSelectOption(index, option.option_id)}
                >
                  <Text style={styles.optionText}>{option.option_text}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        />
      </View>

      {/* Timer */}
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          height: "70%",
        }}
      >
        <Text style={{ fontSize: 18, color: timeLeft === 0 ? "red" : "white" }}>
          {timeLeft === 0
            ? "Time Ended"
            : `Time Left: ${Math.floor(timeLeft / 60)}:${(timeLeft % 60)
                .toString()
                .padStart(2, "0")}`}
        </Text>
      </View>
      
      {/* Navigation Buttons */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          position: "absolute",
          bottom: 50,
          width: "100%",
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: currentIndex > 1 ? "purple" : "gray",
            height: 50,
            width: 100,
            borderRadius: 10,
            marginLeft: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => {
            handlePrevious();
            changeBackgroundColor();
          }}
        >
          <Text style={{ color: "#fff" }}>Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: currentIndex === amount ? "green" : "purple",
            height: 50,
            width: 100,
            borderRadius: 10,
            marginRight: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => {
            if (currentIndex === amount) {
              handleSubmit(); // Call handleSubmit function if currentIndex equals amount
            } else {
              handleNext(); // Call handleNext function otherwise
              changeBackgroundColor(); // Change background color after scrolling to the next question
            }
          }}
        >
          <Text style={{ color: "#fff" }}>
            {currentIndex === amount ? "Submit" : "Next"}
          </Text>
        </TouchableOpacity>
      </View>
      
      {/* Result & Explanation Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,.5)",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View
            style={{
              backgroundColor: "#fff",
              width: "90%",
              borderRadius: 10,
            }}
          >
            {showExplanation ? (
              // Explanation Modal Content
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  margin: 30,
                }}
              >
                <Image
                  source={{
                    uri: "https://lordicon.com/icons/wired/outline/1103-confetti.gif",
                  }}
                  style={{ height: 200, width: 250 }}
                  resizeMode="contain"
                />
                <Text
                  style={{
                    fontSize: 30,
                    fontWeight: "800",
                    alignSelf: "center",
                    marginTop: 20,
                  }}
                >
                  Total Score
                </Text>
                <Text
                  style={{
                    fontSize: 40,
                    fontWeight: "800",
                    alignSelf: "center",
                    marginTop: 10,
                    color: "green",
                  }}
                >
                  {totalScore}
                </Text>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "600",
                    alignSelf: "center",
                    marginTop: 20,
                  }}
                >
                  Time: {Math.floor(totalTime / 60)}:
                  {(totalTime % 60).toString().padStart(2, "0")}
                </Text>
                <View style={styles.actions}>
                  <TouchableOpacity
                    onPress={() => {
                      setModalVisible(false);
                      submitQuiz();
                    }}
                  >
                    <Icon
                      name="home-outline"
                      size={30}
                      color="black"
                      style={styles.icon}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setModalVisible(false);
                      reset();
                      listRef.current.scrollToIndex({
                        animated: true,
                        index: 0,
                      });
                      submitQuiz();
                    }}
                  >
                    <Icon
                      name="reload-outline"
                      size={30}
                      color="black"
                      style={styles.icon}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      toggleExplanationModal();
                    }}
                  >
                    <Icon
                      name="list-outline"
                      size={30}
                      color="black"
                      style={styles.icon}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              // Question and Answer Modal Content
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "left",
                  margin: 30,
                }}
              >
                <Text
                  style={{
                    fontSize: 30,
                    fontWeight: "800",
                    marginTop: 10,
                    marginBottom: 10,
                    marginLeft: 7,
                  }}
                >
                  Explanaton
                </Text>
                <TouchableOpacity
                  onPress={toggleExplanationModal}
                  style={{ position: "absolute", top: 15, right: 10 }}
                >
                  <Icon name="close-outline" size={30} color="black" />
                </TouchableOpacity>
                {questions.map((question, index) => (
                  <View key={index}>
                    <Text style={styles.explanationText}>
                      Question: {question.question}
                    </Text>
                    <Text style={[{ marginLeft: 10, color: "green" }]}>
                      Answer: {question.answer_text}
                    </Text>
                    <Text
                      style={[
                        {
                          marginLeft: 10,
                          color:
                            question.selectedOption === question.answer_id
                              ? "green"
                              : "red",
                        },
                      ]}
                    >
                      Selected Option:{" "}
                      {
                        question.options.find(
                          (option) =>
                            option.option_id === question.selectedOption
                        )?.option_text
                      }
                    </Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    height: "100%",
  },
  options: {
    marginVertical: 16,
    flex: 1,
  },
  optionText: {
    fontSize: 18,
    color: "white",
  },
  actions: {
    marginBottom: 12,
    marginVertical: 16,
    justifyContent: "center",
    flexDirection: "row",
  },
  icon: {
    padding: 10,
  },
  explanationModal: {
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  explanationText: {
    fontSize: 16,
    marginTop: 20,
    paddingHorizontal: 10,
  },
});
export default Quiz;
