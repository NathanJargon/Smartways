import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';

const RealTimeScreen = () => {
  const apiKey = 'AIzaSyCxLGmhSPj8MZ-K-JVMae_90_rz7s-3S4M'; // Replace with your actual Google Maps API key

  const philippinesRegion = {
    latitude: 12.8797,
    longitude: 121.7740,
    latitudeDelta: 6.0,
    longitudeDelta: 6.0,
  };

  const [directions, setDirections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setUserLocation(location.coords);
    };

    getLocation();
  }, []);

  useEffect(() => {
    const getCachedDirections = async () => {
      try {
        setLoading(true);

        const cachedDirections = await AsyncStorage.getItem('cachedDirections');

        if (cachedDirections) {
          setDirections(JSON.parse(cachedDirections));
        }
      } catch (error) {
        console.error('Error loading cached directions:', error.message);
      } finally {
        setLoading(false);
      }
    };

    getCachedDirections();
  }, []);

  const handleRegionChange = (newRegion) => {
    if (!selectedPlace) {
      setDirections([]);
    }
    setSelectedPlace(null);
  };

  const handleMarkerPress = (place) => {
    setSelectedPlace(place);
    setDirections([]);
  };

  const handleGetDirections = async () => {
    try {
      setLoading(true);
  
      if (!userLocation) {
        Alert.alert('Location not available', 'Unable to fetch directions without current location.');
        return;
      }
  
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?` +
        `location=${userLocation.latitude},${userLocation.longitude}` +
        `&radius=5000` + 
        `&types=restaurant` + 
        `&key=${apiKey}`
      );
  
      const data = await response.json();
  
      if (data.results && data.results.length > 0) {
        const firstPlace = data.results[0];
        setSelectedPlace({
          name: firstPlace.name,
          latitude: firstPlace.geometry.location.lat,
          longitude: firstPlace.geometry.location.lng,
        });
        const directionsResponse = await fetch(
          `https://maps.googleapis.com/maps/api/directions/json?` +
          `origin=${userLocation.latitude},${userLocation.longitude}` +
          `&destination=${firstPlace.geometry.location.lat},${firstPlace.geometry.location.lng}` +
          `&key=${apiKey}`
        );
  
        const directionsData = await directionsResponse.json();
  
        if (directionsData.routes && directionsData.routes.length > 0 && directionsData.routes[0].overview_polyline) {
          const newDirections = decodePolyline(directionsData.routes[0].overview_polyline.points);
          setDirections(newDirections);
  
          await AsyncStorage.setItem('cachedDirections', JSON.stringify(newDirections));
        }
      }
    } catch (error) {
      console.error('Error fetching places:', error.message);
    } finally {
      setLoading(false);
    }
  };

  const places = [
    { name: 'Place 1', latitude: 13.41, longitude: 122.56 },
    // Add more places as needed
  ];


  return (
    <View style={styles.container}>
      <Text style={styles.header}>Real-Time Screen</Text>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={{ width: '100%', height: '75%' }}
        region={userLocation || philippinesRegion}
        onRegionChangeComplete={handleRegionChange}
        showsUserLocation={true}
      >
        {places.map((place, index) => (
          <Marker
            key={index}
            coordinate={{ latitude: place.latitude, longitude: place.longitude }}
            title={place.name}
            onPress={() => handleMarkerPress(place)}
          />
        ))}

        {selectedPlace && (
          <Marker
            coordinate={{ latitude: selectedPlace.latitude, longitude: selectedPlace.longitude }}
            title={selectedPlace.name}
            pinColor="red"
          />
        )}

          {directions.length > 0 && userLocation && selectedPlace && (
            <MapViewDirections
              origin={userLocation}
              destination={{ latitude: selectedPlace.latitude, longitude: selectedPlace.longitude }}
              apikey={apiKey}
              strokeWidth={4}
              strokeColor="blue"
            />
          )}
      </MapView>
      <Button title="Get Directions" onPress={handleGetDirections} disabled={loading} />
    </View>
  );
};

const decodePolyline = (encoded) => {
  const poly = [];
  let index = 0;
  const len = encoded.length;
  let lat = 0;
  let lng = 0;

  while (index < len) {
    let b;
    let shift = 0;
    let result = 0;
    do {
      b = encoded.charCodeAt(index++) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);

    const dlat = (result & 1) !== 0 ? ~(result >> 1) : result >> 1;
    lat += dlat;

    shift = 0;
    result = 0;
    do {
      b = encoded.charCodeAt(index++) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);

    const dlng = (result & 1) !== 0 ? ~(result >> 1) : result >> 1;
    lng += dlng;

    const latlng = {
      latitude: lat / 1e5,
      longitude: lng / 1e5,
    };
    poly.push(latlng);
  }
  return poly;
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
  },
  map: {
    flex: 1,
  },
});

export default RealTimeScreen;
