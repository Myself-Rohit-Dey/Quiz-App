import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import Title from '../components/title';
import { useAuth } from '../context/authContext';
import Icon from "react-native-vector-icons/Ionicons"; // Import Ionicons from the library
import Toast from 'react-native-toast-message';
import { LinearGradient } from 'expo-linear-gradient';

const Login = ({ navigation }) => {
  const { login } = useAuth(); // Access the login function from authContext
  const [email, setEmail] = useState(''); // State for email input field
  const [password, setPassword] = useState(''); // State for password input field
  const [hidePassword, setHidePassword] = useState(true); // State to toggle password visibility

  // Function to handle login
  const handleLogin = async () => {
    try {
      const response = await fetch('https://quiz-app-react-native.vercel.app/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      const data = await response.json();
      const userData = data.user;
      if (data.success==true) { // If login is successful
        // Show success toast message
        Toast.show({
          type: "success",
          text1: data.message,
          visibilityTime: 2000,
          autoHide: true,
        });
        login(userData); // Call the login function with user data
        navigation.navigate('Home'); // Navigate to Home screen
      } else {
        // Show error toast message
        Toast.show({
          type: "error",
          text1: data.message,
          visibilityTime: 2000,
          autoHide: true,
        });
      }
    } catch (error) {
      // Show error toast message if an error occurs
      Toast.show({
        type: "error",
        text1: error,
        visibilityTime: 2000,
        autoHide: true,
      });
    }
  };

  return (
    <LinearGradient
      colors={['#FFFFFf','#aff2d8', '#1f7ea1', '#000000']}
      style={styles.container}
    >
    {/* <View style={styles.container}> */}
      <Title />
      {/* Email input field */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text.toLowerCase())}
        keyboardType="email-address"
      />
      {/* Password input field */}
      <View style={styles.passwordInputContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={hidePassword} // Use secureTextEntry based on hidePassword state
        />
        {/* Toggle password visibility button */}
        <TouchableOpacity onPress={() => setHidePassword(!hidePassword)} style={styles.eyeIcon}>
          <Icon name={hidePassword ? 'eye-off' : 'eye'} size={24} color="gray" />
        </TouchableOpacity>
      </View>
      {/* Login button */}
      <Button title="Login" onPress={handleLogin} />
      {/* Register link */}
      <View style={styles.registerContainer}>
        <Text style={{color:'white'}}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.registerButton}>Register</Text>
        </TouchableOpacity>
      </View>
    {/* </View> */}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    height: 50,
    borderColor: 'rgba(255,255,255,0.8)',
    borderWidth: 1,
    borderRadius:25,
    marginVertical: 10,
    paddingHorizontal: 20,
    backgroundColor:'rgba(255,255,255,0.6)',
    elevation:30
  },
  passwordInputContainer: {
    width: '80%',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'rgba(255,255,255,0.8)',
    borderWidth: 1,
    borderRadius:25,
    marginVertical: 10,
    paddingRight: 10,
    paddingLeft:20,
    backgroundColor:'rgba(255,255,255,0.6)',
    
  },
  passwordInput: {
    flex: 1,
    height: 40,
  },
  eyeIcon: {
    padding: 10,
  },
  registerContainer: {
    flexDirection: 'row',
    marginTop: 20,
    
  },
  registerButton: {
    marginLeft: 5,
    color: '#30c5d2',
    fontSize: 16
  },
});

export default Login;
