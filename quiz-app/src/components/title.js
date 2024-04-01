// Title.js
import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useRoute } from '@react-navigation/native';

const Title = ({ firstName }) => {
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
        // return (
        //   <View>
        //   <Text>{`Welcome ${firstName}`}</Text>
        //   <View style={styles.imageOverlay}>
        //         <Image
        //           source={{ uri: 'https://ugokawaii.com/wp-content/uploads/2022/12/quiz-time.gif' }}
        //           style={styles.cardImage}
        //           resizeMode="cover"
        //         />
        //   </View>
        //   </View>
        //   );
        if(firstName){ 
             return `Welcome ${firstName} 🕵🏻`
        }else{
            return 'Quiz-App'
        }
      case 'Option':
        return 'Select Options';
      case 'Result':
        return 'Result';
      case 'Admin':
        return 'Admin';
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
