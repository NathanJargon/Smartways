import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, Polyline } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import { FontAwesome as Icon } from '@expo/vector-icons';

const RealTimeScreen = () => {
  const apiKey = 'AIzaSyCxLGmhSPj8MZ-K-JVMae_90_rz7s-3S4M'; // Replace with your actual Google Maps API key

  const philippinesRegion = {
    latitude: 13.41,
    longitude: 122.56,
    latitudeDelta: 20,
    longitudeDelta: 20,
  };

  const [directions, setDirections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [emissionStatus, setEmissionStatus] = useState('Low'); 
  const [trafficLevel, setTrafficLevel] = useState('Light'); 
  const [timeToReach, setTimeToReach] = useState('10 min'); 
  const [selectedPlaces, setSelectedPlaces] = useState([]);
  const [dynamicPlaces, setDynamicPlaces] = useState([]);
  const [region, setRegion] = useState(philippinesRegion);
  const markerRefs = useRef([]);

  const averageCoordinate = selectedPlaces.reduce(
    (average, place, index, array) => {
      average.latitude += place.latitude / array.length;
      average.longitude += place.longitude / array.length;
      return average;
    },
    { latitude: 0, longitude: 0 }
  );
  
  useEffect(() => {
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setUserLocation(location.coords);
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    };

    getLocation();
    setEmissionStatus('Low');
    setTrafficLevel('Light');
    setTimeToReach('10 min');
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
    setEmissionStatus('Low');
    setTrafficLevel('Light');
    setTimeToReach('10 min');
  }, []);

  const handleRegionChange = (newRegion) => {
    setSelectedPlace(null);
  };

  const handleMarkerPress = (place) => {
    setSelectedPlaces((prevPlaces) => [...prevPlaces, place]);
  };
  

  const handleGetDirections = async () => {
    try {
      setLoading(true);
  
      if (!userLocation) {
        alert('Please turn on your location to get directions.');
        return;
      }
  
      if (selectedPlaces.length === 0) {
        alert('Please select a place first by pressing on the map.');
        return;
      }
  
      const place = selectedPlaces[selectedPlaces.length - 1];
  
      const directionsResponse = await fetch(
        `https://maps.googleapis.com/maps/api/directions/json?` +
        `origin=${userLocation.latitude},${userLocation.longitude}` +
        `&destination=${place.latitude},${place.longitude}` +
        '&mode=driving' +
        `&key=${apiKey}`
      );
    
      const directionsData = await directionsResponse.json();
    
      if (directionsData.routes && directionsData.routes.length > 0) {
        const newDirections = decodePolyline(directionsData.routes[0].overview_polyline.points);
        setDirections(newDirections);
  
        // Set time to reach
        const timeToReach = directionsData.routes[0].legs[0].duration.text;
        setTimeToReach(timeToReach);
  
        // Calculate emission status
        const distance = directionsData.routes[0].legs[0].distance.value; // distance in meters
        const emissionStatus = calculateEmissionStatus(distance); // implement this function
        setEmissionStatus(emissionStatus);
  
        // Calculate traffic level
        const duration = directionsData.routes[0].legs[0].duration ? directionsData.routes[0].legs[0].duration.value : 0; // duration in seconds
        const durationInTraffic = directionsData.routes[0].legs[0].duration_in_traffic ? directionsData.routes[0].legs[0].duration_in_traffic.value : 0; // duration in traffic in seconds
        const trafficLevel = calculateTrafficLevel(duration, durationInTraffic);
        setTrafficLevel(trafficLevel);
  
        await AsyncStorage.setItem('cachedDirections', JSON.stringify(newDirections));
      }
    } catch (error) {
      console.error('Error fetching directions:', error.message);
    } finally {
      setLoading(false);
    }
  };

  // Calculate emission status based on distance
  const calculateEmissionStatus = (distance) => {
    if (distance < 1000) {
      return 'Low';
    } else if (distance < 5000) {
      return 'Medium';
    } else {
      return 'High';
    }
  };

  // Calculate traffic level based on duration and duration in traffic
  const calculateTrafficLevel = (duration, durationInTraffic) => {
    const ratio = durationInTraffic / duration;
    if (ratio < 1.1) {
      return 'Light';
    } else if (ratio < 1.5) {
      return 'Medium';
    } else {
      return 'Heavy';
    }
  };

  useEffect(() => {
    if (selectedPlaces.length > 0) {
      setTimeout(() => {
        markerRefs.current[selectedPlaces.length - 1].showCallout();
      }, 100);
    }
  }, [selectedPlaces]);

  const handleMapPress = (coordinate) => {
    setSelectedPlaces((prevPlaces) => {
      let newPlaces = [...prevPlaces, coordinate];
      if (newPlaces.length > 5) {
        newPlaces = newPlaces.slice(1);
      }
      return newPlaces;
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
      <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            region={region}
            onRegionChangeComplete={handleRegionChange}
            showsUserLocation={true}
            onPress={(e) => handleMapPress(e.nativeEvent.coordinate)}
          >
        {selectedPlaces.map((place, index) => (
          <Marker
            key={index}
            coordinate={place}
            title={`Place you want to go`}
            ref={(ref) => { markerRefs.current[index] = ref; }} 
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

          {directions && (
            <Polyline
              coordinates={directions}
              strokeColor="#0000FF" // Blue color
              strokeColors={[
                '#7F0000',
                '#00000000', // no color, creates a "long" gradient between the previous and next coordinate
                '#B24112',
                '#E5845C',
                '#238C23',
                '#7F0000'
              ]}
              strokeWidth={6}
            />
          )}
      </MapView>

      <View style={styles.infoContainer}>
      <Text style={[styles.infoTitle, { textAlign: 'center', marginBottom: 5, fontSize: 10, textDecorationLine: 'underline' }]}>Approximate Data</Text>
        <View style={styles.infoItem}>
          <Text style={styles.infoTitle}>Emission Status:</Text>
          <Text style={styles.infoValue}>{emissionStatus}</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoTitle}>Traffic Level:</Text>
          <Text style={styles.infoValue}>{trafficLevel}</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoTitle}>Time to Reach:</Text>
          <Text style={styles.infoValue}>{timeToReach}</Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Get Directions" onPress={handleGetDirections} disabled={loading} />
      </View>
    </View>

    <View style={styles.backBox} />

    <View style={styles.cardContainer}>
      <View style={styles.profileContainer}>
        <Icon name="user" size={50} color="#000" />
      </View>
      <View style={styles.nameContainer}>
        <Text style={styles.nameText}>User Name</Text>
      </View>
    </View>
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
  buttonContainer: {
    position: 'absolute',
    left: 5,
    bottom: 5,
    width: '50%',
    borderRadius: 8,
    overflow: 'hidden',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
  },
  infoContainer: {
    position: 'absolute',
    top: 60,
    right: 10,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    elevation: 3,
  },
  infoItem: {
    flexDirection: 'column',
    marginBottom: 10, 
    textAlign: 'center',
    fontWeight: 'bold',
  },
  infoTitle: {
    fontWeight: 'bold',
    fontSize: 10,
  },
  infoValue: {
    textAlign: 'center',
    fontSize: 10,
  },
  mapContainer: {
    marginTop: 50,
    marginLeft: 20, 
    width: '90%', 
    height: '60%',
    borderWidth: 15,
    borderColor: 'green',
    borderRadius: 30,
    overflow: 'hidden'
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  cardContainer: {
    position: 'absolute',
    bottom: 85, 
    flexDirection: 'row',
    width: '90%',
    height: 70,
    alignSelf: 'center',
    marginTop: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    justifyContent: 'space-between',
  },
  profileContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameContainer: {
    flex: 3,
    justifyContent: 'center',
  },
  nameText: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 10,
    marginLeft: 50,
  },
  backBox: {
    position: 'absolute',
    bottom: 140,
    width: '70%',
    height: 80,
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    opacity: 0.5,
  },
});

export default RealTimeScreen;
