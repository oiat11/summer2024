<<<<<<< HEAD
import { View, Text, Button, StyleSheet } from 'react-native';
import React, { useState, useLayoutEffect } from 'react';

const GoalDetails = ({ navigation, route }) => {
=======
import React, { useState, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const GoalDetails = ({ route, navigation }) => {
>>>>>>> 97d8612 (Updated GoalDetails.js to handle the button press and update the header)
  const [isWarning, setIsWarning] = useState(false);
  const { goalObj } = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isWarning ? 'Warning!' : goalObj.text,
      headerRight: () => (
        <Button
          title="Warning"
          onPress={() => setIsWarning(!isWarning)}
        />
      ),
    });
  }, [navigation, isWarning, goalObj.text]);

  return (
    <View style={styles.container}>
      <Text style={[styles.text, isWarning && styles.warningText]}>
<<<<<<< HEAD
        You are seeing the details of the goal with text: {goalObj.text} and id: {goalObj.id}
      </Text>
      <Button title="More Details" onPress={() => navigation.push('Details', { goalObj })} />
=======
        {goalObj.text}
      </Text>
>>>>>>> 97d8612 (Updated GoalDetails.js to handle the button press and update the header)
    </View>
  );
};

const styles = StyleSheet.create({
  warningText: {
    color: 'red',
  },
});

export default GoalDetails;
