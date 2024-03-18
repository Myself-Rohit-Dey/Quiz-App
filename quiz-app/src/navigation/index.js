// MyStack.js
import { createStackNavigator } from '@react-navigation/stack';
import Start from '../screens/start';
import Login from '../screens/login';
import Register from '../screens/register';
import Home from '../screens/home';
import Option from '../screens/option';
import Quiz from '../screens/quiz';
import Result from '../screens/result';
import React from 'react';
import Title from '../components/title';


const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Start"
        component={Start}
        options={({ navigation }) => ({
          headerShown: false,
          headerTitle: () => <Title navigation={navigation} />,
        })}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={({ navigation }) => ({
          headerShown: false,
          headerTitle: () => <Title navigation={navigation} />,
        })}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={({ navigation }) => ({
          headerShown: false,
          headerTitle: () => <Title navigation={navigation} />,
        })}
      />
      <Stack.Screen
        name="Home"
        component={Home}
        options={({ navigation }) => ({
          headerShown: false,
          headerTitle: () => <Title navigation={navigation} />,
        })}
      />
      <Stack.Screen
        name="Option"
        component={Option}
        options={({ navigation }) => ({
          headerShown: false,
          headerTitle: () => <Title navigation={navigation} />,
        })}
      />
      <Stack.Screen
        name="Quiz"
        component={Quiz}
        options={({ navigation }) => ({
          headerShown: false,
          headerTitle: () => <Title navigation={navigation} />,
        })}
      />
      <Stack.Screen
        name="Result"
        component={Result}
        options={({ navigation }) => ({
          headerShown: false,
          headerTitle: () => <Title navigation={navigation} />,
        })}
      />
    </Stack.Navigator>
  );
}

export default MyStack;
