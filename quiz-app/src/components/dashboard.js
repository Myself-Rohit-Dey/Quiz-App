// import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from "react-native";
// import React, { useEffect, useState } from "react";
// import Icon from "react-native-vector-icons/Ionicons";
// import { useAuth } from "../context/authContext";
// import { Table, Row } from "react-native-table-component";

// const Dashboard = () => {
//   const [activeSection, setActiveSection] = useState("");
//   const [quizzes, setQuizzes] = useState([]);
//   // const [showQuizzes, setShowQuizzes] = useState(false); // State to toggle quiz visibility

//   useEffect(() => {
//     fetchQuizzes();
//   }, [user]);

//   const fetchQuizzes = async () => {
//     try {
//       const response = await fetch(
//         "http://quiz-app-react-native.vercel.app/admin/analytics/get-all-quizzes"
//       );
//       if (!response.ok) {
//         throw new Error("Failed to fetch quizzes");
//       }
//       const data = await response.json();
//       setQuizzes(data.quizzes);
//     } catch (error) {
//       console.error("Error fetching quizzes:", error);
//     }
//   };

//   const { user } = useAuth();
//   // const renderSection = () => {
//   //   switch (activeSection) {
//   //     case "Profile":
//   //     //   return <ProfileSection />;
//   //     // case "Settings":
//   //     //   return <SettingsSection />;
//   //     case "Quizzes":
//   //       return <QuizzesSection />;
//   //     case "Messages":
//   //       return <MessagesSection />;
//   //     // case "Tasks":
//   //     //   return <TasksSection />;
//   //     // case "Calendar":
//   //     //   return <CalendarSection />;
//   //     default:
//   //       return <Dashboard />;
//   //   }
//   // };

//   const PressableFeatureBox = ({ name, icon, onPress }) => (
//     <TouchableOpacity onPress={onPress} style={styles.featureBox}>
//       <Icon name={icon} size={50} color="#3498db" />
//       <Text style={styles.featureName}>{name}</Text>
//     </TouchableOpacity>
//   );

//   // const QuizzesSection = () => (
//   //   <View style={styles.container}>
//   //     <View style={styles.headerContainer}>
//   //       <Text style={styles.headerTitle}>Quizzes Section</Text>
//   //     </View>
//   //     <View style={styles.contentContainer}>
//   //       <Text>Qui</Text>
//   //       {/* {quizzes.map((quiz) => (
//   //         <View key={quiz.id} style={styles.quizContainer}>
//   //           <Text>Title: {quiz.title}</Text>
//   //           <Text>Difficulty: {quiz.difficulty}</Text>
//   //           <Text>Number of Questions: {quiz.no_of_question}</Text>
//   //           <Text>Total Marks: {quiz.total_marks}</Text>
//   //           <Text>Time: {quiz.time}</Text>
//   //         </View>
//   //       ))} */}
//   //     </View>
//   //   </View>
//   // );

//   // const MessagesSection = () => (
//   //   <View style={styles.container}>
//   //     <View style={styles.headerContainer}>
//   //       {/* {renderBackButton()} */}
//   //       <Text style={styles.headerTitle}>Messages Section</Text>
//   //     </View>
//   //     <View style={styles.contentContainer}>
//   //       <Text style={styles.contentText}>Messages Content Goes Here</Text>
//   //     </View>
//   //   </View>
//   // );

//   return (
//     <View style={styles.container}>
//       <View style={styles.headerContainer}>
//         {/* {renderBackButton()} */}
//         <Text style={styles.h1}>WELCOME Admin</Text>
//         {/* <Text style={styles.headerTitle}>Profile Section</Text> */}
//       </View>
//       <View style={styles.contentContainer}>
//         {/* <Icon name="person" size={80} color="#3498db" /> */}
//         <Text style={styles.contentText}>
//           Username: {user.first_name} {user.last_name}
//         </Text>
//         <Text style={styles.contentText}>Email: {user.email}</Text>
//       </View>
//       {/* <View style={styles.buttonsContainer}>
//       <TouchableOpacity
//         onPress={() => setActiveSection("Profile")}
//         style={styles.button}
//       >
//         <Icon name="person" size={30} color="white" />
//         <Text style={styles.buttonText}>Profile</Text>
//       </TouchableOpacity>
//       <TouchableOpacity
//         onPress={() => setActiveSection("Settings")}
//         style={styles.button}
//       >
//         <Icon name="settings" size={30} color="white" />
//         <Text style={styles.buttonText}>Settings</Text>
//       </TouchableOpacity>
//     </View> */}
//       <View style={styles.featuresContainer}>
//         <PressableFeatureBox
//           name="Quizzes"
//           icon="stats-chart"
//           onPress={() => setActiveSection("Quizzes")}
//         />
//         <PressableFeatureBox
//           name="Messages"
//           icon="chatbox"
//           onPress={() => setActiveSection("Messages")}
//         />
//       </View>
//       <Text>
//         {/* <View style={styles.container}>
//         {renderSection()}
//       </View> */}
//         {/* <ScrollView > */}
//           {activeSection === "Quizzes" && (
//             <View >
//               <Table borderStyle={{ borderWidth: 0.5, borderColor: "#000" }}>
//             <Row data={["Title", "Difficulty", "No. of Questions", "Total Marks", "Time"]} style={styles.head} textStyle={styles.text} />
//             {quizzes.map((quiz) => (
//               <Row
//                 key={quiz.id}
//                 data={[quiz.title, quiz.difficulty, quiz.no_of_question.toString(), quiz.total_marks, quiz.time]}
//                 textStyle={styles.text}
//               />
//             ))}
//           </Table>
//               {/* <View style={styles.quizContainer}>
//                 <Text>Title</Text>
//                 <Text>Difficulty</Text>
//                 <Text>Number of Questions</Text>
//                 <Text>Total Marks</Text>
//                 <Text>Time</Text>
//               </View>
//               {quizzes.map((quiz) => (
//                 <View key={quiz.id} style={styles.quizContainer}>
//                   <Text>{quiz.title}</Text>
//                   <Text>{quiz.difficulty}</Text>
//                   <Text>{quiz.no_of_question}</Text>
//                   <Text>{quiz.total_marks}</Text>
//                   <Text>{quiz.time}</Text>
//                 </View>
//               ))} */}
//             </View>
//           )}
//         {/* </ScrollView> */}
//       </Text>
//     </View>
//   );
// };

// export default Dashboard;

// const styles = StyleSheet.create({
//   h1: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 20,
//     color: "#333", // You can change the color as needed
//   },
//   featuresContainer: {
//     flex: 1,
//     flexDirection: "row",
//     flexWrap: "wrap",
//     justifyContent: "space-between",
//     marginTop: 20,
//   },
//   featureBox: {
//     alignItems: "center",
//     justifyContent: "center",
//     width: "45%",
//     aspectRatio: 1,
//     backgroundColor: "white",
//     borderRadius: 10,
//     marginVertical: 10,
//     elevation: 5,
//   },
//   featureName: {
//     marginTop: 10,
//     fontSize: 16,
//     fontWeight: "bold",
//     color: "#555",
//   },

//   container: {
//     flex: 1,
//     paddingBottom: 20,
//   },
//   contentContainer: {
//     marginBottom: 20,
//   },
//   quizContainer: {
//     marginTop: 20,
//   },
//   head: { height: 70, backgroundColor: "#f1f8ff" },
//   headText: { margin: 6, fontWeight: "bold", width: "20%" },
//   text: { margin: 6, textAlign: "center", width: 54 }, // Set equal width for each column
// });

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { useAuth } from "../context/authContext";
import { Table, Row } from "react-native-table-component";

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState("");
  const [quizzes, setQuizzes] = useState([]);
  
  useEffect(() => {
    fetchQuizzes();
  }, [user]);

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
    } catch (error) {
      console.error("Error fetching quizzes:", error);
    }
  };

  const { user } = useAuth();

  const PressableFeatureBox = ({ name, icon, onPress }) => (
    <TouchableOpacity onPress={onPress} style={styles.featureBox}>
      <Icon name={icon} size={50} color="#3498db" />
      <Text style={styles.featureName}>{name}</Text>
    </TouchableOpacity>
  );

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
      <Text style={{ justifyContent: "center", textAlign: "center" }}>
        {activeSection === "Quizzes" &&
          (quizzes.length > 0 ? (
            <Table borderStyle={{ borderWidth: 0.5, borderColor: "#000" }}>
              <Row
                data={[
                  "Title",
                  "Difficulty",
                  "No. of Questions",
                  "Total Marks",
                  "Time",
                ]}
                style={styles.head}
                textStyle={styles.text}
              />
              {quizzes.map((quiz) => {
                  const [hours, minutes, seconds] = quiz.time.split(':');
                  return (
                    <Row
                      key={quiz.id}
                      data={[
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
          ) : (
            <Text>No Data available</Text>
          ))}
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
    color: "#333",
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
    paddingBottom: 20,
  },
  contentContainer: {
    marginBottom: 20,
  },
  quizContainer: {
    marginTop: 20,
  },
  head: { height: 70, backgroundColor: "#f1f8ff" },
  headText: { margin: 6, fontWeight: "bold", width: "20%" },
  text: { margin: 6, textAlign: "center", width: 54 },
});
