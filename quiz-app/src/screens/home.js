import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Animated,
  RefreshControl,
} from "react-native";
import Title from "../components/title";
import { useAuth } from "../context/authContext";

const Home = ({ navigation, route }) => {
  const [scrollY] = useState(new Animated.Value(0)); // Initialize scrollY as an Animated value
  const { user, logout } = useAuth(); // Get user data and logout function from authContext
  const [quizzes, setQuizzes] = useState([]); // State to hold quizzes data
  const [refreshing] = useState(false); // State to handle refreshing indicator

  // Interpolating opacity and scale based on scroll position
  const imageOpacity = scrollY.interpolate({
    inputRange: [0, 50],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });
  const imageScale = scrollY.interpolate({
    inputRange: [0, 50],
    outputRange: [1, 0.5],
    extrapolate: "clamp",
  });

  useEffect(() => {
    // Fetch quizzes when user data changes
    fetchQuizzes();
  }, [user]);

  // Function to fetch quizzes data from the API
  const fetchQuizzes = () => {
    if (user) {
      fetch(`https://quiz-app-react-native.vercel.app/result/${user.id}`)
        .then((response) => response.json())
        .then((data) => {
          setQuizzes(data); // Update state with fetched data
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  };

  // Function to handle refresh action
  const onRefresh = () => {
    fetchQuizzes(); // Re-fetch quizzes data
  };

  // Function to navigate to the quiz screen
  const startQuiz = () => {
    navigation.navigate("Option");
  };

  // Function to handle logout
  const handleLogOut = () => {
    logout();
  };

  // Function to navigate to the login screen
  const handleLogin = () => {
    navigation.navigate("Login");
  };

  // Function to navigate to the register screen
  const handleRegister = () => {
    navigation.navigate("Register");
  };

  // Function to navigate to the admin screen if user is admin
  const handleAdmin = () => {
    if (user.role == "ADMIN") {
      navigation.navigate("Admin");
    } else {
      navigation.navigate("ErrorPage"); // Navigate to ErrorPage if user is not admin
    }
  };

  return (
    <>
      {user ? ( // If user is logged in
        <View style={styles.container}>
          <ScrollView
            style={styles.scrollView}
            onScroll={Animated.event( // Listen to scroll events
              [{ nativeEvent: { contentOffset: { y: scrollY } } }],
              { useNativeDriver: false }
            )}
            scrollEventThrottle={16}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            {imageOpacity.__getValue() > 0 && ( // Render image with animation if opacity is greater than 0
              <Animated.View
                style={{
                  opacity: imageOpacity,
                  transform: [{ scale: imageScale }],
                }}
              >
                <View style={styles.imageContainer}>
                  <View style={styles.bannerContainer}>
                    <Image
                      source={{
                        uri: "https://ugokawaii.com/wp-content/uploads/2022/12/quiz-time.gif",
                      }}
                      style={styles.banner}
                      resizeMode="contain"
                    />
                  </View>
                </View>
              </Animated.View>
            )}
            <Animated.View // View containing user's name and start button
              style={{
                paddingTop: 20,
              }}
            >
              <Title firstName={user.first_name} />
            </Animated.View>
            <TouchableOpacity onPress={startQuiz} style={styles.button}>
              <Text style={styles.buttonText}>Start</Text>
            </TouchableOpacity>
            <View style={styles.cardContainer}>
              {quizzes.length > 0 ? ( // Render quizzes if available
                quizzes.map((quiz, index) => (
                  <View key={index} style={styles.card}>
                    <View style={styles.topicContainer}>
                      <Text style={styles.topicText}>
                        {quiz.title} ( {quiz.difficulty.toLowerCase()} )
                      </Text>
                    </View>
                    <View
                      style={{
                        justifyContent: "space-between",
                        flexDirection: "row",
                        alignItems: "center",
                        paddingHorizontal: 20,
                        paddingTop: 40,
                      }}
                    >
                      <Text style={{ color: "white", fontWeight: "800" }}>
                        Score
                      </Text>
                      <Text style={{ color: "white", fontWeight: "800" }}>
                        {quiz.total_marks}
                      </Text>
                    </View>
                    <View
                      style={{
                        alignItems: "flex-end",
                        paddingTop: 10,
                        paddingRight: 20,
                      }}
                    >
                      <Text style={{ color: "white" }}>Time: {quiz.time}</Text>
                    </View>
                    <View style={styles.imageOverlay}>
                      <Image
                        source={{
                          uri: "https://lordicon.com/icons/wired/outline/1103-confetti.gif",
                        }}
                        style={styles.cardImage}
                        resizeMode="cover"
                      />
                    </View>
                  </View>
                ))
              ) : (
                <Text style={{ paddingVertical: 40 }}>
                  No quizzes available
                </Text>
              )}
              <View style={styles.bottom}>
                <TouchableOpacity
                  style={styles.button2}
                  onPress={handleLogOut}
                >
                  <Text style={styles.buttonText2}>Logout</Text>
                </TouchableOpacity>
                {user.role == "ADMIN" && ( // Render admin button if user is admin
                  <TouchableOpacity
                    style={styles.button2}
                    onPress={handleAdmin}
                  >
                    <Text style={styles.buttonText2}>Admin</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </ScrollView>
        </View>
      ) : ( // If user is not logged in
        <View style={styles.containerSecondary}>
          <Title />
          <View style={styles.topSecondary}>
            <View style={styles.imageContainerSecondary}>
              <View style={styles.bannerContainerSecondary}>
                <Image
                  source={{
                    uri: "https://ugokawaii.com/wp-content/uploads/2022/12/quiz-time.gif",
                  }}
                  style={styles.bannerSecondary}
                  resizeMode="contain"
                />
              </View>
            </View>
            <Text style={styles.quoteSecondary}>
              "Quizzes are a fun and interactive way to test your knowledge and
              learn new things."
            </Text>
          </View>
          <View style={styles.bottomSecondary}>
            <TouchableOpacity
              style={styles.buttonSecondary}
              onPress={handleLogin}
            >
              <Text style={styles.buttonTextSecondary}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonSecondary}
              onPress={handleRegister}
            >
              <Text style={styles.buttonTextSecondary}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  // Primary styles
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  banner: {
    height: 420,
    width: 420,
    justifyContent: "flex-start",
  },
  bannerContainer: {
    borderWidth: 5,
    borderRadius: 10,
    borderColor: "black",
    width: 270,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#F8961E",
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
    marginVertical: 20,
  },
  buttonText: {
    fontSize: 24,
    fontWeight: "600",
    color: "white",
  },
  cardContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    paddingBottom: 80,
  },
  card: {
    width: 350,
    height: 100,
    backgroundColor: "#073B4C",
    margin: 5,
    marginBottom: 25,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "gray",
    position: "relative",
  },
  imageOverlay: {
    position: "absolute",
    top: -30,
    right: 10,
    borderRadius: 50,
    overflow: "hidden",
  },
  cardImage: {
    width: 60,
    height: 60,
  },
  bottom: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  button2: {
    backgroundColor: "#FF0000",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 10,
    marginHorizontal: 40,
    width: "30%",
  },
  buttonText2: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  topicContainer: {
    position: "absolute",
    top: -10,
    left: -10,
    backgroundColor: "#F8961E",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderTopLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  topicText: {
    color: "white",
    fontWeight: "bold",
  },

  // Secondary styles
  containerSecondary: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: 60,
  },
  topSecondary: {
    alignItems: "center",
    justifyContent: "center",
    height: "80%",
  },
  bannerSecondary: {
    height: 420,
    width: 420,
    justifyContent: "flex-start",
  },
  bannerContainerSecondary: {
    borderWidth: 5,
    borderRadius: 10,
    borderColor: "black",
    width: 270,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainerSecondary: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  quoteSecondary: {
    fontSize: 25,
    marginBottom: 20,
    textAlign: "center",
    paddingHorizontal: 60,
    paddingVertical: 20,
  },
  bottomSecondary: {
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  buttonSecondary: {
    backgroundColor: "#F8961E",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 10,
    marginHorizontal: 40,
    width: "30%",
  },
  buttonTextSecondary: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
