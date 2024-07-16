import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

const Header = ({ appName, children }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.textStyle}>Welcome to {appName}</Text>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    fontSize: 25,
    color: 'darkmagenta',
    borderColor: 'darkmagenta',
    borderWidth: 2,
    padding: 5,
    borderRadius: 5,
  },
  textStyle: {
    fontSize: 25,
    color: 'darkmagenta',
  },
});

export default Header