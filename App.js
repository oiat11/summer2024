import { StatusBar } from 'expo-status-bar';
import Header from './Components/Header';
import Input from './Components/Input';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useState } from 'react';

export default function App() {
  const appName = 'Summer 2024 class';
  const [text, setText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  function handleInputData(data) {
    console.log('callback fn called with:', data);
    setText(data);
    setModalVisible(false); 
  }

  return (
    <View style={styles.container}>
      <Header appName={appName} theme="dark">
        <Text>children</Text>
      </Header>
      <Input inputHandler={handleInputData} isModalVisible={modalVisible} />
      <Text>{text}</Text>
      <StatusBar style="auto" />
      <Button title="Add a goal" onPress={() => setModalVisible(true)} />
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
