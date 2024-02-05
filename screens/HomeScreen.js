import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Dimensions, Animated } from 'react-native';
import { ImageBackground } from 'react-native';
import { FontAwesome as Icon } from '@expo/vector-icons';

function HomeScreen({ navigation }) {
  const [isStarted, setIsStarted] = useState(false);
  const [isWatched, setIsWatched] = useState(false);

  const handlePress = () => {
    if (!isStarted) {
      navigation.navigate('Education');
    } else {
      navigation.navigate('News');
    }
    setIsStarted(true);
  };
  
  const newshandlePress = () => {
    if (!isStarted) {
      navigation.navigate('Carbon Footprint Assessment');
    }
    // setIsWatched(true);
  };


  return (
    <ImageBackground source={require('autocarb/assets/homebg.png')} style={styles.container}>
      <ScrollView
        contentContainerStyle={[ styles.scrollContainer ]}
        scrollEventThrottle={16}
      >
        <View style={styles.contentContainer}>
          <Image
            style={styles.logo}
            source={require('../assets/logo.png')}
          />
          <Text style={styles.title}>Welcome to</Text>
          <Text style={styles.title}>AutoCarb</Text>
          <Text style={styles.subtitle}>
            Less Carbon Footprint—More Life on Earth.
          </Text>
          <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.pointsContainer}
            onPress={handlePress}
          >
            <Text style={styles.pointsText}>{isStarted ? 'Get updated!' : "Let's get started!"}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.pointsContainer}
            onPress={newshandlePress}
          >
            <Text style={styles.pointsText}>{!isWatched ? 'Take Assessment!' : "Check News!"}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  </ImageBackground>
  );
}


const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    marginTop: -150,
    marginLeft: -29,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  logo: {
    width: 450,
    height: 450,
    marginRight: -30,
    marginBottom: -130,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#000',
    marginTop: 20,
    marginBottom: 60,
    textAlign: 'center',
  },
  pointsContainer: {
    borderColor: '#4caf50',
    borderWidth: 2,
    padding: 10,
    margin: 10,
    borderRadius: 20,
    marginBottom: 20,
  },
  pointsText: {
    color: '#4caf50',
    fontSize: 16,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#4caf50',
    padding: 10,
    margin: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
  iconarrow: {
    margin: 30,
  },
  pointsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
    marginTop: 100,
    textAlign: 'center',
  },
  pointsValue: {
    fontSize: 20,
    color: '#000',
    textAlign: 'center',
  },
  leaderboardContainer: {
    marginTop: 20,
  },
  leaderboardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
    textAlign: 'center',
  },
  leaderboardEntry: {
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
  },
});

export default HomeScreen;
