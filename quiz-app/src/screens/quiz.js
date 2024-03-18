import React, { useEffect, useState } from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import { ProgressBar } from 'react-native-paper'; // Import ProgressBar from react-native-paper

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

const Quiz = ({ navigation, route }) => {
  const numberofques = 9;
  const initialTime = numberofques * 60;
  const [questions, setQuestions] = useState();
  const [ques, setQues] = useState(0);
  const [options, setOptions] = useState([]);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const[url,setUrl] = useState("")
  
  const getQuiz = async () => {
    try {
      if (url) {
        const res = await fetch(url);
        const data = await res.json();
        setQuestions(data.results);
        setOptions(generateOptionsAndShuffle(data.results[ques]));
        setSelectedOption(null); // Reset selected option
      }
    } catch (error) {
      console.error('Error fetching quiz data:', error);
    }
  };

  useEffect(() => {
    setUrl(`https://opentdb.com/api.php?amount=10&category=31&difficulty=medium&type=multiple&encode=url3986`)
  }, []);

  useEffect(() => {
    getQuiz();
  }, [url]);

  useEffect(() => {
    if (route.params?.newQuiz) {
      setQues(0);
      setScore(0); // Reset score when starting a new quiz
      setAnsweredQuestions([]); // Reset answered questions when starting a new quiz
      setTimeout(() => {
        navigation.setParams({ newQuiz: false });
      }, 100);
    }
  }, [route.params?.newQuiz]);

  useEffect(() => {
    if (questions && questions[ques]) {
      console.log(decodeURIComponent(questions[ques].question));
      console.log(ques)
    }
  }, [questions, ques]);

  const handleNextPress = () => {
    if (selectedOption) {
      // Check if the selected option is correct
      const isCorrect = selectedOption === questions[ques].correct_answer;
  
      // Check if the question has been answered before
      const isAnsweredBefore = answeredQuestions.find(item => item.quesIndex === ques);
  
      // Check if the previous answer was incorrect
      const wasIncorrectPreviously = isAnsweredBefore && answeredQuestions.find(item => item.quesIndex === ques && item.isIncorrect);
  
      // Check if the previous answer was correct
      const wasCorrectPreviously = isAnsweredBefore && answeredQuestions.find(item => item.quesIndex === ques && !item.isIncorrect);
  
      // Adjust score based on the current and previous answers
      if (isCorrect && !isAnsweredBefore) {
        setScore(score + 10); // Add 10 points for a correct answer if not previously answered
      } else if (!isCorrect && !isAnsweredBefore) {
        setScore(score - 2); // Deduct 2 points for an incorrect answer if not previously answered
        setAnsweredQuestions(prevState => [...prevState, { quesIndex: ques, isIncorrect: true }]);
      } else if (isCorrect && wasIncorrectPreviously) {
        setScore(score + 12); // Add 12 points if the current answer is correct and previously incorrect
      } else if (!isCorrect && wasCorrectPreviously) {
        setScore(score - 12); // Deduct 12 points if the current answer is incorrect and previously correct
      }
  
      // Update answered questions
      if (!isAnsweredBefore) {
        setAnsweredQuestions(prevState => [...prevState, { quesIndex: ques, isIncorrect: !isCorrect }]);
      }
    }
  
    // Move to the next question and reset selected option
    setQues(ques + 1);
    setOptions(generateOptionsAndShuffle(questions[ques + 1]));
    setSelectedOption(null);

    // Log the score
    console.log("Score:", score);
  };
  
  
  const handlePreviousPress = () => {
    if (ques > 0) {
      setQues(ques - 1);
      const prevAnsweredQuesIndex = answeredQuestions.findIndex(item => item.quesIndex === ques - 1);
      if (prevAnsweredQuesIndex !== -1) {
        setSelectedOption(answeredQuestions[prevAnsweredQuesIndex].selectedOption);
      } else {
        setSelectedOption(null);
      }
      setOptions(generateOptionsAndShuffle(questions[ques - 1])); // Update options for the previous question
    }
  };

  const generateOptionsAndShuffle = (_question) => {
    const options = [..._question.incorrect_answers, _question.correct_answer];
    shuffleArray(options);
    return options;
  };

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

  // Timer logic
  const [progress, setProgress] = useState(0); // State for progress bar
  const [timeLeft, setTimeLeft] = useState(initialTime); // Initial time: 300 seconds (5 minutes)

  useEffect(() => {
    // Timer logic
    const timer = setTimeout(() => {
      if (timeLeft > 0) {
        setTimeLeft(timeLeft - 1);
      } else {
        // Time's up, navigate to the result screen
        navigation.navigate('Result', { score });
      }
    }, 1000); // Update every second

    // Progress bar logic
    const progressInterval = setInterval(() => {
      if (ques < numberofques) {
        setProgress((ques + 1) / (numberofques+1)); // Update progress based on current question
      }
    }, 100); // Update every 100 milliseconds

    // Cleanup functions
    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, [timeLeft, ques]);

  return (
    <View>
      {questions && (
        <View style={[styles.container, { backgroundColor: backgroundColors[backgroundColorIndex] }]}>
          <View style={styles.question}>
            <Text style={styles.questionText}>Q. {decodeURIComponent(questions[ques].question)} </Text>
          </View>
          <View style={styles.options}>
            {options.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.optionButton,
                  selectedOption === option ? styles.selectedOption : null,
                ]}
                onPress={() => setSelectedOption(option)}
              >
                <Text style={styles.optionText}>{decodeURIComponent(option)}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.actions}>
            <TouchableOpacity style={styles.button} onPress={handlePreviousPress}>
              <Text style={styles.buttonText}>Previous</Text>
            </TouchableOpacity>
            {ques < numberofques && (
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  changeBackgroundColor();
                  handleNextPress();
                }}
              >
                <Text style={styles.buttonText}>Next</Text>
              </TouchableOpacity>
            )}
            {ques === numberofques && (
              <TouchableOpacity style={styles.button} onPress={() => {
                const totalTimeTaken = initialTime - timeLeft; 
                navigation.navigate('Result',{score,totalTimeTaken})}}>
                <Text style={styles.buttonText}>End</Text>
              </TouchableOpacity>
            )}
          </View>
          {/* Progress bar */}
          <ProgressBar progress={progress} color="#1E4ABC" style={{ height: 10, marginBottom: 20 }} />

          {/* Timer */}
          <Text style={styles.timer}>{Math.floor(timeLeft / 60)}:{('0' + (timeLeft % 60)).slice(-2)}</Text>
        </View>
      )}
    </View>
  );
};

export default Quiz;

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    paddingHorizontal: 20,
    height: '100%',
    backgroundColor: '#F94144',
  },
  question: {
    marginVertical: 20,
  },
  options: {
    marginVertical: 16,
    flex: 1,
  },
  actions: {
    marginBottom: 12,
    marginVertical: 16,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  button: {
    backgroundColor: '#073B4C',
    padding: 12,
    paddingHorizontal: 36,
    marginVertical: 30,
    borderRadius: 16,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
  questionText: {
    fontSize: 26,
    color: 'white',
  },
  optionText: {
    fontSize: 18,
    color: 'white',
  },
  optionButton: {
    padding: 12,
    marginVertical: 6,
    backgroundColor: '#4D908E',
    borderRadius: 12,
  },
  selectedOption: {
    backgroundColor: '#073B4C', // Change to the desired highlight color
  },
  timer: {
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
    marginBottom: 20,
  },
});
