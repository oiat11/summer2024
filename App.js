import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Components/Home';
import GoalDetails from './Components/GoalDetails';
import Login from './Components/Login';
import Signup from './Components/Signup';

const Stack = createNativeStackNavigator();

const commonScreenOptions = {
  headerStyle: { backgroundColor: 'darkmagenta' },
  headerTintColor: '#fff',
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Signup" screenOptions={commonScreenOptions}>
        <Stack.Screen name="Home" component={Home} options={{title:"All Goals"}}/>
        <Stack.Screen
          name="Details"
          component={GoalDetails}
          options={({ route }) => ({
            title: route.params.goalObj.text,
          })}
        />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
