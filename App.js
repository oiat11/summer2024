import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./Components/Home";
import GoalDetails from "./Components/GoalDetails";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./Firebase/FirebaseSetup";
import Profile from "./Components/Profile";
import PressableButton from "./Components/PressableButton";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { signOut } from 'firebase/auth';


const Stack = createNativeStackNavigator();

const commonScreenOptions = {
  headerStyle: { backgroundColor: "darkmagenta" },
  headerTintColor: "#fff",
};

const handleLogout = async (navigation) => {
  try {
    await signOut(auth);
    navigation.navigate('Login'); 
  } catch (error) {
    console.error("Error logging out: ", error);
  }
};


const AuthStack = (
  <>
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="Signup" component={Signup} />
  </>
);

const AppStack = (
  <>
    <Stack.Screen
      name="Home"
      component={Home}
      options={({ navigation }) => ({
        title: "All Goals",
        headerRight: () => (
          <PressableButton
            pressedFunction={() => navigation.navigate("Profile")}
          >
            <FontAwesome6 name="person" size={24} color="white" />
          </PressableButton>
        ),
      })}
    />
    <Stack.Screen
      name="Details"
      component={GoalDetails}
      options={({ route }) => ({
        title: route.params.goalObj.text,
      })}
    />
    <Stack.Screen name="Profile" component={Profile} options={({navigation}) => ({
      title: 'Profile',
      headerRight: () => (
        <PressableButton pressedFunction={() => handleLogout(navigation)}>
          <MaterialIcons name="logout" size={24} color="white" />
        </PressableButton>
      ),
    })}/>
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
