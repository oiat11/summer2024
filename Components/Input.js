import { View, Text, TextInput, Button } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';

const Input = ({ inputHandler }) => {
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
    <View>
      <TextInput
        style={{ height: 40 }}
        placeholder="Type here to translate!"
        onChangeText={changedText => setText(changedText)}
        value={text}
        onBlur={handleBlur}
        onFocus={handleFocus}
        ref={textInputRef}
      />
      {showThankYou && <Text>Thank you</Text>}
      <Button title="Confirm" onPress={handleConfirm} />
    </View>
  );
};

export default Input;
