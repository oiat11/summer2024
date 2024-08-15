import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, SafeAreaView, FlatList, Button } from 'react-native';
import Header from './Header';
import Input from './Input';
import GoalItem from './GoalItem';
import PressableButton from './PressableButton';
import { database, auth, storage } from '../Firebase/FirebaseSetup';
import { deleteFromDB, writeToDB } from '../Firebase/firestoreHelper';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { ref, uploadBytesResumable } from 'firebase/storage';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { Platform } from "react-native";
import { verifyPermissions } from './NotificationManager';

export default function Home({ navigation }) {
  const appName = 'Summer 2024 class';
  const [modalVisible, setModalVisible] = useState(false);
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    async function getToken() {
      try {
        const permissionResponse = await verifyPermissions();
        console.log("Permission response:", permissionResponse);
        if (!permissionResponse) {
          return;
        }
        console.log(permissionResponse);
        if (Platform.OS === "android") {
          await Notifications.setNotificationChannelAsync("default", {
            name: "default",
            importance: Notifications.AndroidImportance.MAX,
          });
        }
        const tokenData = await Notifications.getExpoPushTokenAsync({
          projectId: Constants.expoConfig.extra.eas.projectId,
        });
        console.log("Push token:", tokenData);
      } catch (error) {
        console.error("Error getting push token:", error);
      }
    }
  
    getToken();
  }, []);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(collection(database, "goals"), where("owner", "==", auth.currentUser.uid)),
      (querySnapshot) => {
        let newArray = [];
        if (!querySnapshot.empty) {
          querySnapshot.forEach((docSnapshot) => {
            newArray.push({ ...docSnapshot.data(), id: docSnapshot.id });
          });
        }
        setGoals(newArray);
      },
      (err) => {
        console.log(`Error: ${err}`);
      }
    );

    return () => unsubscribe();
  }, []);

  async function retrieveAndUploadImage(uri) {
    try {
    const response = await fetch(uri);
    if (!response.ok) {
     throw new Error("The request was not successful");
    }
    const blob = await response.blob();
    const imageName = uri.substring(uri.lastIndexOf('/') + 1);
    const imageRef = ref(storage, `images/${imageName}`)
    const uploadResult = await uploadBytesResumable(imageRef, blob);
    return uploadResult.metadata.fullPath;
    } catch (e) {
      console.error('Error retrieving image:', e);
    }
  }

  async function handleInputData(data) {
    let imageUri = '';
    if (data.imageUri) {
      imageUri = await retrieveAndUploadImage(data.imageUri);
    }
    const newGoal = { text: data.text, owner: auth.currentUser.uid, imageUri: imageUri };
    console.log('New goal:', newGoal);
    writeToDB(newGoal, "goals");
    setModalVisible(false);
  }

  function handleCancel() {
    setModalVisible(false);
  }

  function handleDelete(deleteId) {
    deleteFromDB(deleteId, "goals");
  }
  async function pushNotificationHandler() {

      const response = await fetch("https://exp.host/--/api/v2/push/send", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          to: "ExponentPushToken[D3t1eFNz1Z6GukuCosjFB9]",
          title: "Push Notification",
          body: "This is a push notification",
        }),
      });
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topContainer}>
        <Header appName={appName} theme="dark" />
        <Input inputHandler={handleInputData} isModalVisible={modalVisible} onCancel={handleCancel} />
        <PressableButton style={styles.buttonStyle} pressedFunction={() => setModalVisible(true)}>
          <Text style={styles.textStyle}>Add a goal</Text>
        </PressableButton>
        <Button title="test push notification" onPress={pushNotificationHandler} />
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
