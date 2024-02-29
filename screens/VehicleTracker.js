import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Dimensions, ImageBackground } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

export default function VehicleTracker({ setIsLoading: setIsLoadingProp }) {
  const [location, setLocation] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Add this line

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }

      Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 5000,
          distanceInterval: 0,
        },
        (location) => {
          const { latitude, longitude } = location.coords;
          setLocation({ latitude, longitude });
          setIsLoading(false);
        }
      );
    })();
  }, []);

  const onMapLoad = () => {
    setMapLoaded(true);
  };

  return (
    <ImageBackground 
      source={isLoading ? require('../assets/loading.png') : require('../assets/bg.png')} 
      style={styles.backgroundImage} 
      resizeMode="cover"
    >
      {mapLoaded && location && (
        <Text style={styles.trackerText}>Location Tracker</Text>
      )}
      <View style={{ flex: 1 }}>
        {location && (
          <View style={styles.mapContainer}>
            <View style={styles.mapWrapper}>
              <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.map}
                initialRegion={{
                  latitude: location.latitude,
                  longitude: location.longitude,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
                onMapReady={onMapLoad}
              >
                <Marker
                  coordinate={{ latitude: location.latitude, longitude: location.longitude }}
                  title="Vehicle's location"
                />
              </MapView>
            </View>
          </View>
        )}
      </View>
    </ImageBackground>
  );
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  trackerText: {
    fontSize: 30,
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    marginTop: windowHeight * 0.13,
  },
  mapContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: windowHeight * 0.05,
    padding: 10,
  },
  mapWrapper: {
    width: windowWidth - 20,
    height: windowHeight - 200,
    borderRadius: 20,
    overflow: 'hidden',
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
