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
import { LinearGradient } from "expo-linear-gradient";

const Register = ({ navigation }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [hidePassword, setHidePassword] = useState(true);

  const handleRegistration = async () => {
    /* Checked in backend */
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
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,20}$/;
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
      // console.log(data);
      
      if (data.success == false) {
        Toast.show({
          type: "error",
          text1: data.message,
          visibilityTime: 2000,
          autoHide: true,
          // position: 'bottom',
        });
      } else {
        Toast.show({
          type: "success",
          text1: data.message,
          visibilityTime: 2000,
          autoHide: true,
          // position: 'bottom',
        });
        navigation.navigate("Login");
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: error,
        visibilityTime: 2000,
        autoHide: true,
        // position: 'bottom',
      });
      console.error("Error registering user:", error);
    }
  };

  return (
    <LinearGradient
      colors={['#FFFFFf','#aff2d8', '#1f7ea1', '#000000']}
      style={styles.container}
    >
    {/* <View style={styles.container}> */}
      {/* Title Component */}
      <Title />

      {/* First Name Input */}
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
        autoCapitalize="words"
      />

      {/* Last Name Input */}
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
        autoCapitalize="words"
      />

      {/* Email Input */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text.toLowerCase())}
        keyboardType="email-address"
      />

      {/* Password Input */}
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

      {/* Password Details */}
      <Text style={styles.passwordDetails}>
        Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 number, 1 special character (@$!%*?&), and be 8-20 characters long
      </Text>

      {/* Gender Picker */}
      <View style={styles.pickerContainer}>
      <Picker
        style={styles.picker}
        selectedValue={gender}
        onValueChange={(itemValue) => setGender(itemValue)}
      >
        <Picker.Item label="Select Gender" value="" />
        <Picker.Item label="Male" value="M" />
        <Picker.Item label="Female" value="F" />
      </Picker>
      </View>
      {/* Register Button */}
      <Button title="Register" onPress={handleRegistration} />

      {/* Login Link */}
      <View style={styles.loginContainer}>
        <Text style={{color:'#ffffff'}}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.loginButton}>Login</Text>
        </TouchableOpacity>
      </View>
    {/* </View> */}
    </LinearGradient>
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
    borderColor: "rgba(255,255,255,0.8)",
    borderWidth: 1,
    borderRadius:25,
    marginVertical: 10,
    paddingHorizontal: 20,
    backgroundColor:'rgba(255,255,255,0.6)',
    elevation:30
  },
  passwordInputContainer: {
    width: "80%",
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    borderColor: "rgba(255,255,255,0.8)",
    borderWidth: 1,
    borderRadius:25,
    marginVertical: 10,
    paddingRight: 10,
    paddingLeft: 20,
    backgroundColor:'rgba(255,255,255,0.6)',
    elevation:30
  },
  passwordInput: {
    flex: 1,
    height: 40,
  },
  eyeIcon: {
    padding: 10,
  },
  pickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
    marginHorizontal: 40,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.8)",
    backgroundColor: "rgba(255,255,255,0.6)",
    borderRadius: 25,
    elevation:30
  },
  picker: {
    flex: 1
  },
  loginContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  loginButton: {
    marginLeft: 5,
    color: "#30c5d2",
  },
  passwordDetails: {
    width: "80%",
    marginVertical: 5,
    fontSize: 12,
    color: "white",
  },
});

export default Register;
