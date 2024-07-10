import { View, Text, TextInput, Button, StyleSheet, Modal, Image } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';

// Import the local image
import LocalImage from '../assets/2617812.png';

const Input = ({ inputHandler, isModalVisible, onCancel }) => {
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
    setText('');  
  };

  const handleCancel = () => {
    setText(''); 
    onCancel();
  };

  return (
    <Modal animationType="slide" visible={isModalVisible} transparent={true}>
      <View style={styles.modalBackground}>
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
          <View style={styles.imageContainer}>
            <Image 
              style={styles.imageStyle}
              source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2617/2617812.png' }}
              alt="Network Image"
            />
            <Image 
              style={styles.imageStyle}
              source={LocalImage}
              alt="Local Image"
            />
          </View>
          <View style={styles.buttonContainer}>
            <View style={styles.buttonStyle}>
              <Button title="Confirm" onPress={handleConfirm} disabled={text === ''} />
            </View>
            <View style={styles.buttonStyle}>
              <Button title="Cancel" onPress={handleCancel} />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  container: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonStyle: {
    marginHorizontal: 10,
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20,
  },
  imageStyle: {
    width: 100,
    height: 100,
    marginHorizontal: 10,
  },
});

export default Input;
