import { View, Text, Button } from 'react-native'
import React from 'react'

const GoalDetails = ( {navigation, route}) => {
    console.log('Params:', route.params);
  return (
    <View>
      <Text>You are seeing the details of the goal with text:{route.params.goalObj.text} and id:{route.params.goalObj.id }</Text>
      <Button title="More Details" onPress={() => navigation.push('Details', { goalObj: route.params.goalObj })} />
    </View>
  )
}

export default GoalDetails;