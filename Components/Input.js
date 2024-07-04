import { View, Text, TextInput } from 'react-native'
import React, { useState } from 'react';


const Input = () => {
  const [text, setText] = useState('');

  return (
    <View>
       <TextInput
        style={{ height: 40}}
        placeholder="Type here to translate!"
        onChangeText={changedText => setText(changedText)}
        value={text}
        />
      <Text>User typed: {text}</Text>
    </View>
  )
}

export default Input