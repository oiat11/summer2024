import { View, Text, Button, Alert, Image, Dimensions } from "react-native";
import React, { useState, useEffect } from "react";
import { useRoute } from '@react-navigation/native';
import * as Location from "expo-location";
import { mapsApiKey } from "@env";
import { useNavigation } from '@react-navigation/native';
import { writeWithId } from '../Firebase/firestoreHelper'; 
import { auth } from '../Firebase/FirebaseSetup';

const LocationManager = () => {
  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    if (route.params) {
      setLocation(route.params.selectedLocation);
    }
  })

  const [location, setLocation] = useState('');
  const [permissionResponse, requestPermission] =
    Location.useForegroundPermissions();

  const verifyPermissions = async () => {
    if (permissionResponse?.granted) {
      return true;
    }
    const { granted } = await requestPermission();
    return granted;
  };

  const locateUserHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      Alert.alert("You need to grant location permissions to use this app.");
      return;
    }

    try {
      const result = await Location.getCurrentPositionAsync({});
      console.log("result:", result);
      setLocation({
        latitude: result.coords.latitude,
        longitude: result.coords.longitude,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const chooseLocationHandler = () => {
    navigation.navigate('Map');
  }

  const handleSave = () => {
    const userId = auth.currentUser.uid;
    writeWithId(location, 'users', userId, 'locations');
    Alert.alert("Location saved successfully!");
  }
  return (
    <View>
      <Button title="Get Location" onPress={locateUserHandler} />
      <Button title="Let me choose a location" onPress={chooseLocationHandler} />
      <Text>
        Latitude: {location.latitude}, Longitude: {location.longitude}
      </Text>
      {location && (
        <Image
          source={{
            uri: `https://maps.googleapis.com/maps/api/staticmap?center=${location.latitude},${location.longitude}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:L%7C${location.latitude},${location.longitude}&key=${mapsApiKey}`,
          }}
          style={{ width: Dimensions.get('window').width, height: 200 }}
        />
      )}
      <Button title="Save Location" onPress={handleSave} disabled={!location} />
    </View>
  );
};

export default LocationManager;
