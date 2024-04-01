// import 'react-native-gesture-handler';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useState,useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Animated } from 'react-native';
import MyStack from './src/navigation';
// import Transition from './src/components/transition';
// import { TokenProvider } from './src/context/tokenContext';
import { AuthProvider } from './src/context/authContext';


export default function App() {
  const [scrollY] = useState(new Animated.Value(0));

  useEffect(() => {
    // Add listener for scroll animation if needed
    const listener = scrollY.addListener(({ value }) => {
      // Your custom logic if needed
    });
    return () => {
      scrollY.removeListener(listener);
    };
  }, [scrollY]);
  return (
    
    // <GestureHandlerRootView>
    // <TokenProvider>
    <AuthProvider>
    <View style={styles.container}>
      {/* <Text>Open up App.js to start working on your app!</Text> */}
      <StatusBar style="auto" />
      {/* <Text>This is Quiz</Text> */}
      {/* <Home/> */}
      {/* <Quiz/> */}
      {/* <Result/> */}
      <NavigationContainer>
        {/* <Transition> */}
          <MyStack/>
        {/* </Transition> */}
      </NavigationContainer>
    </View>
    </AuthProvider>
    // </TokenProvider>
    // </GestureHandlerRootView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    paddingTop: 0,
    // paddingHorizontal: 20,  
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
