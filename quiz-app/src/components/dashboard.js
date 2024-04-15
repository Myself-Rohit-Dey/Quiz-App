import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useAuth } from "../context/authContext";
import { Table, Row } from "react-native-reanimated-table";

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState(""); // State to manage the active section
  const [quizzes, setQuizzes] = useState([]); // State to store all quizzes
  const [filteredQuizzes, setFilteredQuizzes] = useState([]); // State to store filtered quizzes
  const [filterTitle, setFilterTitle] = useState(""); // State to store the filter for quiz title
  const [filterNumQuestions, setFilterNumQuestions] = useState(""); // State to store the filter for number of questions

  // Fetch quizzes from the API when component mounts or user changes
  // useEffect(() => {
  //   fetchQuizzes();
  // }, []);

  // Function to fetch quizzes from the API
  const fetchQuizzes = async () => {
    try {
      const response = await fetch(
        "http://quiz-app-react-native.vercel.app/admin/analytics/get-all-quizzes"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch quizzes");
      }
      const data = await response.json();
      setQuizzes(data.quizzes);
      console.log("fetched")
    } catch (error) {
      console.error("Error fetching quizzes:", error);
    }
  };

  const { user } = useAuth(); // Get authenticated user details

  // Function to apply filters based on title and number of questions
  const applyFilters = () => {
    const filtered = quizzes.filter((quiz) => {
      return (
        quiz.title.toLowerCase().includes(filterTitle.toLowerCase()) &&
        (!filterNumQuestions ||
          quiz.no_of_question.toString().includes(filterNumQuestions))
      );
    });
    setFilteredQuizzes(filtered); // Update filtered quizzes
  };

  // Component for feature box with icon and name
  // const PressableFeatureBox = ({ name, icon, onPress }) => (
  //   <TouchableOpacity onPress={onPress} style={styles.featureBox}>
  //     <Icon name={icon} size={50} color="#3498db" />
  //     <Text style={styles.featureName}>{name}</Text>
  //   </TouchableOpacity>
  // );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.h1}>WELCOME Admin</Text>
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.contentText}>
          Username: {user.first_name} {user.last_name}
        </Text>
        <Text style={styles.contentText}>Email: {user.email}</Text>
      </View>
      <View style={styles.featuresContainer}>
        {/* Feature box for displaying all quizzes */}
        {/* <PressableFeatureBox
          name="All Quizzes"
          icon="chatbubbles-sharp"
          onPress={() => {
            setActiveSection("Quizzes");
            setFilterTitle(""); // Reset filter title
            setFilterNumQuestions(""); // Reset filter number of questions
            fetchQuizzes();
          }}
        /> */}
        <TouchableOpacity style={styles.featureBox}onPress={() => {
            fetchQuizzes();
            setActiveSection("Quizzes");
            setFilterTitle(""); // Reset filter title
            setFilterNumQuestions(""); // Reset filter number of questions
          }}>
          <Icon name="chatbubbles-sharp" size={50} color="#3498db" />
          <Text style={styles.featureName}>All Quizzes</Text>
        </TouchableOpacity>
        {/* Feature box for filtering quizzes */}
        {/* <PressableFeatureBox
          name="Filter"
          icon="layers-sharp"
          onPress={() =>{ 
            setActiveSection("Filter");
            fetchQuizzes();
          }}
        /> */}
        <TouchableOpacity style={styles.featureBox} onPress={() =>{ 
            fetchQuizzes();
            setActiveSection("Filter");
          }}>
          <Icon name="layers-sharp" size={50} color="#3498db" />
          <Text style={styles.featureName}>Filter</Text>
        </TouchableOpacity>
      </View>

      <View style={{ justifyContent: "center", textAlign: "center" }}>
        {/* Display quizzes */}
        {activeSection === "Quizzes" && (
          <View style={styles.tableContainer}>
            <Table borderStyle={{ borderWidth: 0.5, borderColor: "#000" }}>
              <Row
                data={[
                  "Name",
                  "Title",
                  "Difficulty",
                  "No. of     Questions",
                  "Total Marks",
                  "Time",
                ]}
                style={styles.head}
                textStyle={styles.text}
              />
              {quizzes.map((quiz) => {
                const [hours, minutes, seconds] = quiz.time.split(":");
                return (
                  <Row
                    key={quiz.id}
                    data={[
                      `${quiz.first_name} ${quiz.lastName}`,
                      quiz.title,
                      quiz.difficulty,
                      quiz.no_of_question.toString(),
                      quiz.total_marks.toString(),
                      `${minutes}m ${seconds}s`,
                    ]}
                    textStyle={styles.text}
                  />
                );
              })}
            </Table>
          </View>
        )}

        {/* Filter quizzes based on title and number of questions */}
        {activeSection === "Filter" && (
          <View>
            <View style={styles.dropdownContainer}>
              <Text style={styles.dropdownLabel}>Title:</Text>
              <TextInput
                style={styles.dropdown}
                value={filterTitle}
                onChangeText={setFilterTitle}
              />
            </View>
            <View style={styles.dropdownContainer}>
              <Text style={styles.dropdownLabel}>Number of Questions:</Text>
              <TextInput
                style={styles.dropdown}
                value={filterNumQuestions}
                onChangeText={setFilterNumQuestions}
                keyboardType="numeric"
              />
            </View>
            {/* Button to apply filters */}
            <TouchableOpacity
              style={styles.filterButton}
              onPress={applyFilters}
            >
              <Text style={styles.filterButtonText}>Apply Filter</Text>
            </TouchableOpacity>
            {/* Table to display filtered quizzes */}
            <View style={styles.tableContainer}>
              <Table borderStyle={{ borderWidth: 0.5, borderColor: "#000" }}>
                <Row
                  data={[
                    "Title",
                    "Difficulty",
                    "No. of    Questions",
                    "Total Marks",
                    "Time",
                  ]}
                  style={styles.head}
                  textStyle={styles.text}
                />
                {filteredQuizzes.map((quiz) => (
                  <Row
                    key={quiz.id}
                    data={[
                      quiz.title,
                      quiz.difficulty,
                      quiz.no_of_question.toString(),
                      quiz.total_marks.toString(),
                      quiz.time,
                    ]}
                    textStyle={styles.rowText}
                  />
                ))}
              </Table>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  h1: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
    alignSelf: "center",
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
  container: {
    flex: 1,
    paddingTop: 20,
  },
  contentContainer: {
    marginBottom: 20,
  },
  contentText: {
    alignSelf: "center",
  },
  head: { height: 60, backgroundColor: "#f1f8ff", width: 340 },
  text: { margin: 4, textAlign: "center" },
  rowText: { margin: 5, textAlign: "center" },
  dropdownContainer: {
    flexDirection: "row",
    alignItems: "center",
    margin: 10,
  },
  dropdownLabel: {
    fontSize: 16,
    marginRight: 10,
  },
  dropdown: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingLeft: 7,
  },
  filterButton: {
    backgroundColor: "#3498db",
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
    marginTop: 10,
    alignItems: "center",
    marginBottom: 20,
    elevation: 5,
  },
  filterButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  tableContainer: {
    backgroundColor: "#fff",
    elevation: 12,
    marginBottom: 10,
    overflow: 'hidden',
  },
});
