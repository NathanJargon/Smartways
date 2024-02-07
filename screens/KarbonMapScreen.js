import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RealTimeScreen = () => {
  const apiKey = 'AIzaSyCxLGmhSPj8MZ-K-JVMae_90_rz7s-3S4M'; // Replace with your actual Google Maps API key

  // Example location (initially set to Philippines)
  const philippinesRegion = {
    latitude: 12.8797,
    longitude: 121.7740,
    latitudeDelta: 6.0,
    longitudeDelta: 6.0,
  };

  const [directions, setDirections] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getCachedDirections = async () => {
      try {
        setLoading(true);

        // Example: Use AsyncStorage to get cached directions
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
  }, []); // Empty dependency array ensures the effect runs only on mount

  const handleGetDirections = async () => {
    try {
      setLoading(true);

      // Check if directions are already in the cache
      if (directions.length === 0) {
        // Example: Fetch directions from point A to point B (replace with your actual data)
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/directions/json?origin=${philippinesRegion.latitude},${philippinesRegion.longitude}&destination=Manila,Philippines&key=${apiKey}`
        );

        const data = await response.json();

        if (data.routes && data.routes.length > 0 && data.routes[0].overview_polyline) {
          const newDirections = decodePolyline(data.routes[0].overview_polyline.points);
          setDirections(newDirections);

          // Example: Use AsyncStorage to cache directions
          await AsyncStorage.setItem('cachedDirections', JSON.stringify(newDirections));
        }
      }
    } catch (error) {
      console.error('Error fetching directions:', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Real-Time Screen</Text>
      <MapView
        style={styles.map}
        initialRegion={philippinesRegion}
        provider="google"
        customMapStyle={[]}
        showsUserLocation={true}
      >
        {/* Example marker (you can replace this with dynamic data) */}
        <Marker coordinate={philippinesRegion} title="Marker Title" description="Marker Description" />

        {/* Display directions polyline */}
        {directions.length > 0 && <Polyline coordinates={directions} strokeWidth={4} />}

        {/* Add other markers and overlays as needed */}
      </MapView>
      <Button title="Get Directions" onPress={handleGetDirections} disabled={loading} />
    </View>
  );
};

// Helper function to decode Google Maps Polyline
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