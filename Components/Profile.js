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
      {user ? (
        <Text>Profile: {user.email} {user.uid}</Text>
      ) : (
        <Text>No user is logged in</Text>
      )}
    </View>
  );
};

export default Profile;
