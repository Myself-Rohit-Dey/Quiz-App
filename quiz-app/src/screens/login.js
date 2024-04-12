import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import Title from '../components/title';
import { useAuth } from '../context/authContext';
import Icon from "react-native-vector-icons/Ionicons"; // Import Ionicons from the library
import Toast from 'react-native-toast-message';

const Login = ({ navigation }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);

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
      console.log(data.user);
      // If login is successful, navigate to home screen
      
      // if (response.ok) {
      if (data.success==true) {
        Toast.show({
          type: "success",
          text1: data.message,
          visibilityTime: 2000,
          autoHide: true,
          position: 'bottom',
        });
        login(userData);
        navigation.navigate('Home');
      } else {
        Toast.show({
          type: "error",
          text1: data.message,
          visibilityTime: 2000,
          autoHide: true,
          position: 'bottom',
        });
        // If there's an error, display a message to the user
        console.error('Error logging in:', error.message); // Corrected to error.message
        // You can display an alert or set a state to show an error message on the UI
      }
    } catch (error) {
      console.error('Error logging in:', error);
      // Display an error message or alert to the user
      // navigation.navigate('ErrorPage');
    }
  };

  return (
    <View style={styles.container}>
      <Title />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text.toLowerCase())}
        keyboardType="email-address"
      />
      <View style={styles.passwordInputContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={hidePassword} // Use secureTextEntry based on hidePassword state
        />
        <TouchableOpacity onPress={() => setHidePassword(!hidePassword)} style={styles.eyeIcon}>
          <Icon name={hidePassword ? 'eye-off' : 'eye'} size={24} color="gray" />
        </TouchableOpacity>
      </View>
      <Button title="Login" onPress={handleLogin} />
      <View style={styles.registerContainer}>
        <Text>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.registerButton}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
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
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  passwordInputContainer: {
    width: '80%',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 10,
    paddingHorizontal: 10,
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
    color: 'blue',
  },
});

export default Login;
