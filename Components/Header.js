import { View, Text } from 'react-native'
import React from 'react'

const Header = ({ appName, children }) => {
  return (
    <View>
      <Text>Welcome to {appName}</Text>
      {children}
    </View>
  )
}

export default Header