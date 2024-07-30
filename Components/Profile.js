import { View, Text } from 'react-native';
import React, { useState, useEffect } from 'react';
import { auth } from '../Firebase/FirebaseSetup';

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  return (
    <View>
    <Text>Profile UID: {user.uid}</Text>
    </View>
  );
};

export default Profile;
