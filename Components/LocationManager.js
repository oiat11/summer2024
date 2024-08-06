import { View, Text, Button, Alert, Image, Dimensions } from "react-native";
import React, { useState } from "react";
import * as Location from "expo-location";
import { mapsApiKey } from "@env";

const LocationManager = () => {
  const [location, setLocation] = useState({ latitude: 0, longitude: 0 });
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
if (location)
{console.log(`https://maps.googleapis.com/maps/api/staticmap?center=${location.latitude},${location.longitude}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:L%7C${location.latitude},${location.longitude}&key=${mapsApiKey}`)
}
  return (
    <View>
      <Button title="Get Location" onPress={locateUserHandler} />
      <Text>
        Latitude: {location.latitude}, Longitude: {location.longitude}
      </Text>

      {location && <Image
        source={{
          uri: `https://maps.googleapis.com/maps/api/staticmap?center=${location.latitude},${location.longitude}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:L%7C${location.latitude},${location.longitude}&key=${mapsApiKey}`,
        }}
        style={{ width: 200, height: 200 }}
      />}
    </View>
  );
};

export default LocationManager;
