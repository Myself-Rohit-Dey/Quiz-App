// Title.js
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useRoute } from '@react-navigation/native';

const Title = () => {
  const route = useRoute();

  // Conditional rendering based on route name
  const getTitle = () => {
    switch (route.name) {
      case 'Start':
        return 'Quiz-App'
      case 'Login':
        return 'Login';
      case 'Register':
        return 'Register';
      case 'Home':
        return 'Welcome User';
      case 'Option':
        return 'Select Options';
      case 'Result':
        return 'Result';
    }
  };

  return (
    <View style={styles.container}>
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
