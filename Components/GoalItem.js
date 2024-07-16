import { View, Text, StyleSheet, Button } from 'react-native';
import React from 'react';

const GoalItem = ({ goal, deleteHandler, pressHandler }) => {
  return (
    <View style={styles.textContainer}>
      <Text style={styles.textStyle}>{goal.text}</Text>
      <Button color="black" title="X" onPress={() => deleteHandler(goal.id)} />
      <Button color="black" title="i" onPress={() => pressHandler(goal.id)} />
    </View>
  );
};

const styles = StyleSheet.create({
    textStyle: {
      fontSize: 20,
      color: 'darkmagenta',
    },
    textContainer: {
      width: '30%', 
      backgroundColor: "#aaa",
      padding: 10,
      marginVertical: 10,
      flexDirection: 'row',
      borderRadius: 5,
      alignSelf: 'center',
      justifyContent: 'center', 
      alignItems: 'center', 
    },
  });

export default GoalItem;
