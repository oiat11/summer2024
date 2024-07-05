 import { StatusBar } from 'expo-status-bar';
import Header from './Components/Header';
import Input from './Components/Input';
import {  View, Text ,StyleSheet } from 'react-native';

export default function App() {
  const appName = 'Summer 2024 class';

  return (
    <View style={styles.container}>
      <Header appName={appName} theme = 'dark'>
        <Text>Lab2 Question 1: </Text>
        <Text>onChange is used in React for web applications with standard HTML input elements. It triggers an event when the value of an input element changes. And we need to access the event.target.value to get the new value
              onChangeText is used in React Native for mobile applications with React Native TextInput components. It directly provides the new value as a parameter to the handler.
        <Text>Lab2 Question 2: </Text>    
        <Text>add "secureTextEntry={true}" to TextInput</Text>
        </Text>
      </Header>
      <Input />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
