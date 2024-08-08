import { View, Text } from 'react-native';
import React from 'react';
import { auth } from '../Firebase/FirebaseSetup';
import LocationManager from './LocationManager'; 

const Profile = () => {
  const user = auth.currentUser;
  return (
    <View>
      {user ? (
        <Text>Profile: {user.email} {user.uid}</Text>
      ) : (
        <Text>No user is logged in</Text>
      )}
      <LocationManager />
    </View>
  );
};

export default Profile;
