import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { useAuth } from "../context/authContext";

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState("");
  const [quizzes, setQuizzes] = useState([]);

  const getAllQuizzes = async () => {
    try {
      const response = await fetch("http://your-api-url/admin/analytics/get-quizzes");
      if (!response.ok) {
        throw new Error("Failed to fetch quizzes");
      }
      const data = await response.json();
      setQuizzes(data.quizzes);
    } catch (error) {
      console.error("Error fetching quizzes:", error);
    }
  };


  const { user } = useAuth();
  const renderSection = () => {
    switch (activeSection) {
      case "Profile":
      //   return <ProfileSection />;
      // case "Settings":
      //   return <SettingsSection />;
      case "Quizzes":
        return <QuizzesSection />;
      case "Messages":
        return <MessagesSection />;
      // case "Tasks":
      //   return <TasksSection />;
      // case "Calendar":
      //   return <CalendarSection />;
      default:
        return <Dashboard />;
    }
  };

  const PressableFeatureBox = ({ name, icon, onPress }) => (
    <TouchableOpacity onPress={onPress} style={styles.featureBox}>
      <Icon name={icon} size={50} color="#3498db" />
      <Text style={styles.featureName}>{name}</Text>
    </TouchableOpacity>
  );

  const QuizzesSection = () => (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Quizzes Section</Text>
      </View>
      <View style={styles.contentContainer}>
        {quizzes.map((quiz) => (
          <View key={quiz.id} style={styles.quizContainer}>
            <Text>Title: {quiz.title}</Text>
            <Text>Difficulty: {quiz.difficulty}</Text>
            <Text>Number of Questions: {quiz.no_of_question}</Text>
            <Text>Total Marks: {quiz.total_marks}</Text>
            <Text>Time: {quiz.time}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  const MessagesSection = () => (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        {/* {renderBackButton()} */}
        <Text style={styles.headerTitle}>Messages Section</Text>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.contentText}>Messages Content Goes Here</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        {/* {renderBackButton()} */}
        <Text style={styles.h1}>WELCOME Admin</Text>
        {/* <Text style={styles.headerTitle}>Profile Section</Text> */}
      </View>
      <View style={styles.contentContainer}>
        {/* <Icon name="person" size={80} color="#3498db" /> */}
        <Text style={styles.contentText}>
          Username: {user.first_name} {user.last_name}
        </Text>
        <Text style={styles.contentText}>Email: {user.email}</Text>
      </View>
      {/* <View style={styles.buttonsContainer}>
      <TouchableOpacity
        onPress={() => setActiveSection("Profile")}
        style={styles.button}
      >
        <Icon name="person" size={30} color="white" />
        <Text style={styles.buttonText}>Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => setActiveSection("Settings")}
        style={styles.button}
      >
        <Icon name="settings" size={30} color="white" />
        <Text style={styles.buttonText}>Settings</Text>
      </TouchableOpacity>
    </View> */}
      <View style={styles.featuresContainer}>
        <PressableFeatureBox
          name="Quizzes"
          icon="stats-chart"
          onPress={() => setActiveSection("Quizzes")}
        />
        <PressableFeatureBox
          name="Messages"
          icon="chatbox"
          onPress={() => setActiveSection("Messages")}
        />
      </View>
      <Text>
      <View style={styles.container}>{renderSection()}</View>;
      </Text>
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  h1: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333", // You can change the color as needed
  },
  featuresContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 20,
  },
  featureBox: {
    alignItems: "center",
    justifyContent: "center",
    width: "45%",
    aspectRatio: 1,
    backgroundColor: "white",
    borderRadius: 10,
    marginVertical: 10,
    elevation: 5,
  },
  featureName: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
    color: "#555",
  },
});
