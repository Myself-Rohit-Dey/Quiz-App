import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Title from '../components/title';

const Register = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegistration = () => {
    // Implement registration logic here
    console.log('Registration button pressed');
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
        <Title/>
      {/* <Text>Registration Screen</Text> */}
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
      <Button title="Register" onPress={handleRegistration} />
      {/* <Button
        title="Back to Login"
        onPress={() => navigation.navigate('Login')}
      /> */}
      <View style={styles.loginContainer}>
        <Text>Already had and account? </Text><TouchableOpacity onPress={() => navigation.navigate('Login')}><Text style={styles.loginButton}>Login</Text></TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  loginContainer: {
    flexDirection: 'row',
    marginTop: 20
  },
  loginButton: {
    marginLeft: 5, // Adjust spacing between text and button if needed
    color: 'blue', // Change color of the login button
    // textDecorationLine: 'underline' // Add underline to the login button
  }
});

export default Register;
