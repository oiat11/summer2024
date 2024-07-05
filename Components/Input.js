import { View, Text, TextInput } from 'react-native'
import React, { useState, useEffect, useRef } from 'react';


const Input = ({ autoFocus }) => {
  const [text, setText] = useState('');
  const [showThankYou, setShowThankYou] = useState(false);
  const textInputRef = useRef(null);

  useEffect(() => {
    if (textInputRef.current) {
      textInputRef.current.focus();
    }
  }, [autoFocus]);

  const handleBlur = () => {
    setShowThankYou(true);
  };

  const handleFocus = () => {
    setShowThankYou(false);
  };

  return (
    <View>
       <TextInput
        style={{ height: 40}}
        placeholder="Type here to translate!"
        secureTextEntry={true}
        onChangeText={changedText => setText(changedText)}
        value={text}
        onBlur={handleBlur}
        onFocus={handleFocus}
        />
      <Text>User typed: {text}</Text>
      {showThankYou && <Text>Thank you</Text>}
    </View>
  )
}

export default Input