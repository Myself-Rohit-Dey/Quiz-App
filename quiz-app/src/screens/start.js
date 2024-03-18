import React from 'react';
import { View,Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Title from '../components/title';

const Start = ({ navigation }) => {
  const handleLogin = () => {
    // Navigate to the login screen
    navigation.navigate('Login');
  };

  const handleRegister = () => {
    // Navigate to the register screen
    navigation.navigate('Register');
  };

  return (
    <View style={styles.container}>
        <Title />
      <View style={styles.top}>
        {/* <View style={styles.quoteContainer}> */}
        <View style={styles.imageContainer}>
          <View style={styles.bannerContainer}>
            <Image
              source={{
                uri: 'https://ugokawaii.com/wp-content/uploads/2022/12/quiz-time.gif'
              }}
              style={styles.banner}
              resizeMode='contain'
            />
          </View>
        </View>
            <Text style={styles.quote}>
            "Quizzes are a fun and interactive way to test your knowledge and learn new things."
            </Text>
        {/* </View> */}
      </View>
      <View style={styles.bottom}>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between', // Arrange children with space between them
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20, // Add padding at the bottom of the container
    paddingTop: 60,
    
  },
  top: {
    alignItems: 'center', // Align children horizontally
    justifyContent: 'center',
    height:'80%',
    // backgroundColor:'blue'
  },
  banner: {
    height: 420,
    width: 420,
    justifyContent: 'flex-start',
  },
  bannerContainer: {
    borderWidth: 5,
    borderRadius: 10,
    borderColor: 'black',
    width: 270,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quote: {
    fontSize: 25,
    marginBottom: 20,
    textAlign: 'center',
    paddingHorizontal: 60,
    paddingVertical: 20
  },
  bottom: {
    width: '100%', // Occupy full width
    justifyContent: 'space-between',
    alignItems: 'center', // Align children horizontally
    flexDirection: 'row'
  },
  button: {
    backgroundColor: '#F8961E',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 10,
    marginHorizontal: 40,
    width: '30%', // Adjust button width as needed
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Start;
