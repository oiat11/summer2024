import { StatusBar } from 'expo-status-bar';
import Header from './Header';
import Input from './Input';
import { View, Text, StyleSheet, Button, SafeAreaView, FlatList } from 'react-native';
import { useEffect, useState } from 'react';
import GoalItem from './GoalItem';
import PressableButton from './PressableButton';
import { database } from '../Firebase/FirebaseSetup';
import { deleteFromDB} from '../Firebase/firestoreHelper';
import {writeToDB} from '../Firebase/firestoreHelper';
import { collection, onSnapshot } from 'firebase/firestore';

export default function Home({ navigation }) {
  const appName = 'Summer 2024 class';
  const [modalVisible, setModalVisible] = useState(false);
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    onSnapshot(collection(database, 'goals'), (querySnapshot) => {
      let newArray = [];
      if(!querySnapshot.empty) {
      querySnapshot.forEach((docSnapshot) => {
        console.log(docSnapshot);
        newArray.push({ ...docSnapshot.data().data, id: docSnapshot.id });
        
      });}
      setGoals(newArray);
    });
  }, []);


  function handleInputData(data) {
    const newGoal = { text: data };
    setGoals(currentGoals => [...currentGoals, newGoal]);
    writeToDB(newGoal, "goals");
    setModalVisible(false);
  }

  function handleCancel() {
    setModalVisible(false);
  }

  function handleDelete(deleteId) {
    console.log('deleteId', deleteId);
    //setGoals(currentGoals => currentGoals.filter(goal => goal.id !== deleteId));
    deleteFromDB(deleteId, "goals");
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContainer}>
        <Header appName={appName} theme="dark" />
        <Input inputHandler={handleInputData} isModalVisible={modalVisible} onCancel={handleCancel} />
        {/*<Button title="Add a goal" onPress={() => setModalVisible(true)} />*/}
        <PressableButton style={styles.buttonStyle} pressedFunction={() => setModalVisible(true)}><Text style={styles.textStyle}>Add a goal</Text></PressableButton>
      </View>
      <View style={styles.bottomContainer}>
        {goals.length === 0 && <Text style={styles.noGoalsText}>Please add a goal</Text>}
        <FlatList
          data={goals}
          renderItem={({ item }) => (
            <GoalItem
              goal={item}
              deleteHandler={() => handleDelete(item.id)}
              navigation={navigation}
            />
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
  textStyle: {
    fontSize: 25,
    color: 'darkmagenta',
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
  buttonStyle: {
   borderRadius: 5,
   padding: 5,
     },
});
