import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet,TouchableOpacity } from 'react-native';
import Title from '../components/title';

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Implement login logic here
    console.log('Login button pressed');
    navigation.navigate('Home')
  };

  return (
    <View style={styles.container}>
      <Title/>
      {/* <Text>Login Screen</Text> */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
      <View style={styles.registerContainer}>
        <Text>Don't have any account? </Text><TouchableOpacity onPress={() => navigation.navigate('Register')}><Text style={styles.registerButton}>Register</Text></TouchableOpacity>
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
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  registerContainer: {
    flexDirection: 'row',
    marginTop: 20
  },
  registerButton: {
    marginLeft: 5, // Adjust spacing between text and button if needed
    color: 'blue', // Change color of the login button
    // textDecorationLine: 'underline' // Add underline to the login button
  }
});

export default Login;
