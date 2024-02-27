import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Dimensions, ImageBackground } from 'react-native';
import * as Location from 'expo-location';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

export default function VehicleTracker() {
  const [location, setLocation] = useState(null);
  const screenHeight = Dimensions.get('window').height;
  const screenWidth = Dimensions.get('window').width;

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

          // Update the vehicle location in Firebase
          // const vehicleRef = firebase.database().ref('vehicles/vehicleId');
          // vehicleRef.update({ latitude, longitude });
        }
      );
    })();
  }, []);

  return (
    <ImageBackground source={require('../assets/buttonContainer.jpg')} style={{ flex: 1 }}>
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
  );}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
    justifyContent: 'flex-start', // Align items to the start
    alignItems: 'center',
    marginTop: windowHeight * 0.12, // Add a top margin
    padding: 10,
  },
  mapWrapper: {
    width: windowWidth - 20,
    height: windowHeight - 300,
    borderRadius: 20,
    overflow: 'hidden',
  },
  map: {
    width: '100%', // Use 100% of the parent's width (mapWrapper)
    height: '100%', // Use 100% of the parent's height (mapWrapper)
  },
});