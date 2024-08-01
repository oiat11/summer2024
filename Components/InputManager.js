import React, { useState } from 'react';
import { View, Button, Alert, Text, Image, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const InputManager = () => {
  const [status, requestPermission] = ImagePicker.useCameraPermissions();
  const [imageUri, setImageUri] = useState(null);

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
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
      });

        setImageUri(result.assets[0].uri);  
    } catch (e) {
      console.error('Error taking image:', e);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Take Image" onPress={takeImageHandler} />
      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 20,
  },
});

export default InputManager;
