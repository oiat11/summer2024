import { View, Text, StyleSheet, Button, Pressable } from 'react-native';
import React from 'react';

const GoalItem = ({ goal, deleteHandler, navigation }) => {
  return (
    <View style={styles.textContainer}>
   <Pressable
        android_ripple={{ color: 'pink' }}
        style={({ pressed }) => {
          return [styles.horizontalContainer, pressed&&styles.pressedStyle];
        }}
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
      backgroundColor: "#aaa",
      marginVertical: 10,
      flexDirection: 'row',
      borderRadius: 5,
      alignSelf: 'center',
      justifyContent: 'center', 
      alignItems: 'center',
      backgroundColor: '#f0f0f0',
    },
    horizontalContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 15,
    },
    pressedStyle:{
      opacity: 0.5,
      backgroundColor: 'red',
    }
  });

export default GoalItem;
