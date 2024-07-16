import { StatusBar } from 'expo-status-bar';
import Header from './Header';
import Input from './Input';
import { View, Text, StyleSheet, Button, SafeAreaView, FlatList } from 'react-native';
import { useState } from 'react';
import GoalItem from './GoalItem';

export default function Home({ navigation }) {
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

  function handleDelete(deleteId) {
    setGoals(currentGoals => currentGoals.filter(goal => goal.id !== deleteId));
  }

  function handlePressGoal(goal) {
    console.log('Goal id:', goal.id);
    navigation.navigate('Details', { goalObj: goal });
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
        <FlatList
          data={goals}
          renderItem={({ item }) => (
            <GoalItem goal={item} deleteHandler={handleDelete} pressHandler={handlePressGoal(item)} />
          )}
          keyExtractor={item => item.id}
        />
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
