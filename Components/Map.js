import { View, Text, Dimensions } from 'react-native';
import React from 'react';
import MapView, { Marker } from 'react-native-maps';

const Map = () => {
  const initialRegion = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height }}
        initialRegion={initialRegion}
      >
        <Marker
          coordinate={{ latitude: 37.78825, longitude: -122.4324 }}
          title={"Marker Title"}
          description={"Marker Description"}
        />
      </MapView>
    </View>
  );
};

export default Map;
