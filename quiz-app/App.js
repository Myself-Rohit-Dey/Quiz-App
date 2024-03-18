// import 'react-native-gesture-handler';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MyStack from './src/navigation';
import Transition from './src/components/transition';

export default function App() {
  return (
    // <GestureHandlerRootView>
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
