 import { StatusBar } from 'expo-status-bar';
import Header from './Components/Header';
import Input from './Components/Input';
import {  View, Text ,StyleSheet } from 'react-native';

export default function App() {
  const appName = 'Summer 2024 class';

  return (
    <View style={styles.container}>
      <Header appName={appName} theme = 'dark'>
        <Text>Some other children</Text>
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
