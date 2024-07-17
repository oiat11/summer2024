import { View, Text, Button, StyleSheet } from 'react-native';
import React, { useState, useLayoutEffect } from 'react';

const GoalDetails = ({ navigation, route }) => {
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
        You are seeing the details of the goal with text: {goalObj.text} and id: {goalObj.id}
      </Text>
      <Button title="More Details" onPress={() => navigation.push('Details', { goalObj })} />
    </View>
  );
};

const styles = StyleSheet.create({
  warningText: {
    color: 'red',
  },
});

export default GoalDetails;
