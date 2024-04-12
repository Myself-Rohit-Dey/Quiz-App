import React, { useState,useEffect } from 'react';
import { View, Image, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Title from '../components/title';
import { useAuth } from '../context/authContext';

const Option = ({ navigation }) => {
  const [amount, setAmount] = useState('3');
  const [category, setCategory] = useState('1');
  const [difficulty, setDifficulty] = useState('EASY');
  const [quizId, setQuizId] = useState(null);
  // const [type, setType] = useState('multiple');
  const {user} = useAuth();

  const createQuiz = async () => {
    try {
      let categoryName;
      switch (category) {
        case '1':
          categoryName = 'HTML';
          break;
        case '2':
          categoryName = 'CSS';
          break;
        case '3':
          categoryName = 'JavaScript';
          break;
        default:
          categoryName = 'Other';
          break;
      }
      const response = await fetch('https://quiz-app-react-native.vercel.app/quiz/create-quiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: user.id,
          title_id: category,
          title: categoryName,
          difficulty:difficulty,
          no_of_question: parseInt(amount),
          total_marks: 0,
          time: 0
        }),
        
      });
      if (!response.ok) {
        throw new Error('Failed to create quiz');
      }
      const data = await response.json();
      setQuizId(data.quizId);
      console.log(data);
    } catch (error) {
      console.error('Error creating quiz:', error);
      // Handle error
    }
  };
  
  const startQuiz = () => {
    createQuiz(); // No need to await here
  };
  
  // Use useEffect to trigger navigation when quizId changes
  useEffect(() => {
    if (quizId) {
      navigation.navigate('Quiz', { quizId, difficulty, amount });
    }
  }, [quizId, navigation]);

  return (
    <ScrollView style={styles.container}>
        <Title />
        <View style={styles.options}>
        {/* <View style={styles.imageContainer}>
            <View style={styles.bannerContainer}>
            <Image
                source={{
                uri: 'https://ugokawaii.com/wp-content/uploads/2022/12/quiz-time.gif'
                }}
                style={styles.banner}
                resizeMode='contain'
            />
            </View>
        </View> */}
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
        {/* <View style={styles.inputContainer}>
            <Text>Type:</Text>
            <Picker
            selectedValue={type}
            style={styles.picker}
            onValueChange={(itemValue) => setType(itemValue)}
            >
            <Picker.Item label="Multiple Choice" value="multiple" />
            <Picker.Item label="True/False" value="boolean" />
            </Picker>
        </View> */}
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
        </View>
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
    height: '100%',
    // backgroundColor: '#F94144',
  },
  options: {
    marginVertical: 16,
    flex: 1,
    minHeight: 400,
    justifyContent: 'center'
  },
//   banner: {
//     height: 350,
//     width: 400,
//     justifyContent: 'flex-start',
//   },
//   bannerContainer: {
//     borderWidth: 5,
//     borderRadius: 10,
//     borderColor: 'black',
//     // height: 150,
//     width: 220, // Fixed height for the banner container
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   imageContainer: {
//     width: '100%',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
  inputContainer: {
    marginBottom: 10,
  },
  input: {
    flex:1,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 5,
    marginLeft: 10
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  picker: {
    flex:1,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginTop: 5,
    marginLeft: 10
  },
  button: {
    backgroundColor: '#F8961E',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom:90
  },
  buttonText: {
    fontSize: 24,
    fontWeight: '600',
    color: 'white',
  },
});
