import React, { useState, useEffect } from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet, ScrollView, Animated } from 'react-native';
import Title from '../components/title';

const Home = ({ navigation }) => {
  const [scrollY] = useState(new Animated.Value(0));

  useEffect(() => {
    const listener = scrollY.addListener(({ value }) => {
      // Your custom logic if needed
    });
    return () => {
      scrollY.removeListener(listener);
    };
  }, [scrollY]);

  const startQuiz = () => {
    // Navigate to the quiz screen
    navigation.navigate('Quiz')
  };

  // Static data for the cards
  const cardData = [
    { score: 100, time: '05:00min', imageUrl: 'https://ugokawaii.com/wp-content/uploads/2022/12/quiz-time.gif' },
    { score: 20, time: '04:59min', imageUrl: 'https://ugokawaii.com/wp-content/uploads/2022/12/quiz-time.gif' },
    { score: 30, time: '02:38min', imageUrl: 'https://ugokawaii.com/wp-content/uploads/2022/12/quiz-time.gif' },
    // Add more objects for additional cards
  ];

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        <Animated.View style={{ opacity: scrollY.interpolate({
          inputRange: [0, 50],
          outputRange: [1, 0],
          extrapolate: 'clamp',
        }) }}>
          <Title />
        </Animated.View>
        <View style={styles.imageContainer}>
          <View style={styles.bannerContainer}>
            <Image
              source={{
                uri: 'https://ugokawaii.com/wp-content/uploads/2022/12/quiz-time.gif'
              }}
              style={styles.banner}
              resizeMode='contain'
            />
          </View>
        </View>
        <TouchableOpacity onPress={startQuiz} style={styles.button}>
          <Text style={styles.buttonText}>Start</Text>
        </TouchableOpacity>
        <View style={styles.cardContainer}>
          {cardData.map((card, index) => (
            <View key={index} style={styles.card}>
              <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingTop: 40 }}>
                <Text style={{ color: 'white', fontWeight: '800' }}>Score</Text>
                <Text style={{ color: 'white', fontWeight: '800' }}>{card.score}</Text>
              </View>
              <View style={{ alignItems: 'flex-end', paddingTop: 10, paddingRight: 20 }}>
                <Text style={{ color: 'white' }}>Time: {card.time}</Text>
              </View>
              <View style={styles.imageOverlay}>
                <Image
                  source={{ uri: card.imageUrl }}
                  style={styles.cardImage}
                  resizeMode="cover"
                />
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
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
    justifyContent: 'flex-start',
  },
  bannerContainer: {
    borderWidth: 5,
    borderRadius: 10,
    borderColor: 'black',
    width: 270,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#F8961E',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginVertical: 20,
  },
  buttonText: {
    fontSize: 24,
    fontWeight: '600',
    color: 'white',
  },
  cardContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    paddingBottom: 80,
  },
  card: {
    width: 350,
    height: 100,
    backgroundColor: '#073B4C',
    margin: 5,
    marginBottom: 25,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'gray',
    position: 'relative', // Required for absolute positioning within the card
  },
  imageOverlay: {
    position: 'absolute',
    top: -30, // Adjust position as needed
    right: 10, // Adjust position as needed
    borderRadius: 50, // Half of the image width and height for a circle
    overflow: 'hidden', // Ensure the image is clipped if it exceeds the border radius
  },
  cardImage: {
    width: 60, // Adjust image size as needed
    height: 60, // Adjust image size as needed
  },
});
