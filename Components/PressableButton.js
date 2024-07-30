import { View, Pressable, StyleSheet } from 'react-native';
import React from 'react';

const PressableButton = ({ children, pressedFunction, componentStyle }) => {
    return (
      <Pressable
        onPress={pressedFunction}
        style={({ pressed }) => [
          styles.defaultStyle, componentStyle,
          pressed && styles.pressedStyle
        ]}
      >
        <View>
          {children}
        </View>
      </Pressable>
    );
  };

const styles = StyleSheet.create({
  pressedStyle: {
    opacity: 0.5,
    backgroundColor: 'red',
  },
});

export default PressableButton;
