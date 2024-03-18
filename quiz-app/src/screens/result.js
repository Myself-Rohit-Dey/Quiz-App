import { TouchableOpacity, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Title from '../components/title';
import Icon from 'react-native-vector-icons/Ionicons'; // Import Ionicons from the library

const Result = ({ navigation, route }) => {
  const score = route.params?.score || 0;
  const totalTimeTaken = route.params?.totalTimeTaken || 0;
  const totalTimeTakenInMinutes = Math.floor(totalTimeTaken / 60); // Convert seconds to minutes
  const totalTimeTakenInSeconds = totalTimeTaken % 60; // Get the remaining seconds
  
  const handleRetry = () => {
    navigation.navigate("Quiz", { newQuiz: true });
  };

  return (
    <View style={styles.container}>
      <View>
        <Title />
      </View>
      <View style={styles.bannerContainer}>
        <Image
          source={{
            uri: 'https://ugokawaii.com/wp-content/uploads/2022/12/quiz-time.gif'
          }}
          style={styles.banner}
          resizeMode='contain'
        />
      </View>
      <Text style={styles.resultText}>Your Score: {score}</Text>
      <Text style={styles.resultText}>Total Time Taken: {totalTimeTakenInMinutes} minutes {totalTimeTakenInSeconds} seconds</Text>
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Icon name="home-outline" size={30} color="black" style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleRetry}>
          <Icon name="reload-outline" size={30} color="black" style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Result

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    paddingHorizontal: 20,
    height: '100%'
  },
  banner: {
    height: 400,
    width: 400,
  },
  bannerContainer: {
    borderRadius: 10,
    borderWidth: 5,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actions: {
    marginBottom: 12,
    marginVertical: 16,
    justifyContent: "center",
    flexDirection: "row",
  },
  icon: {
    padding: 10
  },
  resultText: {
    fontSize: 14,
    fontWeight: '900',
    margin: 20,
    textAlign: 'center'
  },
})
