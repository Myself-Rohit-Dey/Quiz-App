import { createStackNavigator } from '@react-navigation/stack';
import { useAuth } from '../context/authContext';
import Login from '../screens/login';
import Register from '../screens/register';
import Home from '../screens/home';
import Option from '../screens/option';
import Quiz from '../screens/quiz';
import React from 'react';
import Title from '../components/title';
import ErrorPage from '../screens/errorPage';
import Admin from '../screens/admin';

const Stack = createStackNavigator();

function MyStack() {
  const { user } = useAuth(); // Access the user object from the authentication context

  return (
    <Stack.Navigator>
      {/* Home Screen */}
      <Stack.Screen
        name="Home"
        component={Home}
        options={({ navigation }) => ({
          headerShown: false, // Hide the header
          headerTitle: () => <Title navigation={navigation} />, // Custom header title component
        })}
      />
      
      {/* Admin Screen (visible only to admin users) */}
      {user && user.role == 'ADMIN' && (
        <Stack.Screen
          name="Admin"
          component={Admin}
          options={({ navigation }) => ({
            headerShown: false, // Hide the header
            headerTitle: () => <Title navigation={navigation} />, // Custom header title component
          })}
        />
      )}

      {/* Register Screen */}
      <Stack.Screen
        name="Register"
        component={Register}
        options={({ navigation }) => ({
          headerShown: false, // Hide the header
          headerTitle: () => <Title navigation={navigation} />, // Custom header title component
        })}
      />

      {/* Login Screen */}
      <Stack.Screen
        name="Login"
        component={Login}
        options={({ navigation }) => ({
          headerShown: false, // Hide the header
          headerTitle: () => <Title navigation={navigation} />, // Custom header title component
        })}
      />
      
      {/* Option Screen */}
      <Stack.Screen
        name="Option"
        component={Option}
        options={({ navigation }) => ({
          headerShown: false, // Hide the header
          headerTitle: () => <Title navigation={navigation} />, // Custom header title component
        })}
      />
      
      {/* Quiz Screen */}
      <Stack.Screen
        name="Quiz"
        component={Quiz}
        options={({ navigation }) => ({
          headerShown: false, // Hide the header
          headerTitle: () => <Title navigation={navigation} />, // Custom header title component
        })}
      />
      
      {/* ErrorPage Screen */}
      <Stack.Screen
        name="ErrorPage"
        component={ErrorPage}
        options={({ navigation }) => ({
          headerShown: false, // Hide the header
          headerTitle: () => <Title navigation={navigation} />, // Custom header title component
        })}
      />
    </Stack.Navigator>
  );
}

export default MyStack;
