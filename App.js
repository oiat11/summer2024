import { StatusBar } from 'expo-status-bar';
import Header from './Components/Header';
import Input from './Components/Input';
import { View, Text, StyleSheet, Button, SafeAreaView } from 'react-native';
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
    <SafeAreaView style={styles.container}>
      <View style={styles.topContainer}>
      <Header appName={appName} theme="dark">
        <Text>children</Text>
      </Header>
      <Input inputHandler={handleInputData} isModalVisible={modalVisible} />
      <Button title="Add a goal" onPress={() => setModalVisible(true)} />
      </View>
      <View style={styles.bottomContainer}>
      <Text style={styles.textStyle}>{text}</Text>
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    fontSize: 20,
    color: 'red',
  },
  topContainer: {
    alignItems: 'center',
    flex: 1,
  },
  bottomContainer: {
    flex: 4,
    backgroundColor: '#dcd',
    alignItems: 'center',
  },
});
