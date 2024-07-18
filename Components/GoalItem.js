import { View, Text, StyleSheet, Button, Pressable } from 'react-native';
import React from 'react';
import PressableButton from './PressableButton';
import { AntDesign } from '@expo/vector-icons';

const GoalItem = ({ goal, deleteHandler, navigation }) => {
  return (
    <View style={styles.textContainer}>
      <Pressable
        android_ripple={{ color: 'pink' }}
        style={({ pressed }) => [
          styles.horizontalContainer,
          pressed && styles.pressedStyle
        ]}
        onPress={() => navigation.navigate('Details', { goalObj: goal })}
      >
        <Text style={styles.textStyle}>{goal.text}</Text>
        {/* <Button color="black" title="X" onPress={() => deleteHandler(goal.id)} /> */}
        <PressableButton componentStyle={styles.buttonStyle} pressedFunction={() => deleteHandler(goal.id)}>
        <AntDesign name="delete" size={24} color="black" />
        </PressableButton>
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
      marginVertical: 10,
      flexDirection: 'row',
      borderRadius: 5,
      alignSelf: 'center',
      justifyContent: 'center', 
      alignItems: 'center',
      backgroundColor: '#bfbfbf',
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
    },
    buttonStyle: {
      marginLeft: 10,
      backgroundColor: 'grey',
      padding: 5,
    },
  });


export default GoalItem;
