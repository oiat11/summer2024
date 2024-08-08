import { View, Dimensions, Button, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import MapView, { Marker } from 'react-native-maps';

const Map = ({ navigation }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  
  const initialRegion = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const handleSave = () => {
    navigation.navigate('Profile', { selectedLocation: selectedLocation });
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapView}
        initialRegion={initialRegion}
        onPress={(event) => {
          setSelectedLocation({
            latitude: event.nativeEvent.coordinate.latitude,
            longitude: event.nativeEvent.coordinate.longitude,
          });
        }}
      >
        {selectedLocation && (
          <Marker coordinate={selectedLocation} />
        )}
      </MapView>
      <View style={styles.buttonContainer}>
        <Button title="Confirm Selected Location" onPress={handleSave} disabled={!selectedLocation} />
      </View>
    </View>
  );
};

export default Map;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapView: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 50,
    left: 20,
    right: 20,
  },
});
