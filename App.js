import React from 'react';
import { Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Components/Home';
import GoalDetails from './Components/GoalDetails';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} options={{title:"All Goals", headerStyle: { backgroundColor: 'darkmagenta' }, headerTintColor:"#fff" }}/>
        <Stack.Screen
          name="Details"
          component={GoalDetails}
          options={({ route }) => ({
            title: route.params.goalObj.text,
            headerStyle: { backgroundColor: 'darkmagenta' }, headerTintColor:"#fff",
            headerRight: () => <Button title="Warning" onPress={() => console.log('Warning!')} />,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
