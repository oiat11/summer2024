import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './Components/Home';
import GoalDetails from './Components/GoalDetails';
import Login from './Components/Login';
import Signup from './Components/Signup';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './Firebase/FirebaseSetup';

const Stack = createNativeStackNavigator();

const commonScreenOptions = {
  headerStyle: { backgroundColor: 'darkmagenta' },
  headerTintColor: '#fff',
};

const AuthStack = (
  <>
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="Signup" component={Signup} />
  </>
);

const AppStack = (
  <>
    <Stack.Screen name="Home" component={Home} options={{ title: "All Goals" }} />
    <Stack.Screen
      name="Details"
      component={GoalDetails}
      options={({ route }) => ({
        title: route.params.goalObj.text,
      })}
    />
  </>
);

export default function App() {
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth,(user) => {
      if (user) {
        setIsUserAuthenticated(true);
      }
      else {
        setIsUserAuthenticated(false);
      }
    })
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={commonScreenOptions}>
        {isUserAuthenticated ? AppStack : AuthStack}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
