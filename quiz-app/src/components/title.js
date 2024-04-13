import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useRoute } from '@react-navigation/native';

const Title = ({ firstName }) => {
  const route = useRoute();

  // Function to determine the title based on the current route
  const getTitle = () => {
    switch (route.name) {
      case 'Start':
        return 'Quiz-App'; // Title for the Start screen
      case 'Login':
        return 'Login'; // Title for the Login screen
      case 'Register':
        return 'Register'; // Title for the Register screen
      case 'Home':
        // Title for the Home screen, including the user's first name if available
        if (firstName) {
          return `Welcome ${firstName} 🕵🏻`; // Display the user's first name with a welcome message
        } else {
          return 'Quiz-App'; // Default title for the Home screen if the user's first name is not available
        }
      case 'Option':
        return 'Select Options'; // Title for the Option screen
      case 'Result':
        return 'Result'; // Title for the Result screen
      case 'Admin':
        return 'Admin'; // Title for the Admin screen
    }
  };

  return (
    <View style={styles.container}>
      {/* Display the title based on the current route */}
      <Text style={styles.title}>{getTitle()}</Text>
    </View>
  );
};

export default Title;

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: '600',
    textAlign: 'center',
  },
});
