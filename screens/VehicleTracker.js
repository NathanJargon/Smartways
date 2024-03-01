import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Dimensions, ImageBackground, Image, TouchableOpacity } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

const { width, height } = Dimensions.get('window');
export default function VehicleTracker({ carType, selectedCar, setIsLoading: setIsLoadingProp, goBackToHome }) {
  const [location, setLocation] = useState(null);
  const [markerLocation, setMarkerLocation] = useState(null); // New state for marker location
  const [mapLoaded, setMapLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const placeMarker = (newLocation) => {
    setMarkerLocation(newLocation);
  };

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
          setMarkerLocation({ latitude, longitude }); // Set marker location to current location
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
                onPress={(e) => placeMarker(e.nativeEvent.coordinate)}
              >
                {markerLocation && (
                  <Marker
                    coordinate={{ latitude: markerLocation.latitude, longitude: markerLocation.longitude }}
                    title="Vehicle's location"
                  />
                  )}
                  </MapView>
                </View>
              </View>
            )}
            {mapLoaded && selectedCar && (
              <ImageBackground 
                source={require('../assets/bg.png')} 
                style={styles.carInfoContainer}
                resizeMode="cover"
              >
                <Text style={styles.carInfoText}>Type: {selectedCar.type}</Text>
                <Text style={styles.carInfoText}>Plate: {selectedCar.plate}</Text>
                <Text style={styles.carInfoText}>Capacity: {selectedCar.capacity}</Text>
                <TouchableOpacity onPress={goBackToHome} style={styles.iconButton}>
                  <Image
                    style={styles.iconImage}
                    source={require('../assets/icons/change.png')} // replace with your icon image path
                  />
                </TouchableOpacity>
              </ImageBackground>
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
    marginTop: windowHeight * 0.13,
    fontFamily: 'NeueMachina-Ultrabold',
  },
  mapContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: windowHeight * 0.05,
    padding: 10,
  },
  mapWrapper: {
    width: windowWidth - 20,
    height: windowHeight - 280,
    borderRadius: 20,
    overflow: 'hidden',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  carInfoContainer: {
    padding: 20,
    backgroundColor: 'rgba(221, 221, 221, 1)',
    borderRadius: 10,
    margin: 20,
  },
  carInfoText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'NeueMachina-Regular',
  },
  iconButton: {
    position: 'absolute',
    right: windowWidth * 0.09, // adjust as needed
    top: -windowHeight * 0.08, // adjust as needed
    transform: [{ translateY: 50 }], // adjust as needed
  },
  iconImage: {
    width: windowWidth * 0.15, // replace with your desired width
    height: windowHeight * 0.15, // replace with your desired height
    resizeMode: 'contain',
  },
});
