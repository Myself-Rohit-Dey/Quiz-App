import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Animated,
  // RefreshControl
} from "react-native";
import Title from "../components/title";
import { useAuth } from "../context/authContext";

const Home = ({ navigation, route }) => {
  const [scrollY] = useState(new Animated.Value(0));
  const { user, logout } = useAuth();
  const [quizzes, setQuizzes] = useState([]);
  // const [refreshing, setRefreshing] = useState(false);
  // const [userName, setUserName] = useState("");
  // const userData = route.params.userData;
  // const { token } = useToken();

  // useEffect(() => {
  //   console.log('Token:', token);
  // }, [token]);

  // useEffect(() => {
  //   // Fetch user details using auth token //Future Implementation
  //   // const fetchUserData = async () => {
  //   //   try {
  //   //     // Send a GET request to fetch user details
  //   //     const response = await fetch('https://tame-colts-allow.loca.lt/user', {
  //   //       method: 'GET',
  //   //       headers: {
  //   //         'Authorization': `Bearer ${token}`, // Replace YOUR_AUTH_TOKEN with the actual auth token
  //   //         'Content-Type': 'application/json',
  //   //       },
  //   //     });
  //   //     const userData = await response.json();
  //   //     if (userData.success) {
  //   //       // Extract user name from user data
  //   //       setUserName(userData.user.name); // Assuming user name is stored in 'name' field
  //   //     } else {
  //   //       console.error('Failed to fetch user details:', userData.message);
  //   //     }
  //   //   } catch (error) {
  //   //     console.error('Error fetching user details:', error);
  //   //   }
  //   // };

  //   // fetchUserData(); // Fetch user data when component mounts
  //   // console.log(user.id);
  //   // Fetch data from the API endpoint

  //   console.log(user);
  //   // Add listener for scroll animation if needed
  //   const listener = scrollY.addListener(({ value }) => {
  //     // Your custom logic if needed
  //   });
  //   return () => {
  //     scrollY.removeListener(listener);
  //   };
  // }, [scrollY, user]);
  useEffect(() => {
    fetchQuizzes();
  }, [user]);

  const fetchQuizzes = () =>{
    if (user) {
      fetch(
        `https://9f41-2402-3a80-196c-777a-b1d9-85d8-92de-85ff.ngrok-free.app/result/${user.id}`
      )
        .then((response) => response.json())
        .then((data) => {
          setQuizzes(data); // Update state with fetched data
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }

  const onRefresh = () => {
    // setRefreshing(true);
    fetchQuizzes();
    // setRefreshing(false);
  };

  const startQuiz = () => {
    // Navigate to the quiz screen
    navigation.navigate("Option");
  };
  const handleLogOut = () => {
    // navigation.navigate("Start");
    logout();
  };
  const handleLogin = () => {
    // Navigate to the login screen
    navigation.navigate("Login");
  };

  const handleRegister = () => {
    // Navigate to the register screen
    navigation.navigate("Register");
  };
  const handleAdmin = () => {
    navigation.navigate("Admin");
  };

  // Static data for the cards
  // const cardData = [
  //   {
  //     score: 100,
  //     time: "05:00min",
  //     imageUrl:
  //       "https://ugokawaii.com/wp-content/uploads/2022/12/quiz-time.gif",
  //   },
  //   {
  //     score: 20,
  //     time: "04:59min",
  //     imageUrl:
  //       "https://ugokawaii.com/wp-content/uploads/2022/12/quiz-time.gif",
  //   },
  //   {
  //     score: 30,
  //     time: "02:38min",
  //     imageUrl:
  //       "https://ugokawaii.com/wp-content/uploads/2022/12/quiz-time.gif",
  //   },
  //   // Add more objects for additional cards
  // ];

  return (
    <>
      {user ? (
        <View style={styles.container}>
          <ScrollView
            style={styles.scrollView}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { y: scrollY } } }],
              { useNativeDriver: false }
            )}
            scrollEventThrottle={16}
            // refreshControl={
            //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            // }
          >
            <Animated.View
              style={{
                opacity: scrollY.interpolate({
                  inputRange: [0, 50],
                  outputRange: [1, 0],
                  extrapolate: "clamp",
                }),
              }}
            >
              <Title firstName={user.first_name} />
              {/* <Text style={styles.userName}>{userName ? `Welcome, ${userName}!` : ''}</Text> */}
            </Animated.View>
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
            <TouchableOpacity onPress={startQuiz} style={styles.button}>
              <Text style={styles.buttonText}>Start</Text>
            </TouchableOpacity>
            <View style={styles.cardContainer}>
              {quizzes.map((quiz, index) => (
                <View key={index} style={styles.card}>
                  {/* Rounded rectangle container for the topic */}
                  <View style={styles.topicContainer}>
                    <Text style={styles.topicText}>{quiz.title}</Text>
                  </View>
                  {/* Rest of the card content */}
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
              ))}
              <View style={{padding:10, borderWidth: 1, borderRadius: 10, marginBottom:20 }}>
                <TouchableOpacity onPress={onRefresh}>
                  <Text>Refresh</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.bottom}>
                <TouchableOpacity style={styles.button2} onPress={handleLogOut}>
                  <Text style={styles.buttonText2}>Logout</Text>
                </TouchableOpacity>
                {user.role == "ADMIN" && (
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
      ) : (
        <View style={styles.containerSecondary}>
          <Title />
          <View style={styles.topSecondary}>
            {/* <View style={styles.quoteContainer}> */}
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
            {/* </View> */}
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
    position: 'absolute',
    top: -10,
    left: -10,
    backgroundColor: '#F8961E',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderTopLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  topicText: {
    color: 'white',
    fontWeight: 'bold',
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
