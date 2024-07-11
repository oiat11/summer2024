import { StatusBar } from 'expo-status-bar';
import Header from './Components/Header';
import Input from './Components/Input';
import { View, Text, StyleSheet, Button, SafeAreaView, ScrollView } from 'react-native';
import { useState } from 'react';

export default function App() {
  const appName = 'Summer 2024 class';
  const [modalVisible, setModalVisible] = useState(false);
  const [goals, setGoals] = useState([]);

  function handleInputData(data) {
    const newGoal = { text: data, id: Math.random().toString() };
    setGoals(currentGoals => [...currentGoals, newGoal]);
    setModalVisible(false); 
  }

  function handleCancel() {
    setModalVisible(false);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContainer}>
        <Header appName={appName} theme="dark" />
        <Input inputHandler={handleInputData} isModalVisible={modalVisible} onCancel={handleCancel} />
        <Button title="Add a goal" onPress={() => setModalVisible(true)} />
      </View>
      <View style={styles.bottomContainer}>
        {goals.length === 0 && <Text style={styles.noGoalsText}>Please add a goal</Text>}
        <ScrollView>
          {goals.map((goalObj) => {
            console.log(goalObj);
            return (
              <View key={goalObj.id} style={styles.textContainer}>
                <Text style={styles.textStyle}>{goalObj.text}</Text>
              </View>
            );
          })}
        </ScrollView>
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  textStyle: {
    fontSize: 20,
    color: 'darkmagenta',
  },
  textContainer: {
    width: '10%',
    backgroundColor: "#aaa",
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    alignSelf: 'center',
  },
  topContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  bottomContainer: {
    alignContent: 'center',
    justifyContent: 'center',
    flex: 4,
    backgroundColor: '#dcd',
    width: '100%', 
  },

  noGoalsText: {
    fontSize: 18,
    color: 'darkmagenta',
    textAlign: 'center',
    marginVertical: 20,
  },
});
