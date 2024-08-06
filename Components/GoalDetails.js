import { View, Text, Button, StyleSheet, Image } from 'react-native';
import React, { useState, useLayoutEffect, useEffect } from 'react';
import { updateWarningStatus } from '../Firebase/firestoreHelper'; 
import GoalUsers from './GoalUsers';
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from '../Firebase/FirebaseSetup'; 

const GoalDetails = ({ navigation, route }) => {
  const [isWarning, setIsWarning] = useState(false);
  const { goalObj } = route.params;
  const [imageUri, setImageUri] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isWarning ? 'Warning!' : goalObj.text,
      headerRight: () => (
        <Button
          title="Warning"
          onPress={async () => {
            const newWarningStatus = !isWarning;
            setIsWarning(newWarningStatus);
            await updateWarningStatus(goalObj.id, 'goals', newWarningStatus);
          }}
        />
      ),
    });
  }, [navigation, isWarning, goalObj.text]);

  useEffect(() => {
    async function fetchImageUri() {
      if (route.params) {
        try {
          const url = await getDownloadURL(ref(storage, route.params.goalObj.imageUri));
          setImageUri(url);
        } catch (e) {
          console.error('Error getting download URL:', e);
        }
      }
    }
    fetchImageUri();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={[styles.text, isWarning && styles.warningText]}>
        You are seeing the details of the goal with text: {goalObj.text} and id: {goalObj.id}
      </Text>
      {imageUri ? <Image source={{ uri: imageUri }} style={styles.image} /> : null}
      <Button title="More Details" onPress={() => navigation.push('Details', { goalObj })} />
      <GoalUsers id={goalObj.id} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  text: {
    fontSize: 18,
  },
  warningText: {
    color: 'red',
  },
  image: {
    width: '100%',
    height: 200,
    marginVertical: 20,
  },
});

export default GoalDetails;
