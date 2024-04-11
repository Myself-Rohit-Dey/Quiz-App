import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import Title from "../components/title";
import Icon from "react-native-vector-icons/Ionicons"; // Import Ionicons from the library
import Toast from "react-native-toast-message";

const Register = ({ navigation }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [hidePassword, setHidePassword] = useState(true);

  const handleRegistration = async () => {
    // Validation for required fields
    // if (!firstName || !lastName || !email || !password || !gender) {
    //   Toast.show({
    //     type: "error",
    //     text1: "All fields are required",
    //     visibilityTime: 2000,
    //     autoHide: true
    //   });
    //   return;
    // }

    // Validation for email format
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      Toast.show({
        type: "error",
        text1: "Please enter a valid email address",
        visibilityTime: 2000,
        autoHide: true
      });
      return;
    }

    // Validation for password format
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
    if (!passwordRegex.test(password)) {
      Toast.show({
        type: "error",
        text1:
          "Please Enter a Valid Password",
        visibilityTime: 2000,
        autoHide: true,
        style: {
          height: 500, // Adjust the height as needed
        }
      });
      return;
    }

    try {
      const response = await fetch(
        "https://quiz-app-react-native.vercel.app/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            first_name: firstName,
            last_name: lastName,
            email: email,
            password: password,
            gender: gender, // Include the selected gender value
            role: "USER",
          }),
        }
      );
      const data = await response.json();
      console.log(data);
      // Handle successful registration here, e.g., navigate to login screen
      
      if (data.success == false) {
        // navigation.navigate("ErrorPage");
        Toast.show({
          type: "error",
          text1: data.message,
          visibilityTime: 2000,
          autoHide: true,
          position: 'bottom',
        });
      } else {
        Toast.show({
          type: "success",
          text1: data.message,
          visibilityTime: 2000,
          autoHide: true,
          position: 'bottom',
        });
        navigation.navigate("Login");
      }
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Title />
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
        autoCapitalize="words"
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
        autoCapitalize="words"
      />
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
        <TouchableOpacity
          onPress={() => setHidePassword(!hidePassword)}
          style={styles.eyeIcon}
        >
          <Icon
            name={hidePassword ? "eye-off" : "eye"}
            size={24}
            color="gray"
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.passwordDetails}>
        Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, 1 special character (@$!%*?&), and be 8-20 characters long
      </Text>
      <Picker
        style={styles.input}
        selectedValue={gender}
        onValueChange={(itemValue) => setGender(itemValue)}
      >
        <Picker.Item label="Select Gender" value="" />
        <Picker.Item label="Male" value="M" />
        <Picker.Item label="Female" value="F" />
      </Picker>
      <Button title="Register" onPress={handleRegistration} />
      <View style={styles.loginContainer}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.loginButton}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  input: {
    width: "80%",
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  passwordInputContainer: {
    width: "80%",
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    borderColor: "gray",
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
  loginContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  loginButton: {
    marginLeft: 5,
    color: "blue",
  },
  passwordDetails: {
    width: "80%",
    marginVertical: 5,
    fontSize: 12,
    color: "gray",
  },

});

export default Register;
