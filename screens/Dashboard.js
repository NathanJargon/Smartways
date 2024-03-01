import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, ImageBackground, Linking } from 'react-native';
import VehicleTracker from './VehicleTracker';
import Home from './Home';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function Dashboard({ navigation }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);

  const [showVehicleTracker, setShowVehicleTracker] = useState(false);
  const [selectedCarType, setSelectedCarType] = useState(null);

  const goBackToHome = () => {
    setShowVehicleTracker(false);
    setIsLoading(false);
  };

  const handleCarTypePress = (car) => {
    if (car) {
      setSelectedCarType(car.type);
      setSelectedCar(car);
    } else {
      setSelectedCarType('No car selected');
      setSelectedCar({ name: 'No car', type: 'No type' });
    }
    setShowVehicleTracker(true);
    setIsLoading(true);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const loadHome = () => {
    // Reset isLoading to false when navigating to Home
    setIsLoading(false);
    setShowVehicleTracker(false);
    setSidebarOpen(false);
  };
  
  return (
    <ImageBackground 
      source={isLoading ? require('../assets/loading.png') : require('../assets/dashboard.png')} 
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <TouchableOpacity onPress={toggleSidebar} style={sidebarOpen ? styles.buttonOpen : styles.buttonClosed}>
          <Image
            source={
              sidebarOpen
                ? require('../assets/icons/clicked.png')
                : require('../assets/icons/not-clicked.png')
            }
            style={{ width: windowWidth * 0.1, height: windowHeight * 0.05 }}
          />
        </TouchableOpacity>


    {sidebarOpen && (
      <ImageBackground 
        source={require('../assets/bg.png')} 
        style={styles.sidebar}
        resizeMode="cover"
      >

        <View style={styles.buttonsContainer}>
          <ImageBackground 
            source={!showVehicleTracker ? require('../assets/buttonContainer-semi.png') : require('../assets/buttonContainer.jpg')} 
            style={styles.customButton}
            resizeMode="cover"
          >
            <TouchableOpacity
              onPress={loadHome}
            >
              <Text style={styles.buttonText}>Home</Text>
            </TouchableOpacity>
          </ImageBackground>

          <ImageBackground 
            source={showVehicleTracker ? require('../assets/buttonContainer-semi.png') : require('../assets/buttonContainer.jpg')} 
            style={styles.customButton}
            resizeMode="cover"
          >
            <TouchableOpacity
              onPress={() => handleCarTypePress()}
            >
              <Text style={styles.buttonText}>Tracking</Text>
            </TouchableOpacity>
          </ImageBackground>
        </View>

        <View style={styles.credits}>
          <Text style={styles.creditsText}>Made by</Text>
          <Text style={styles.creditsText}>Nathan Jargon</Text>
          <TouchableOpacity onPress={() => Linking.openURL('https://github.com/NathanJargon')}>
            <Text style={styles.creditsLink}>Github</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL('https://www.linkedin.com/in/nashbondoc/')}>
            <Text style={styles.creditsLink}>LinkedIn</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Linking.openURL('https://nathanjargon.itch.io')}>
            <Text style={styles.creditsLink}>Itch.io</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    )}

        {showVehicleTracker ? (
          <VehicleTracker carType={selectedCarType} selectedCar={selectedCar} setIsLoading={setIsLoading} goBackToHome={goBackToHome} />
        ) : (
          <Home handleCarTypePress={handleCarTypePress} setIsLoading={setIsLoading} />
        )}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent', // Change backgroundColor to transparent
  },
  sidebar: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: windowWidth * 0.6,
    zIndex: 1,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 150, 
    justifyContent: 'space-between',
    alignItems: 'center', 
    flex: 1,
    overflow: 'hidden',
  },
  buttonClosed: {
    position: 'absolute',
    left: '5%', 
    top: '5%', 
    zIndex: 1, 
  },
  buttonOpen: {
    position: 'absolute',
    right: '5%', 
    top: '5%', 
    zIndex: 1, 
  },
  customButton: {
    padding: 10,
    marginTop: windowHeight * 0.09,
    borderRadius: 5,
    justifyContent: 'center', // Add this line
    alignItems: 'center', // Add this line
    overflow: 'hidden', // Add this line
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'NeueMachina-Ultrabold',
  },
  buttonsContainer: {
    marginTop: windowHeight * 0.09,
    justifyContent: 'center',
  },
  credits: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  creditsText: {
    fontFamily: 'NeueMachina-Ultrabold',
    color: 'white',
    fontSize: 15,
  },
  creditsLink: {
    fontFamily: 'NeueMachina-Ultrabold',
    color: 'blue',
    fontSize: 15,
    margin: 10,
  },
});

