import { View, Text, StyleSheet, Button, Pressable } from 'react-native';
import React from 'react';

const GoalItem = ({ goal, deleteHandler, navigation }) => {
  return (
    <View style={styles.textContainer}>
     <Pressable 
        android_ripple={{ color: 'pink' }} 
        style={styles.pressable} 
        onPress={() => navigation.navigate('Details', { goalObj: goal })}
      >
      <Text style={styles.textStyle}>{goal.text}</Text>
      <Button color="black" title="X" onPress={() => deleteHandler(goal.id)} />
  
      </Pressable>
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
      backgroundColor: '#f0f0f0',
    },
    pressable: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    }
  });

export default GoalItem;
