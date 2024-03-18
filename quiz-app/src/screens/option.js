import React, { useState } from 'react';
import { View, Image, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Title from '../components/title';

const Option = ({ navigation }) => {
  const [amount, setAmount] = useState('10');
  const [category, setCategory] = useState('31');
  const [difficulty, setDifficulty] = useState('medium');
  const [type, setType] = useState('multiple');

  const startQuiz = () => {
    navigation.navigate('Quiz', { amount, category, difficulty, type });
  };

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
        <View style={styles.inputContainer}>
            <Text>Number of Questions:</Text>
            <TextInput
            style={styles.input}
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
            placeholder="Enter number of questions"
            />
        </View>
        <View style={styles.inputContainer}>
            <Text>Category:</Text>
            <Picker
            selectedValue={category}
            style={styles.picker}
            onValueChange={(itemValue) => setCategory(itemValue)}
            >
            <Picker.Item label="General Knowledge" value="31" />
            <Picker.Item label="Entertainment: Film" value="32" />
            </Picker>
        </View>
        <View style={styles.inputContainer}>
            <Text>Difficulty:</Text>
            <Picker
            selectedValue={difficulty}
            style={styles.picker}
            onValueChange={(itemValue) => setDifficulty(itemValue)}
            >
            <Picker.Item label="Easy" value="easy" />
            <Picker.Item label="Medium" value="medium" />
            <Picker.Item label="Hard" value="hard" />
            </Picker>
        </View>
        <View style={styles.inputContainer}>
            <Text>Type:</Text>
            <Picker
            selectedValue={type}
            style={styles.picker}
            onValueChange={(itemValue) => setType(itemValue)}
            >
            <Picker.Item label="Multiple Choice" value="multiple" />
            <Picker.Item label="True/False" value="boolean" />
            </Picker>
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
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 5,
  },
  picker: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    marginTop: 5,
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
