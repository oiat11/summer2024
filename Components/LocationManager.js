import { View, Text, Button, Alert, Image, Dimensions } from "react-native";
import React, { useState, useEffect } from "react";
import { useRoute, useNavigation } from '@react-navigation/native';
import * as Location from "expo-location";
import { mapsApiKey } from "@env";
import { writeWithId, getADoc } from '../Firebase/firestoreHelper'; 
import { auth } from '../Firebase/FirebaseSetup';

const LocationManager = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [location, setLocation] = useState({ latitude: 0, longitude: 0 });
  const [permissionResponse, requestPermission] = Location.useForegroundPermissions();

  useEffect(() => {
    if (route.params?.selectedLocation) {
      setLocation(route.params.selectedLocation);
    }
  }, [route.params?.selectedLocation]);

  useEffect(() => {
    async function getUserData() {
      try {
        const userData = await getADoc('users', auth.currentUser.uid);
        console.log("User data:", userData);
        if (userData) {
        setLocation({
          latitude: userData.latitude,
          longitude: userData.longitude,
        });
        }
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    } 
    getUserData();
  }, []);

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

  const handleSave = async () => {
    try {
      const userId = auth.currentUser.uid;
      await writeWithId(location, 'users', userId, 'locations');
      Alert.alert("Location saved successfully!");
      navigation.navigate('Home');
    } catch (err) {
      console.error("Error saving location:", err);
      Alert.alert("Failed to save location.");
    }
  }

  return (
    <View>
      <Button title="Get Location" onPress={locateUserHandler} />
      <Button title="Let me choose a location" onPress={chooseLocationHandler} />
      <Text>
        Latitude: {location.latitude}, Longitude: {location.longitude}
      </Text>
      {location.latitude !== 0 && location.longitude !== 0 && (
        <Image
          source={{
            uri: `https://maps.googleapis.com/maps/api/staticmap?center=${location.latitude},${location.longitude}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:L%7C${location.latitude},${location.longitude}&key=${mapsApiKey}`,
          }}
          style={{ width: Dimensions.get('window').width, height: 200 }}
        />
      )}
      <Button title="Save Location" onPress={handleSave} disabled={location.latitude === 0 && location.longitude === 0} />
    </View>
  );
};

export default LocationManager;
