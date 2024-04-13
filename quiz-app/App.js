import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Animated } from "react-native";
import MyStack from "./src/navigation";
import Toast from "react-native-toast-message";
import { AuthProvider } from "./src/context/authContext";

export default function App() {
  return (
    <>
      <AuthProvider>
        <View style={styles.container}>
          <StatusBar style="auto" />
          <NavigationContainer>
            <MyStack />
            <Toast />
          </NavigationContainer>
        </View>
      </AuthProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    paddingTop: 0,
  },
});
