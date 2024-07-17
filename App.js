import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Components/Home';
import GoalDetails from './Components/GoalDetails';

const Stack = createNativeStackNavigator();

const commonScreenOptions = {
  headerStyle: { backgroundColor: 'darkmagenta' },
  headerTintColor: '#fff',
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={commonScreenOptions}>
        <Stack.Screen name="Home" component={Home} options={{title:"All Goals"}}/>
        <Stack.Screen
          name="Details"
          component={GoalDetails}
          options={({ route }) => ({
            title: route.params.goalObj.text,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
