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
      navigation.navigate('Articles');
    }
    setIsStarted(true);
  };
  
  const newshandlePress = () => {
    if (!isWatched) {
      navigation.navigate('Carbon Footprint Assessment');
    } else {
      navigation.navigate('Real Time');
    }
    setIsWatched(true);
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
          <Text style={styles.title}>Karbon</Text>
          <Text style={styles.subtitle}>
            Less Carbon Footprint—More Life on Earth.
          </Text>
  
          <View style={styles.carbonFootprintBox}>
            <Text style={styles.boxTitle}>Recent Carbon Footprint:</Text>
            <Text style={styles.boxValue}>456</Text>
          </View>
  
          <View style={styles.buttonContainer}>

            <TouchableOpacity
              style={styles.pointsContainer1}
              onPress={handlePress}
              >
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Icon name="arrow-left" size={24} color="#4caf50" style={styles.iconLeft} />
                <View>
                    {isStarted ? (
                      <>
                        <Text style={styles.pointsText}>{ ' Get' }</Text>
                        <Text style={styles.pointsText}>{ 'Updated!' }</Text>
                      </>
                    ) : (
                      <>
                        <Text style={styles.pointsText}>{ " Let's get" }</Text>
                        <Text style={styles.pointsText}>{ 'Started!' }</Text>
                      </>
                    )}
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
            style={styles.pointsContainer2}
            onPress={newshandlePress}
          >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View>
                {isWatched ? (
                  <>
                    <Text style={styles.pointsText}>{ 'Check real-time' }</Text>
                    <Text style={styles.pointsText}>{ 'updates!' }</Text>
                  </>
                ) : (
                  <>
                    <Text style={styles.pointsText}>{ 'Calculate your' }</Text>
                    <Text style={styles.pointsText}>{ 'Carbon Footprint!' }</Text>
                  </>
                )}
              </View>
              <Icon name="arrow-right" size={24} color="#4caf50" style={styles.iconRight} />
            </View>
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
    marginTop: -250,
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
    marginBottom: 20,
    textAlign: 'center',
  },
  pointsContainer1: {
    borderColor: '#4caf50',
    borderWidth: 2,
    padding: 10,
    margin: 10,
    marginRight: 10,
    borderRadius: 20,
    marginBottom: 20,
    paddingLeft: 55,
  },

  pointsContainer2: {
    borderColor: '#4caf50',
    borderWidth: 2,
    padding: 10,
    margin: 10,
    marginRight: 5,
    borderRadius: 20,
    marginBottom: 20,
    paddingRight: 45,
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
  pointsTitle: {
    color: '#4caf50',
    fontSize: 10,
    textAlign: 'center',
  },
  pointsValue: {
    color: '#4caf50',
    fontSize: 20,
    textAlign: 'center',
  },
  pointsBox: {
    borderColor: '#4caf50',
    borderWidth: 2,
    padding: 10,
    margin: 10,
    marginLeft: 20,
    borderRadius: 20,
    marginBottom: 20,
    width: '70%',
    height: 77,
  },
  carbonFootprintBox: {
    borderColor: '#4caf50',
    borderWidth: 2,
    padding: 10,
    margin: 10,
    marginLeft: 20,
    borderRadius: 20,
    width: '50%',
  },
  boxTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
    textAlign: 'center',
  },
  boxValue: {
    fontSize: 34,
    color: '#4caf50',
    textAlign: 'center',
  },
  iconLeft: {
    position: 'absolute',
    right: 80,
    top: 10, 
  },
  
  iconRight: {
    position: 'absolute',
    left: 130, 
    top: 10, 
  },
});

export default HomeScreen;
