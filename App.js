import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import Header from './Components/Header';

export default function App() {
  const appName = 'Summer 2024 class';
  const [text, setText] = useState('');

  return (
    <View style={styles.container}>
      <Header appName={appName} theme = 'dark'>
        <Text>Some other children</Text>
      </Header>
      <TextInput
        style={{ height: 40}}
        placeholder="Type here to translate!"
        onChangeText={text => setText(text)}
        value={text}
        />
      <Text>User typed: {text}</Text>
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
