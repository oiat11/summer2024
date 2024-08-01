import React from 'react';
import { View, Button, Alert, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const InputManager = () => {
  const [status, requestPermission] = ImagePicker.useCameraPermissions();

  const verifyPermissions = async () => {
    if (status?.granted) {
      return true;
    }
    const { granted } = await requestPermission();
    return granted;
  };

  const takeImageHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      Alert.alert("You need to grant camera permissions to use this app.");
      return;
    }

    try {
      const image = await ImagePicker.launchCameraAsync({
        allowsEditing: true,

      });
    } catch (e) {
      console.error('Error taking image:', e);
    }
  };

  return (
    <View>
      <Button title="Take Image" onPress={takeImageHandler} />
    </View>
  );
};

export default InputManager;
