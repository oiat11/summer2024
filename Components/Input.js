import { View, Text, TextInput, Button, StyleSheet, Modal } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';

const Input = ({ inputHandler, isModalVisible }) => {
  const [text, setText] = useState('');
  const [showThankYou, setShowThankYou] = useState(false);
  const textInputRef = useRef(null);

  useEffect(() => {
    if (textInputRef.current) {
      textInputRef.current.focus();
    }
  }, []);

  const handleBlur = () => {
    setShowThankYou(true);
  };

  const handleFocus = () => {
    setShowThankYou(false);
  };

  const handleConfirm = () => {
    console.log(`You typed: ${text}`);
    inputHandler(text);
  };

  return (
    <Modal animationType="slide" visible={isModalVisible}>
      <View style={styles.container}>
        <TextInput
          style={{ height: 40 }}
          placeholder="Type here"
          onChangeText={changedText => setText(changedText)}
          value={text}
          onBlur={handleBlur}
          onFocus={handleFocus}
          ref={textInputRef}
        />
        {showThankYou && <Text>Thank you</Text>}
        <View style={styles.buttonStyle}>
        <Button title="Confirm" onPress={handleConfirm} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonStyle: {
    width: "30%",
    margin: 5,
  },
});

export default Input;
