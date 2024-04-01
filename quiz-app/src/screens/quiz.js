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
  const [timeLeft, setTimeLeft] = useState(0); // Initial time: 300 seconds (5 minutes)
  const [progress, setProgress] = useState(0);
  const [totalTime, setTotalTime] = useState(0);

  const [backgroundColorIndex, setBackgroundColorIndex] = useState(0);
  const backgroundColors = [
    '#1507B0ff', // dark-blue-2
    '#160FB1ff', // dark-blue
    '#1718B3ff', // zaffre-2
    '#1820B4ff', // zaffre
    '#1A29B6ff', // international-klein-blue
    '#1B31B7ff', // persian-blue-3
    '#1C3AB9ff', // persian-blue-2
    '#1D42BAff', // persian-blue
    '#1E4ABCff', // violet-blue
    '#1F53BDff', // sapphire
    '#215BBFff', // tang-blue
    '#2264C0ff', // denim
    '#236CC2ff', // celtic-blue
    '#2474C3ff', // french-blue
    '#257DC5ff', // steel-blue-2
    '#2685C6ff', // steel-blue
    '#288EC8ff', // blue-ncs
    '#2996C9ff', // celestial-blue
    '#2A9FCBff', // blue-green
    '#2BA7CCff', // pacific-cyan
  ];

  const changeBackgroundColor = () => {
    setBackgroundColorIndex((prevIndex) => (prevIndex + 1) % backgroundColors.length);
  };


  let timeFactor = 1; // Default time factor for easy difficulty
  if (difficulty === "MEDIUM") {
    timeFactor = 2;
  } else if (difficulty === "HARD") {
    timeFactor = 3;
  }
  const initialTime = amount * 60 * timeFactor;

  const fetchQuiz = async () => {
    try {
      // Construct the URL for fetching quiz questions
      const apiUrl = `https://9f41-2402-3a80-196c-777a-b1d9-85d8-92de-85ff.ngrok-free.app/quiz/questions/${quizId}?difficulty=${difficulty}&amount=${amount}`;

      const res = await fetch(apiUrl);
      if (!res.ok) {
        throw new Error("Failed to fetch quiz questions");
      }
      const data = await res.json();
      setQuestions(data.quizQuestions);
      console.log(data.quizQuestions[0]);
      console.log(data.quizQuestions[1]);
    } catch (error) {
      console.error("Error fetching quiz data:", error);
    }
  };
  const submitQuiz = async () => {
    console.log(totalScore,totalTime);
    try {
      const response = await fetch(`https://9f41-2402-3a80-196c-777a-b1d9-85d8-92de-85ff.ngrok-free.app/quiz/update-result/${quizId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          totalTime: totalTime,
          totalScore: totalScore,
        }),
      });
      const data = await response.json();
      console.log(data);
      // If updating quiz result is successful
      if (response.ok) {
        console.log(data);
      } else {
        // If there's an error, display a message to the user
        console.error('Error:', data.message);
        // You can display an alert or set a state to show an error message on the UI
      }
    } catch (error) {
      console.error('Error:', error);
      // Display an error message or alert to the user
      navigation.navigate('ErrorPage');
    }
  };
  
  useEffect(() => {
    fetchQuiz();
    // setCurrentIndex(currentIndex+1);
    setTimeLeft(initialTime);
    setTotalTime(0);
    console.log(amount);
  }, [reset]); // Fetch questions when the component mounts

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

  const getTextScore = () => {
    let score = 0;
    questions.forEach((question) => {
      if (question.selectedOption === question.answer_id) {
        score += question.marks; // Assuming each correct answer adds the question's marks to the score
      }
    });
    return score;
  };

  const reset = () => {
    fetchQuiz(); // Fetch quiz questions when reset button is pressed
    setTimeLeft(initialTime);
    setBackgroundColorIndex(0);
  };

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

  const handleSubmit = () => {
    const totalTimeTaken = initialTime - timeLeft;
    setTotalScore(getTextScore());
    setModalVisible(true);
    setTotalTime(totalTimeTaken);
  };

  useEffect(() => {
    //   // Calculate initial time based on difficulty level and number of questions
    // let timeFactor = 1; // Default time factor for easy difficulty
    // if (difficulty === 'medium') {
    //   timeFactor = 2;
    // } else if (difficulty === 'hard') {
    //   timeFactor = 3;
    // }
    // initialTime = (amount) * 60 * timeFactor; // Convert minutes to seconds

    // Timer logic
    const timer = setTimeout(() => {
      if (timeLeft > 0) {
        setTimeLeft(timeLeft - 1);
      } else {
        // Time's up, navigate to the result screen
        // navigation.navigate("Result", { score });
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

  return (
    <View style={[styles.container, { backgroundColor: backgroundColors[backgroundColorIndex]}]}>
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
      <View style={{ paddingHorizontal: 20  }}>
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
                style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10, color:'white' }}
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
          onPress={handlePrevious}
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
            {/*  */}
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
            </View>
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
                  navigation.navigate("Home");
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
                  listRef.current.scrollToIndex({ animated: true, index: 0 });
                  submitQuiz();
                  // setModalVisible(false);
                }}
              >
                <Icon
                  name="reload-outline"
                  size={30}
                  color="black"
                  style={styles.icon}
                />
              </TouchableOpacity>
            </View>
            {/* <TouchableOpacity
              style={{
                alignSelf: "center",
                height: 40,
                padding: 10,
                borderWidth: 1,
                borderRadius: 10,
                marginTop: 20,
                marginBottom: 20,
              }}
              onPress={() => {
                setModalVisible(false);
                submitQuiz();
              }}
            >
              <Text>Close</Text>
            </TouchableOpacity> */}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    // paddingHorizontal: 20,
    height: "100%",
    // backgroundColor: "#F94144",
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
});
export default Quiz;
